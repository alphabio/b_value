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
