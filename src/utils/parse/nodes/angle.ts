// b_path:: src/utils/parse/nodes/angle.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Unit from "@/core/units";

/**
 * Angle value parsing utilities.
 *
 * This module handles:
 * - CSS angle values (deg, rad, grad, turn)
 * - Unit validation and conversion
 *
 * @module utils/parse/nodes/angle
 */

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
