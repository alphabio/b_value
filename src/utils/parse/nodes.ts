// b_path:: src/utils/parse/nodes.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Unit from "@/core/units";

/**
 * Parse a CSS dimension node into a Length IR.
 *
 * Handles all CSS length units using core unit definitions.
 * Replaces hardcoded unit arrays with centralized core units.
 *
 * @param node - CSS AST dimension node
 * @returns Result containing Length IR or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { parseLengthNode } from "@/utils/parse/nodes";
 *
 * const result = parseLengthNode(dimensionNode);
 * if (result.ok) {
 *   console.log(result.value); // { value: 100, unit: "px" }
 * }
 * ```
 */
export function parseLengthNode(node: csstree.CssNode): Result<Type.Length, string> {
	if (node.type === "Dimension") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid length value");
		}

		// Use core unit validation
		const allLengthUnits = [...Unit.ABSOLUTE_LENGTH_UNITS, ...Unit.FONT_LENGTH_UNITS, ...Unit.VIEWPORT_LENGTH_UNITS];

		if (!allLengthUnits.includes(node.unit as (typeof allLengthUnits)[number])) {
			return err(`Invalid length unit: ${node.unit}`);
		}

		return ok({
			value,
			unit: node.unit as (typeof allLengthUnits)[number],
		});
	}
	return err("Expected length dimension");
}

/**
 * Parse a CSS dimension or percentage node into a LengthPercentage IR.
 *
 * Handles both length units and percentage values using core definitions.
 *
 * @param node - CSS AST node (dimension or percentage)
 * @returns Result containing LengthPercentage IR or error message
 *
 * @public
 */
export function parseLengthPercentageNode(node: csstree.CssNode): Result<Type.LengthPercentage, string> {
	// Handle unitless zero
	if (node.type === "Number") {
		const val = Number.parseFloat(node.value);
		if (val !== 0) {
			return err("Unitless values must be zero");
		}
		return ok({ value: 0, unit: "px" });
	}

	if (node.type === "Dimension") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid length value");
		}

		// Use core unit validation for length units
		const allLengthUnits = [...Unit.ABSOLUTE_LENGTH_UNITS, ...Unit.FONT_LENGTH_UNITS, ...Unit.VIEWPORT_LENGTH_UNITS];

		if (!allLengthUnits.includes(node.unit as (typeof allLengthUnits)[number])) {
			return err(`Invalid length unit: ${node.unit}`);
		}

		return ok({
			value,
			unit: node.unit as (typeof allLengthUnits)[number],
		});
	}

	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value");
		}
		return ok({ value, unit: Unit.PERCENTAGE_UNIT });
	}

	return err("Expected length or percentage");
}

/**
 * Parse a CSS dimension node into an Angle IR.
 *
 * Handles all CSS angle units using core unit definitions.
 *
 * @param node - CSS AST dimension node
 * @returns Result containing Angle IR or error message
 *
 * @public
 */
export function parseAngleNode(node: csstree.CssNode): Result<Type.Angle, string> {
	if (node.type === "Dimension") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid angle value");
		}

		// Use core unit validation
		if (!Unit.ANGLE_UNITS.includes(node.unit as (typeof Unit.ANGLE_UNITS)[number])) {
			return err(`Invalid angle unit: ${node.unit}`);
		}

		return ok({ value, unit: node.unit as (typeof Unit.ANGLE_UNITS)[number] });
	}
	return err("Expected angle dimension");
}

/**
 * Parse a CSS number node into a number.
 *
 * @param node - CSS AST number node
 * @returns Result containing number or error message
 *
 * @public
 */
export function parseNumberNode(node: csstree.CssNode): Result<number, string> {
	if (node.type === "Number") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid number value");
		}
		return ok(value);
	}
	return err("Expected number");
}

/**
 * Parse a CSS identifier node into a string.
 *
 * @param node - CSS AST identifier node
 * @returns Result containing string or error message
 *
 * @public
 */
export function parseIdentifierNode(node: csstree.CssNode): Result<string, string> {
	if (node.type === "Identifier") {
		return ok(node.name.toLowerCase());
	}
	return err("Expected identifier");
}

/**
 * Parse a CSS value node into a PositionValue IR.
 *
 * Handles keywords, lengths, and percentages for position values.
 *
 * @param node - CSS AST node
 * @returns Result containing PositionValue IR or error message
 *
 * @public
 */
export function parsePositionValueNode(node: csstree.CssNode): Result<Type.PositionValue, string> {
	// Check for keyword first
	if (node.type === "Identifier") {
		const keyword = node.name.toLowerCase();
		// Position keywords
		if (["center", "left", "right", "top", "bottom"].includes(keyword)) {
			return ok(keyword as Type.PositionValue);
		}
		return err(`Invalid position keyword: ${keyword}`);
	}

	// Try parsing as length-percentage
	const lengthResult = parseLengthPercentageNode(node);
	if (lengthResult.ok) {
		return lengthResult;
	}

	return err("Expected position keyword, length, or percentage");
}

/**
 * Parse 2D position from CSS nodes.
 *
 * Handles CSS position syntax with 1-2 values.
 *
 * @param nodes - Array of CSS nodes
 * @param startIdx - Index to start parsing from
 * @returns Result containing Position2D IR and next index, or error message
 *
 * @example
 * ```typescript
 * // Parse "center top"
 * const result = parsePosition2D([centerNode, topNode], 0);
 * // { position: { horizontal: "center", vertical: "top" }, nextIdx: 2 }
 * ```
 *
 * @public
 */
export function parsePosition2D(
	nodes: csstree.CssNode[],
	startIdx: number,
): Result<{ position: Type.Position2D; nextIdx: number }, string> {
	let idx = startIdx;

	const positionValues: Type.PositionValue[] = [];

	if (idx >= nodes.length) {
		return err("Expected position value");
	}

	const firstNode = nodes[idx];
	if (!firstNode) return err("Missing first position value");
	const firstValue = parsePositionValueNode(firstNode);
	if (!firstValue.ok) {
		return err(`Invalid first position value: ${firstValue.error}`);
	}
	positionValues.push(firstValue.value);
	idx++;

	if (idx < nodes.length) {
		const secondNode = nodes[idx];
		if (secondNode) {
			const secondValue = parsePositionValueNode(secondNode);
			if (secondValue.ok) {
				positionValues.push(secondValue.value);
				idx++;
			}
		}
	}

	let position: Type.Position2D;

	if (positionValues.length === 1) {
		const val = positionValues[0];
		if (!val) {
			return err("Missing position value");
		}
		if (typeof val === "string") {
			if (val === "top" || val === "bottom") {
				position = { horizontal: "center", vertical: val };
			} else {
				position = { horizontal: val, vertical: "center" };
			}
		} else {
			position = { horizontal: val, vertical: "center" };
		}
	} else {
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
 * Parse CSS 4-value syntax (top, right, bottom, left).
 *
 * Accepts 1-4 length-percentage values following CSS 4-value expansion:
 * - 1 value: all sides
 * - 2 values: vertical | horizontal
 * - 3 values: top | horizontal | bottom
 * - 4 values: top | right | bottom | left (clockwise)
 *
 * Commonly used by margin, padding, inset(), scroll-margin, etc.
 *
 * @param nodes - Array of 1-4 CSS nodes
 * @returns Result with TRBL values or error
 *
 * @example
 * ```typescript
 * // Parse "10px 20px"
 * const result = parseTRBLLengthPercentage([node1, node2]);
 * // { top: 10px, right: 20px, bottom: 10px, left: 20px }
 * ```
 */
export function parseTRBLLengthPercentage(nodes: csstree.CssNode[]): Result<
	{
		top: Type.LengthPercentage;
		right: Type.LengthPercentage;
		bottom: Type.LengthPercentage;
		left: Type.LengthPercentage;
	},
	string
> {
	// Validate count
	if (nodes.length < 1 || nodes.length > 4) {
		return err(`Expected 1-4 length-percentage values, got ${nodes.length}`);
	}

	// Parse all values
	const values: Type.LengthPercentage[] = [];
	for (const node of nodes) {
		// Handle unitless zero
		if (node.type === "Number") {
			const val = Number.parseFloat(node.value);
			if (val !== 0) {
				return err("Unitless values must be zero");
			}
			values.push({ value: 0, unit: "px" });
			continue;
		}

		// Parse length-percentage
		const result = parseLengthPercentageNode(node);
		if (!result.ok) {
			return err(result.error);
		}
		values.push(result.value);
	}

	// Expand per CSS 4-value syntax
	switch (values.length) {
		case 1:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[0]!,
			});
		case 2:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[1]!,
			});
		case 3:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[1]!,
			});
		case 4:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[3]!,
			});
		default:
			return err("Invalid number of values");
	}
}

/**
 * Parse CSS corner values using TRBL expansion rules.
 *
 * This function parses 1-4 length-percentage values and expands them to
 * all 4 corners using the same expansion logic as CSS box model properties.
 * It is used by clip-path shapes (inset, rect, xywh) for border-radius values
 * after the 'round' keyword.
 *
 * **IMPORTANT**: This is NOT a CSS property parser. It parses multi-value
 * syntax used WITHIN other values. The actual border-radius property parser
 * is in `src/parse/border/radius.ts` and only accepts single values (longhand).
 *
 * Expansion rules (same as margin/padding):
 * - 1 value: all corners
 * - 2 values: (top-left/bottom-right) (top-right/bottom-left)
 * - 3 values: top-left (top-right/bottom-left) bottom-right
 * - 4 values: top-left top-right bottom-right bottom-left (clockwise from top-left)
 *
 * @param nodes - Array of 1-4 CSS nodes (length-percentage values, non-negative)
 * @returns Result with 4 corner values or error
 *
 * @example
 * Used in clip-path shapes:
 * ```typescript
 * // inset(10px round 5px 10px)
 * //                  ^^^^^^^^ these nodes
 * const result = parseCornerValues(radiusNodes);
 * // { topLeft: 5px, topRight: 10px, bottomRight: 5px, bottomLeft: 10px }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset | MDN: inset()}
 */
export function parseCornerValues(nodes: csstree.CssNode[]): Result<
	{
		topLeft: Type.LengthPercentage;
		topRight: Type.LengthPercentage;
		bottomRight: Type.LengthPercentage;
		bottomLeft: Type.LengthPercentage;
	},
	string
> {
	// Validate count
	if (nodes.length < 1 || nodes.length > 4) {
		return err(`Expected 1-4 border-radius values, got ${nodes.length}`);
	}

	// Parse all values
	const values: Type.LengthPercentage[] = [];
	for (const node of nodes) {
		// Handle unitless zero
		if (node.type === "Number") {
			const val = Number.parseFloat(node.value);
			if (val !== 0) {
				return err("Unitless values must be zero");
			}
			values.push({ value: 0, unit: "px" });
			continue;
		}

		// Parse length-percentage
		const result = parseLengthPercentageNode(node);
		if (!result.ok) {
			return err(result.error);
		}

		// Validate non-negative
		if (result.value.value < 0) {
			return err("border-radius values must be non-negative");
		}

		values.push(result.value);
	}

	// Expand per CSS 4-value syntax (clockwise from top-left)
	switch (values.length) {
		case 1:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[0]!,
			});
		case 2:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[1]!,
			});
		case 3:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[1]!,
			});
		case 4:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[3]!,
			});
		default:
			return err("Invalid number of values");
	}
}
