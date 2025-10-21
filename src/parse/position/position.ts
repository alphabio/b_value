// b_path:: src/parse/position/position.ts
import type * as csstree from "css-tree";
import { err, ok, type ParseResult, parseErr, parseOk, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse position value from CSS node.
 *
 * Handles both keyword positions (center, left, top, etc.) and length/percentage values.
 *
 * @param node - CSS AST node
 * @returns Result containing PositionValue IR or error message
 *
 * @internal
 */
function parsePositionValue(node: csstree.CssNode): Result<Type.PositionValue, string> {
	// Use shared utility that handles both keywords and length-percentage values
	return ParseUtils.parsePositionValueNode(node);
}

/**
 * Parse 2D position from CSS nodes.
 *
 * Handles CSS position syntax: [ [ left | center | right | top | bottom | <length-percentage> ] |
 *                             [ left | center | right ] && [ top | center | bottom ] |
 *                             [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ] |
 *                             [ [ center | [ left | right ] <length-percentage>? ] &&
 *                               [ center | [ top | bottom ] <length-percentage>? ] ] ]
 *
 * @param nodes - Array of CSS nodes
 * @param startIdx - Index to start parsing from
 * @returns Result containing Position2D IR and next index, or error message
 *
 * @internal
 */
function parsePosition2DFromNodes(
	nodes: csstree.CssNode[],
	startIdx: number,
): Result<{ position: Type.Position2D; nextIdx: number }, string> {
	let idx = startIdx;

	// Collect position values (1 or 2 values)
	const positionValues: Type.PositionValue[] = [];

	// Parse first value
	if (idx >= nodes.length) {
		return err("Expected position value");
	}

	const firstNode = nodes[idx];
	if (!firstNode) return err("Missing first position value");
	const firstValue = parsePositionValue(firstNode);
	if (!firstValue.ok) {
		return err(`Invalid first position value: ${firstValue.error}`);
	}
	positionValues.push(firstValue.value);
	idx++;

	// Check for second value
	if (idx < nodes.length) {
		const secondNode = nodes[idx];
		if (secondNode) {
			const secondValue = parsePositionValue(secondNode);
			if (secondValue.ok) {
				positionValues.push(secondValue.value);
				idx++;
			}
		}
	}

	// Convert 1-2 values into Position2D
	let position: Type.Position2D;

	if (positionValues.length === 1) {
		const val = positionValues[0];
		if (!val) {
			return err("Missing position value");
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
			return err("Missing position values");
		}
		position = { horizontal: h, vertical: v };
	}

	return ok({ position, nextIdx: idx });
}

/**
 * Parse 3D position from CSS nodes.
 *
 * Handles CSS 3D position syntax with x, y, and z coordinates.
 *
 * @param nodes - Array of CSS nodes
 * @param startIdx - Index to start parsing from
 * @returns Result containing Position3D IR and next index, or error message
 *
 * @internal
 */
function parsePosition3DFromNodes(
	nodes: csstree.CssNode[],
	startIdx: number,
): Result<{ position: Type.Position3D; nextIdx: number }, string> {
	let idx = startIdx;

	// Parse x, y, z values
	const xNode = nodes[idx];
	if (!xNode) return err("Missing x position value");
	const x = parsePositionValue(xNode);
	if (!x.ok) return err(`Invalid x position: ${x.error}`);
	idx++;

	const yNode = nodes[idx];
	if (!yNode) return err("Missing y position value");
	const y = parsePositionValue(yNode);
	if (!y.ok) return err(`Invalid y position: ${y.error}`);
	idx++;

	const zNode = nodes[idx];
	if (!zNode) return err("Missing z position value");
	const z = ParseUtils.parseLengthNode(zNode);
	if (!z.ok) return err(`Invalid z position: ${z.error}`);
	idx++;

	return ok({
		position: { x: x.value, y: y.value, z: z.value },
		nextIdx: idx,
	});
}

/**
 * Parse a CSS position value into structured intermediate representation (IR).
 *
 * Parses CSS position values used in properties like background-position,
 * object-position, transform-origin, perspective-origin, etc.
 *
 * Supports all CSS position syntax per CSS specifications:
 * - 2D positions: keywords, lengths, percentages
 * - 3D positions: for transform-origin in 3D contexts
 * - Position lists: for multi-position properties
 *
 * @param css - CSS string containing position values
 * @returns Result containing position IR on success, or error message on failure
 *
 * @public
 *
 * @example
 * 2D position keywords:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Position.parse("center");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { horizontal: "center", vertical: "center" }
 * }
 * ```
 *
 * @example
 * 2D position with both values:
 * ```typescript
 * const result = Parse.Position.parse("left top");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { horizontal: "left", vertical: "top" }
 * }
 * ```
 *
 * @example
 * 2D position with length/percentage:
 * ```typescript
 * const result = Parse.Position.parse("50% 100px");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { horizontal: { value: 50, unit: "%" }, vertical: { value: 100, unit: "px" } }
 * }
 * ```
 *
 * @example
 * 3D position:
 * ```typescript
 * const result = Parse.Position.parse3D("10px 20px 30px");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { x: { value: 10, unit: "px" }, y: { value: 20, unit: "px" }, z: { value: 30, unit: "px" } }
 * }
 * ```
 *
 * @example
 * Position list:
 * ```typescript
 * const result = Parse.Position.parseList("center, 50% 50%, left top");
 * if (result.ok) {
 *   console.log(result.value.length); // 3
 *   console.log(result.value[0]); // { horizontal: "center", vertical: "center" }
 * }
 * ```
 *
 * @example
 * Error handling:
 * ```typescript
 * const result = Parse.Position.parse("invalid position");
 * if (!result.ok) {
 *   console.error(result.error); // Error message string
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position_value | MDN: position}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#background-position | W3C Spec: background-position}
 */
export function parse(css: string): ParseResult<Type.Position2D> {
	const csstree = require("css-tree");

	try {
		// Parse as a value
		const ast = csstree.parse(css, { context: "value" });

		// Find the position nodes (should be the main content)
		const children = ast.children.toArray();
		if (children.length === 0) {
			return parseErr("invalid-syntax", "No position values found in CSS string");
		}

		const result = parsePosition2DFromNodes(children, 0);
		if (!result.ok) {
			return parseErr("invalid-value", result.error);
		}

		return parseOk(result.value.position);
	} catch (e) {
		return parseErr("invalid-syntax", `Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}

/**
 * Parse a 3D CSS position value.
 *
 * @param css - CSS string containing 3D position values
 * @returns Result containing Position3D IR or error message
 */
export function parse3D(css: string): Result<Type.Position3D, string> {
	const csstree = require("css-tree");

	try {
		// Parse as a value
		const ast = csstree.parse(css, { context: "value" });

		// Find the position nodes
		const children = ast.children.toArray();
		if (children.length === 0) {
			return err("No position values found in CSS string");
		}

		const result = parsePosition3DFromNodes(children, 0);
		if (!result.ok) {
			return err(`Failed to parse 3D position: ${result.error}`);
		}

		return ok(result.value.position);
	} catch (e) {
		return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}

/**
 * Parse a list of CSS position values.
 *
 * @param css - CSS string containing comma-separated position values
 * @returns Result containing PositionList IR or error message
 */
export function parseList(css: string): Result<Type.PositionList, string> {
	const csstree = require("css-tree");

	try {
		// Parse as a value
		const ast = csstree.parse(css, { context: "value" });

		// Split into groups by comma - single walk
		const positions: Type.Position2D[] = [];
		const groups: csstree.CssNode[][] = [[]];

		csstree.walk(ast, {
			enter(node: csstree.CssNode) {
				if (node.type === "Operator" && "value" in node && node.value === ",") {
					// Start new group
					groups.push([]);
				} else if (node.type !== "Value") {
					// Add to current group (skip Value wrapper node)
					const currentGroup = groups[groups.length - 1];
					if (currentGroup) {
						currentGroup.push(node);
					}
				}
			},
		});

		// Parse each group as a position
		for (const group of groups) {
			if (group.length > 0) {
				const result = parsePosition2DFromNodes(group, 0);
				if (result.ok) {
					positions.push(result.value.position);
				} else {
					return err(`Failed to parse position in list: ${result.error}`);
				}
			}
		}

		if (positions.length === 0) {
			return err("No valid positions found in CSS string");
		}

		return ok(positions);
	} catch (e) {
		return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}

// Length parsing now uses shared utility (eliminates code duplication)
