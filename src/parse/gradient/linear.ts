// b_path:: src/parse/gradient/linear.ts
import * as csstree from "css-tree";
import type * as Keyword from "@/core/keywords";
import { COLOR_INTERPOLATION_KEYWORDS } from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";
import * as ColorStop from "./color-stop";

/**
 * Parse gradient direction from nodes.
 *
 * Handles angle values, "to side" keywords, and "to corner" keywords.
 *
 * @param nodes - Array of CSS nodes
 * @param startIdx - Index to start parsing from
 * @returns Result with direction and next index, or error
 *
 * @internal
 */
function parseDirection(
	nodes: csstree.CssNode[],
	startIdx: number,
): Result<{ direction: Type.GradientDirection; nextIdx: number }, string> {
	let idx = startIdx;
	const node = nodes[idx];

	if (!node) {
		return err("Expected direction value");
	}

	// Check for angle using shared utility
	const angleResult = ParseUtils.parseAngleNode(node);
	if (angleResult.ok) {
		return ok({
			direction: {
				kind: "angle",
				value: angleResult.value,
			},
			nextIdx: idx + 1,
		});
	}

	// Check for "to" keyword (for side or corner)
	if (node.type === "Identifier" && node.name.toLowerCase() === "to") {
		idx++;
		const firstKeyword = nodes[idx];
		if (!firstKeyword || firstKeyword.type !== "Identifier") {
			return err("Expected side or corner keyword after 'to'");
		}

		const first = firstKeyword.name.toLowerCase();
		idx++;

		// Check if there's a second keyword (for corners)
		const secondKeyword = nodes[idx];
		if (secondKeyword && secondKeyword.type === "Identifier") {
			const second = secondKeyword.name.toLowerCase();
			// Corner: "to top left", "to bottom right", etc.
			const corner = `${first} ${second}`;
			if (["top left", "top right", "bottom left", "bottom right"].includes(corner)) {
				return ok({
					direction: {
						kind: "to-corner",
						value: corner as "top left" | "top right" | "bottom left" | "bottom right",
					},
					nextIdx: idx + 1,
				});
			}
		}

		// Single keyword - side
		if (["top", "right", "bottom", "left"].includes(first)) {
			return ok({
				direction: {
					kind: "to-side",
					value: first as "top" | "right" | "bottom" | "left",
				},
				nextIdx: idx,
			});
		}

		return err(`Invalid direction keyword: ${first}`);
	}

	return err("Invalid direction syntax");
}

/**
 * Parse linear gradient from CSS function AST.
 *
 * Handles linear-gradient() and repeating-linear-gradient() functions.
 * Supports optional direction, color interpolation, and color stops.
 *
 * Syntax: linear-gradient([ <angle> | to <side-or-corner> ]? [, in <color-space>]?, <color-stop-list>)
 *
 * @param fn - CSS Function AST node
 * @returns Result containing LinearGradient IR or error message
 *
 * @example
 * ```typescript
 * // Parse: linear-gradient(red, blue)
 * // Parse: linear-gradient(45deg, red, blue)
 * // Parse: linear-gradient(to right, red, blue)
 * // Parse: linear-gradient(to top left, red, blue)
 * // Parse: repeating-linear-gradient(45deg, red, blue 20px)
 * ```
 *
 * @internal
 */
export function fromFunction(fn: csstree.FunctionNode): Result<Type.LinearGradient, string> {
	const functionName = fn.name.toLowerCase();
	const isRepeating = functionName === "repeating-linear-gradient";

	if (!isRepeating && functionName !== "linear-gradient") {
		return err(`Expected linear-gradient or repeating-linear-gradient, got: ${functionName}`);
	}

	// Get all children nodes
	const children = fn.children.toArray();
	if (children.length === 0) {
		return err("linear-gradient requires at least 2 color stops");
	}

	let direction: Type.GradientDirection | undefined;
	let colorSpace: Keyword.ColorInterpolationKeyword | undefined;

	let idx = 0;

	// Parse optional direction
	const firstNode = children[idx];
	if (firstNode) {
		// Check for angle using shared utility
		const angleResult = ParseUtils.parseAngleNode(firstNode);
		if (angleResult.ok) {
			const dirResult = parseDirection(children, idx);
			if (dirResult.ok) {
				direction = dirResult.value.direction;
				idx = dirResult.value.nextIdx;
			}
		}
		// Check for "to" keyword
		else if (firstNode.type === "Identifier" && firstNode.name.toLowerCase() === "to") {
			const dirResult = parseDirection(children, idx);
			if (dirResult.ok) {
				direction = dirResult.value.direction;
				idx = dirResult.value.nextIdx;
			}
		}
	}

	// Skip comma after direction if present
	idx = AstUtils.skipComma(children, idx);

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
			idx = AstUtils.skipComma(children, idx);
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
		return err("linear-gradient requires at least 2 color stops");
	}

	return ok({
		kind: "linear",
		direction,
		colorSpace,
		colorStops,
		repeating: isRepeating,
	});
}

/**
 * Parse a CSS linear gradient value into structured intermediate representation (IR).
 *
 * Parses both `linear-gradient()` and `repeating-linear-gradient()` functions,
 * extracting direction, color interpolation, and color stops into a
 * type-safe IR object.
 *
 * Supports all CSS linear gradient syntax per CSS Images Module Level 3:
 * - Direction angles: `45deg`, `0.5turn`, `1rad`, etc.
 * - Side keywords: `to top`, `to right`, `to bottom`, `to left`
 * - Corner keywords: `to top left`, `to bottom right`, etc.
 * - Color interpolation: `in <color-space>` syntax
 * - Color stops: with optional positions
 *
 * @param css - CSS string containing a linear gradient function
 * @returns Result containing LinearGradient IR on success, or error message on failure
 *
 * @public
 *
 * @example
 * Simple gradient (defaults to top to bottom):
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Gradient.Linear.parse("linear-gradient(red, blue)");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { kind: "linear", colorStops: [...], repeating: false }
 * }
 * ```
 *
 * @example
 * With angle direction:
 * ```typescript
 * const result = Parse.Gradient.Linear.parse(
 *   "linear-gradient(45deg, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.direction);
 *   // { kind: "angle", value: { value: 45, unit: "deg" } }
 * }
 * ```
 *
 * @example
 * With side direction:
 * ```typescript
 * const result = Parse.Gradient.Linear.parse(
 *   "linear-gradient(to right, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.direction);
 *   // { kind: "to-side", value: "right" }
 * }
 * ```
 *
 * @example
 * With corner direction:
 * ```typescript
 * const result = Parse.Gradient.Linear.parse(
 *   "linear-gradient(to top right, red 0%, blue 100%)"
 * );
 * if (result.ok) {
 *   console.log(result.value.direction);
 *   // { kind: "to-corner", value: "top right" }
 * }
 * ```
 *
 * @example
 * With color interpolation:
 * ```typescript
 * const result = Parse.Gradient.Linear.parse(
 *   "linear-gradient(in oklch, red, blue)"
 * );
 * if (result.ok) {
 *   console.log(result.value.colorSpace); // "oklch"
 * }
 * ```
 *
 * @example
 * Repeating gradient:
 * ```typescript
 * const result = Parse.Gradient.Linear.parse(
 *   "repeating-linear-gradient(45deg, red 0px, blue 20px)"
 * );
 * if (result.ok) {
 *   console.log(result.value.repeating); // true
 * }
 * ```
 *
 * @example
 * Error handling:
 * ```typescript
 * const result = Parse.Gradient.Linear.parse("invalid syntax");
 * if (!result.ok) {
 *   console.error(result.error); // Error message string
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient | MDN: linear-gradient()}
 * @see {@link https://www.w3.org/TR/css-images-3/#linear-gradients | W3C Spec: Linear Gradients}
 * @see {@link https://github.com/mdn/data/blob/main/css/functions.json | MDN Data: linear-gradient()}
 */
export function parse(css: string): Result<Type.LinearGradient, string> {
	try {
		// Parse as a value
		const ast = csstree.parse(css, { context: "value" });

		// Find the function node
		let funcNode: csstree.FunctionNode | null = null;
		csstree.walk(ast, {
			visit: "Function",
			enter(node: csstree.FunctionNode) {
				if (node.name === "linear-gradient" || node.name === "repeating-linear-gradient") {
					funcNode = node;
				}
			},
		});

		if (!funcNode) {
			return err("No linear-gradient function found in CSS string");
		}

		return fromFunction(funcNode);
	} catch (e) {
		return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}
