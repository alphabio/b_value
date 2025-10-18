// b_path:: src/parse/gradient/conic.ts
import * as csstree from "css-tree";
import type * as Keyword from "@/core/keywords";
import { COLOR_INTERPOLATION_KEYWORDS } from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ColorStop from "./color-stop";

/**
 * Parse starting angle from nodes (from keyword followed by angle value).
 *
 * Syntax: from <angle>
 * Example: from 45deg, from 0.5turn, from 1rad
 *
 * @param nodes - Array of CSS nodes starting with "from" keyword
 * @param startIdx - Index to start parsing from
 * @returns Result with Angle and next index, or error
 *
 * @internal
 */
function parseFromAngle(
	nodes: csstree.CssNode[],
	startIdx: number,
): Result<{ angle: Type.Angle; nextIdx: number }, string> {
	let idx = startIdx;

	// Should start with "from" keyword
	const fromNode = nodes[idx];
	if (!fromNode || fromNode.type !== "Identifier" || fromNode.name.toLowerCase() !== "from") {
		return err("Expected 'from' keyword for starting angle");
	}
	idx++;

	// Parse angle value
	const angleNode = nodes[idx];
	if (!angleNode || angleNode.type !== "Dimension") {
		return err("Expected angle value after 'from'");
	}

	if (!["deg", "rad", "grad", "turn"].includes(angleNode.unit)) {
		return err(`Invalid angle unit: ${angleNode.unit}`);
	}

	const angle: Type.Angle = {
		value: Number.parseFloat(angleNode.value),
		unit: angleNode.unit as "deg" | "rad" | "grad" | "turn",
	};

	return ok({ angle, nextIdx: idx + 1 });
}

/**
 * Parse position from nodes (at keyword followed by position values).
 *
 * Syntax: at <position>
 * Example: at center, at left top, at 50% 50%, at 100px 200px
 *
 * @param nodes - Array of CSS nodes starting with "at" keyword
 * @param startIdx - Index to start parsing from
 * @returns Result with Position2D and next index, or error
 *
 * @internal
 */
function parsePosition(
	nodes: csstree.CssNode[],
	startIdx: number,
): Result<{ position: Type.Position2D; nextIdx: number }, string> {
	let idx = startIdx;

	// Should start with "at" keyword
	const atNode = nodes[idx];
	if (!atNode || atNode.type !== "Identifier" || atNode.name.toLowerCase() !== "at") {
		return err("Expected 'at' keyword for position");
	}
	idx++;

	// Parse position values (1 or 2 values: horizontal and vertical)
	const positionValues: Type.PositionValue[] = [];

	// Collect position value nodes until we hit comma or end
	while (idx < nodes.length) {
		const node = nodes[idx];
		if (!node) break;

		if (node.type === "Operator" && "value" in node && node.value === ",") {
			break;
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();
			// Position keywords
			if (["center", "left", "right", "top", "bottom"].includes(keyword)) {
				positionValues.push(keyword as Type.PositionValue);
				idx++;
			} else {
				break;
			}
		} else if (node.type === "Dimension" || node.type === "Percentage") {
			// Length or percentage value
			const value =
				node.type === "Dimension"
					? { value: Number.parseFloat(node.value), unit: node.unit as "px" | "em" | "rem" | "%" }
					: { value: Number.parseFloat(node.value), unit: "%" as const };
			positionValues.push(value);
			idx++;
		} else {
			break;
		}
	}

	if (positionValues.length === 0) {
		return err("Expected position values after 'at'");
	}

	// Convert 1-2 values into Position2D
	let position: Type.Position2D;

	if (positionValues.length === 1) {
		const val = positionValues[0];
		if (!val) {
			return err("Invalid position value");
		}
		// Single value is treated as horizontal, vertical defaults to center
		if (typeof val === "string") {
			// Keyword: if it's top/bottom, it's vertical; otherwise horizontal
			if (val === "top" || val === "bottom") {
				position = { horizontal: "center", vertical: val };
			} else {
				position = { horizontal: val, vertical: "center" };
			}
		} else {
			position = { horizontal: val, vertical: "center" };
		}
	} else {
		// Two values: horizontal then vertical
		const h = positionValues[0];
		const v = positionValues[1];
		if (!h || !v) {
			return err("Invalid position values");
		}
		position = { horizontal: h, vertical: v };
	}

	return ok({ position, nextIdx: idx });
}

/**
 * Parse conic gradient from CSS function AST.
 *
 * Handles conic-gradient() and repeating-conic-gradient() functions.
 * Supports optional starting angle, position, color interpolation, and color stops.
 *
 * Syntax: conic-gradient([ from <angle> ]? [ at <position> ]? [, in <color-space>]?, <color-stop-list>)
 *
 * @param fn - CSS Function AST node
 * @returns Result containing ConicGradient IR or error message
 *
 * @example
 * ```typescript
 * // Parse: conic-gradient(red, blue)
 * // Parse: conic-gradient(from 45deg, red, blue)
 * // Parse: conic-gradient(at center, red, blue)
 * // Parse: conic-gradient(from 90deg at 50% 50%, red, blue)
 * // Parse: repeating-conic-gradient(red, blue 45deg)
 * ```
 *
 * @internal
 */
export function fromFunction(fn: csstree.FunctionNode): Result<Type.ConicGradient, string> {
	const functionName = fn.name.toLowerCase();
	const isRepeating = functionName === "repeating-conic-gradient";

	if (!isRepeating && functionName !== "conic-gradient") {
		return err(`Expected conic-gradient or repeating-conic-gradient, got: ${functionName}`);
	}

	// Get all children nodes
	const children = fn.children.toArray();
	if (children.length === 0) {
		return err("conic-gradient requires at least 2 color stops");
	}

	let fromAngle: Type.Angle | undefined;
	let position: Type.Position2D | undefined;
	let colorSpace: Keyword.ColorInterpolationKeyword | undefined;
	const colorStopNodes: csstree.CssNode[][] = [];
	let currentStopNodes: csstree.CssNode[] = [];

	let idx = 0;

	// Parse optional "from <angle>"
	const firstNode = children[idx];
	if (firstNode?.type === "Identifier" && firstNode.name.toLowerCase() === "from") {
		const angleResult = parseFromAngle(children, idx);
		if (angleResult.ok) {
			fromAngle = angleResult.value.angle;
			idx = angleResult.value.nextIdx;
		}
	}

	// Parse optional position: "at <position>"
	const atNode = children[idx];
	if (atNode?.type === "Identifier" && atNode.name.toLowerCase() === "at") {
		const posResult = parsePosition(children, idx);
		if (posResult.ok) {
			position = posResult.value.position;
			idx = posResult.value.nextIdx;
		}
	}

	// Skip comma after from/at if present
	const commaNode = children[idx];
	if (commaNode && commaNode.type === "Operator" && "value" in commaNode && commaNode.value === ",") {
		idx++;
	}

	// Parse optional color interpolation: "in <color-space>"
	if (idx < children.length) {
		const node = children[idx];
		if (node?.type === "Identifier" && node.name.toLowerCase() === "in") {
			idx++;
			const spaceNode = children[idx];
			if (spaceNode?.type === "Identifier") {
				const space = spaceNode.name.toLowerCase();
				// Validate against core color interpolation keywords
				if (COLOR_INTERPOLATION_KEYWORDS.includes(space as Keyword.ColorInterpolationKeyword)) {
					colorSpace = space as Keyword.ColorInterpolationKeyword;
					idx++;
				}
			}

			// Skip comma after color space if present
			const spaceCommaNode = children[idx];
			if (
				spaceCommaNode &&
				spaceCommaNode.type === "Operator" &&
				"value" in spaceCommaNode &&
				spaceCommaNode.value === ","
			) {
				idx++;
			}
		}
	}

	// Parse color stops (remaining arguments, comma-separated)
	for (; idx < children.length; idx++) {
		const node = children[idx];
		if (!node) continue;

		if (node.type === "Operator" && "value" in node && node.value === ",") {
			// End of current color stop, start new one
			if (currentStopNodes.length > 0) {
				colorStopNodes.push(currentStopNodes);
				currentStopNodes = [];
			}
		} else {
			currentStopNodes.push(node);
		}
	}

	// Push last color stop
	if (currentStopNodes.length > 0) {
		colorStopNodes.push(currentStopNodes);
	}

	// Parse each color stop
	const colorStops: Type.ColorStop[] = [];
	for (const stopNodes of colorStopNodes) {
		const stopResult = ColorStop.fromNodes(stopNodes);
		if (stopResult.ok) {
			colorStops.push(stopResult.value);
		} else {
			return err(`Invalid color stop: ${stopResult.error}`);
		}
	}

	if (colorStops.length < 2) {
		return err("conic-gradient requires at least 2 color stops");
	}

	return ok({
		kind: "conic",
		fromAngle,
		position,
		colorSpace,
		colorStops,
		repeating: isRepeating,
	});
}

/**
 * Parse a CSS conic gradient value into structured intermediate representation (IR).
 *
 * Parses both `conic-gradient()` and `repeating-conic-gradient()` functions,
 * extracting starting angle, position, color interpolation, and color stops into a
 * type-safe IR object.
 *
 * Supports all CSS conic gradient syntax per CSS Images Module Level 4:
 * - Starting angle: `from <angle>` (default: 0deg from top)
 * - Position: `at <position>` syntax with keywords or length values
 * - Color interpolation: `in <color-space>` syntax
 * - Color stops: with optional angle positions
 *
 * @param css - CSS string containing a conic gradient function
 * @returns Result containing ConicGradient IR on success, or error message on failure
 *
 * @public
 *
 * @example
 * Simple gradient (defaults to starting from top at center):
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Gradient.Conic.parse("conic-gradient(red, blue)");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { kind: "conic", colorStops: [...], repeating: false }
 * }
 * ```
 *
 * @example
 * With starting angle:
 * ```typescript
 * const result = Parse.Gradient.Conic.parse(
 *   "conic-gradient(from 45deg, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.fromAngle);
 *   // { value: 45, unit: "deg" }
 * }
 * ```
 *
 * @example
 * At specific position:
 * ```typescript
 * const result = Parse.Gradient.Conic.parse(
 *   "conic-gradient(at left top, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.position);
 *   // { horizontal: "left", vertical: "top" }
 * }
 * ```
 *
 * @example
 * With both angle and position:
 * ```typescript
 * const result = Parse.Gradient.Conic.parse(
 *   "conic-gradient(from 90deg at 50% 50%, red 0deg, blue 180deg)"
 * );
 * if (result.ok) {
 *   console.log(result.value.fromAngle); // { value: 90, unit: "deg" }
 *   console.log(result.value.position);  // { horizontal: {value: 50, unit: "%"}, ... }
 * }
 * ```
 *
 * @example
 * With color interpolation:
 * ```typescript
 * const result = Parse.Gradient.Conic.parse(
 *   "conic-gradient(in oklch, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.colorSpace); // "oklch"
 * }
 * ```
 *
 * @example
 * Repeating gradient:
 * ```typescript
 * const result = Parse.Gradient.Conic.parse(
 *   "repeating-conic-gradient(red 0deg, blue 45deg)"
 * );
 * if (result.ok) {
 *   console.log(result.value.repeating); // true
 * }
 * ```
 *
 * @example
 * Error handling:
 * ```typescript
 * const result = Parse.Gradient.Conic.parse("invalid syntax");
 * if (!result.ok) {
 *   console.error(result.error); // Error message string
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient | MDN: conic-gradient()}
 * @see {@link https://www.w3.org/TR/css-images-4/#conic-gradients | W3C Spec: Conic Gradients}
 * @see {@link https://github.com/mdn/data/blob/main/css/functions.json | MDN Data: conic-gradient()}
 */
export function parse(css: string): Result<Type.ConicGradient, string> {
	try {
		// Parse as a value
		const ast = csstree.parse(css, { context: "value" });

		// Find the function node
		let funcNode: csstree.FunctionNode | null = null;
		csstree.walk(ast, {
			visit: "Function",
			enter(node: csstree.FunctionNode) {
				if (node.name === "conic-gradient" || node.name === "repeating-conic-gradient") {
					funcNode = node;
				}
			},
		});

		if (!funcNode) {
			return err("No conic-gradient function found in CSS string");
		}

		return fromFunction(funcNode);
	} catch (e) {
		return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}
