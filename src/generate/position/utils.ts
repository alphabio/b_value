// b_path:: src/generate/position/utils.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import * as Type from "@/core/types";
import { positionValueToCss } from "@/utils/generate/values";

/**
 * Generate CSS 2D position string from Position2D IR.
 *
 * Converts a Position2D IR object into a valid CSS position string.
 * Handles both keyword and length/percentage values.
 *
 * @param ir - Position2D IR object to convert to CSS
 * @returns CSS position string
 *
 * @public
 *
 * @example
 * Keyword position:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Position.generate({
 *   horizontal: "center",
 *   vertical: "center"
 * });
 * console.log(css); // "center center"
 * ```
 *
 * @example
 * Mixed position:
 * ```typescript
 * const css = Generate.Position.generate({
 *   horizontal: "left",
 *   vertical: { value: 50, unit: "%" }
 * });
 * console.log(css); // "left 50%"
 * ```
 *
 * @example
 * Length/percentage position:
 * ```typescript
 * const css = Generate.Position.generate({
 *   horizontal: { value: 100, unit: "px" },
 *   vertical: { value: 50, unit: "%" }
 * });
 * console.log(css); // "100px 50%"
 * ```
 */
export function generate(ir: Type.Position2D): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const h = positionValueToCss(ir.horizontal);
	const v = positionValueToCss(ir.vertical);
	return generateOk(`${h} ${v}`);
}

/**
 * Generate CSS 3D position string from Position3D IR.
 *
 * @param ir - Position3D IR object to convert to CSS
 * @returns CSS 3D position string
 *
 * @public
 */
export function to3DCss(ir: Type.Position3D): GenerateResult {
	const x = positionValueToCss(ir.x);
	const y = positionValueToCss(ir.y);
	const z = `${ir.z.value}${ir.z.unit}`;
	return generateOk(`${x} ${y} ${z}`);
}

/**
 * Generate CSS position list string from PositionList IR.
 *
 * @param ir - PositionList IR object to convert to CSS
 * @returns CSS position list string
 *
 * @public
 */
export function toListCss(ir: Type.PositionList): GenerateResult {
	const positionStrings = ir.map(toCss);
	return generateOk(positionStrings.join(", "));
}

/**
 * Generate CSS position string from common position preset.
 *
 * @param preset - Common position preset name
 * @returns CSS position string
 *
 * @public
 */
export function fromCommonPosition(preset: keyof Type.CommonPositions): GenerateResult {
	const position = Type.COMMON_POSITIONS[preset];
	return toCss(position);
}
