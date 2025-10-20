// b_path:: src/parse/gradient/radial.ts
import type * as csstree from "css-tree";
import type * as Keyword from "@/core/keywords";
import { COLOR_INTERPOLATION_KEYWORDS } from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";
import * as ColorStop from "./color-stop";

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
			// Try parsing as position keyword using shared utility
			const positionResult = ParseUtils.parsePositionValueNode(node);
			if (positionResult.ok && typeof positionResult.value === "string") {
				positionValues.push(positionResult.value);
				idx++;
			} else {
				break;
			}
		} else {
			// Try parsing as length-percentage using shared utility
			const lengthResult = ParseUtils.parseLengthPercentageNode(node);
			if (lengthResult.ok) {
				positionValues.push(lengthResult.value);
				idx++;
			} else {
				break;
			}
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
 * Parse radial gradient size from nodes.
 *
 * Handles keyword sizes (closest-side, etc.) and explicit sizes.
 *
 * @param nodes - Array of CSS nodes
 * @param startIdx - Index to start parsing from
 * @param _shape - Shape parameter (reserved for future use)
 * @returns Result with size and next index, or error
 *
 * @internal
 */
function parseSize(
	nodes: csstree.CssNode[],
	startIdx: number,
	_shape?: Type.RadialGradientShape,
): Result<{ size: Type.RadialGradientSize; nextIdx: number }, string> {
	let idx = startIdx;
	const node = nodes[idx];

	if (!node) {
		return err("Expected size value");
	}

	// Check for keyword size
	if (node.type === "Identifier") {
		const keyword = node.name.toLowerCase();
		if (["closest-side", "farthest-side", "closest-corner", "farthest-corner"].includes(keyword)) {
			return ok({
				size: {
					kind: "keyword",
					value: keyword as "closest-side" | "farthest-side" | "closest-corner" | "farthest-corner",
				},
				nextIdx: idx + 1,
			});
		}
	}

	// Check for explicit size (length or percentage)
	if (node.type === "Dimension" || node.type === "Percentage") {
		const firstValue =
			node.type === "Dimension"
				? { value: Number.parseFloat(node.value), unit: node.unit as "px" | "em" | "rem" | "%" }
				: { value: Number.parseFloat(node.value), unit: "%" as const };

		idx++;

		// Check if there's a second value (for ellipse)
		const nextNode = nodes[idx];
		if (nextNode && (nextNode.type === "Dimension" || nextNode.type === "Percentage")) {
			const secondValue =
				nextNode.type === "Dimension"
					? { value: Number.parseFloat(nextNode.value), unit: nextNode.unit as "px" | "em" | "rem" | "%" }
					: { value: Number.parseFloat(nextNode.value), unit: "%" as const };

			return ok({
				size: {
					kind: "ellipse-explicit",
					radiusX: firstValue,
					radiusY: secondValue,
				},
				nextIdx: idx + 1,
			});
		}

		// Single value - circle
		return ok({
			size: {
				kind: "circle-explicit",
				radius: firstValue,
			},
			nextIdx: idx,
		});
	}

	return err("Invalid size value");
}

/**
 * Parse radial gradient from CSS function AST.
 *
 * Handles radial-gradient() and repeating-radial-gradient() functions.
 * Supports optional shape, size, position, color interpolation, and color stops.
 *
 * Syntax: radial-gradient([ <shape> || <size> ]? [ at <position> ]? [, in <color-space>]?, <color-stop-list>)
 *
 * @param fn - CSS Function AST node
 * @returns Result containing RadialGradient IR or error message
 *
 * @example
 * ```typescript
 * // Parse: radial-gradient(red, blue)
 * // Parse: radial-gradient(circle, red, blue)
 * // Parse: radial-gradient(closest-side, red, blue)
 * // Parse: radial-gradient(circle at center, red, blue)
 * // Parse: radial-gradient(100px at left top, red, blue)
 * // Parse: repeating-radial-gradient(circle, red, blue 20px)
 * ```
 *
 * @internal
 */
export function fromFunction(fn: csstree.FunctionNode): Result<Type.RadialGradient, string> {
	const functionName = fn.name.toLowerCase();
	const isRepeating = functionName === "repeating-radial-gradient";

	if (!isRepeating && functionName !== "radial-gradient") {
		return err(`Expected radial-gradient or repeating-radial-gradient, got: ${functionName}`);
	}

	// Get all children nodes
	const children = fn.children.toArray();
	if (children.length === 0) {
		return err("radial-gradient requires at least 2 color stops");
	}

	let shape: Type.RadialGradientShape | undefined;
	let size: Type.RadialGradientSize | undefined;
	let position: Type.Position2D | undefined;
	let colorSpace: Keyword.ColorInterpolationKeyword | undefined;

	let idx = 0;

	// Parse optional shape and/or size
	const firstNode = children[idx];
	if (firstNode?.type === "Identifier") {
		const keyword = firstNode.name.toLowerCase();

		// Check for shape keyword
		if (keyword === "circle" || keyword === "ellipse") {
			shape = keyword;
			idx++;

			// Check for size after shape
			const nextNode = children[idx];
			if (nextNode && nextNode.type !== "Identifier") {
				// Could be explicit size
				const sizeResult = parseSize(children, idx, shape);
				if (sizeResult.ok) {
					size = sizeResult.value.size;
					idx = sizeResult.value.nextIdx;
				}
			} else if (
				nextNode?.type === "Identifier" &&
				["closest-side", "farthest-side", "closest-corner", "farthest-corner"].includes(nextNode.name.toLowerCase())
			) {
				// Keyword size
				const sizeResult = parseSize(children, idx, shape);
				if (sizeResult.ok) {
					size = sizeResult.value.size;
					idx = sizeResult.value.nextIdx;
				}
			}
		}
		// Check for size keyword without shape
		else if (["closest-side", "farthest-side", "closest-corner", "farthest-corner"].includes(keyword)) {
			const sizeResult = parseSize(children, idx);
			if (sizeResult.ok) {
				size = sizeResult.value.size;
				idx = sizeResult.value.nextIdx;
			}
		}
	}
	// Check for explicit size without shape keyword
	else if (firstNode && (firstNode.type === "Dimension" || firstNode.type === "Percentage")) {
		const sizeResult = parseSize(children, idx);
		if (sizeResult.ok) {
			size = sizeResult.value.size;
			idx = sizeResult.value.nextIdx;
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

	// Skip comma after shape/size/position if present
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

	// Split remaining nodes into color stop groups
	const stopGroups = AstUtils.splitNodesByComma(children, { startIndex: idx });

	// Parse each color stop
	const colorStops: Type.ColorStop[] = [];
	for (const stopNodes of stopGroups) {
		const stopResult = ColorStop.fromNodes(stopNodes);
		if (stopResult.ok) {
			colorStops.push(stopResult.value);
		} else {
			return err(`Invalid color stop: ${stopResult.error}`);
		}
	}

	if (colorStops.length < 2) {
		return err("radial-gradient requires at least 2 color stops");
	}

	return ok({
		kind: "radial",
		shape,
		size,
		position,
		colorSpace,
		colorStops,
		repeating: isRepeating,
	});
}

/**
 * Parse a CSS radial gradient value into structured intermediate representation (IR).
 *
 * Parses both `radial-gradient()` and `repeating-radial-gradient()` functions,
 * extracting shape, size, position, color interpolation, and color stops into a
 * type-safe IR object.
 *
 * Supports all CSS radial gradient syntax per CSS Images Module Level 3:
 * - Shape keywords: `circle`, `ellipse` (default: `ellipse`)
 * - Size keywords: `closest-side`, `farthest-side`, `closest-corner`, `farthest-corner`
 * - Explicit sizes: lengths (px, em, etc.)
 * - Position: keywords (`center`, `top`, `left`, etc.) or length values
 * - Color interpolation: `in <color-space>` syntax
 * - Color stops: with optional positions
 *
 * @param css - CSS string containing a radial gradient function
 * @returns Result containing RadialGradient IR on success, or error message on failure
 *
 * @public
 *
 * @example
 * Simple gradient (defaults to ellipse at center):
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Gradient.Radial.parse("radial-gradient(red, blue)");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { kind: "radial", colorStops: [...], repeating: false }
 * }
 * ```
 *
 * @example
 * Circle with keyword size:
 * ```typescript
 * const result = Parse.Gradient.Radial.parse(
 *   "radial-gradient(circle closest-side, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.shape); // "circle"
 *   console.log(result.value.size);  // { kind: "keyword", value: "closest-side" }
 * }
 * ```
 *
 * @example
 * Positioned gradient:
 * ```typescript
 * const result = Parse.Gradient.Radial.parse(
 *   "radial-gradient(at center top, red 0%, blue 100%)"
 * );
 * if (result.ok) {
 *   console.log(result.value.position);
 *   // { horizontal: "center", vertical: "top" }
 * }
 * ```
 *
 * @example
 * With color interpolation:
 * ```typescript
 * const result = Parse.Gradient.Radial.parse(
 *   "radial-gradient(in oklch, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.colorSpace); // "oklch"
 * }
 * ```
 *
 * @example
 * Repeating gradient:
 * ```typescript
 * const result = Parse.Gradient.Radial.parse(
 *   "repeating-radial-gradient(circle, red 0px, blue 20px)"
 * );
 * if (result.ok) {
 *   console.log(result.value.repeating); // true
 * }
 * ```
 *
 * @example
 * Error handling:
 * ```typescript
 * const result = Parse.Gradient.Radial.parse("invalid syntax");
 * if (!result.ok) {
 *   console.error(result.error); // Error message string
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient | MDN: radial-gradient()}
 * @see {@link https://www.w3.org/TR/css-images-3/#radial-gradients | W3C Spec: Radial Gradients}
 * @see {@link https://github.com/mdn/data/blob/main/css/functions.json | MDN Data: radial-gradient()}
 */
export function parse(css: string): Result<Type.RadialGradient, string> {
	const csstree = require("css-tree");

	try {
		// Parse as a value
		const ast = csstree.parse(css, { context: "value" });

		// Find the function node
		let funcNode: csstree.FunctionNode | null = null;
		csstree.walk(ast, {
			visit: "Function",
			enter(node: csstree.FunctionNode) {
				if (node.name === "radial-gradient" || node.name === "repeating-radial-gradient") {
					funcNode = node;
				}
			},
		});

		if (!funcNode) {
			return err("No radial-gradient function found in CSS string");
		}

		return fromFunction(funcNode);
	} catch (e) {
		return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}
