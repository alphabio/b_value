// b_path:: src/utils/parse/nodes/length.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Unit from "@/core/units";

/**
 * Length and percentage value parsing utilities.
 *
 * This module handles:
 * - CSS length values (px, em, rem, vh, vw, etc.)
 * - Percentage values
 * - Unitless zero
 * - LengthPercentage union types
 * - Numeric values
 *
 * @module utils/parse/nodes/length
 */

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
 * import { parseLengthNode } from "@/utils/parse/nodes/length";
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
