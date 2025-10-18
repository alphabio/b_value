// b_path:: src/generate/position/position.ts
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
 * const css = Generate.Position.toCss({
 *   horizontal: "center",
 *   vertical: "center"
 * });
 * console.log(css); // "center center"
 * ```
 *
 * @example
 * Mixed position:
 * ```typescript
 * const css = Generate.Position.toCss({
 *   horizontal: "left",
 *   vertical: { value: 50, unit: "%" }
 * });
 * console.log(css); // "left 50%"
 * ```
 *
 * @example
 * Length/percentage position:
 * ```typescript
 * const css = Generate.Position.toCss({
 *   horizontal: { value: 100, unit: "px" },
 *   vertical: { value: 50, unit: "%" }
 * });
 * console.log(css); // "100px 50%"
 * ```
 */
export function toCss(ir: Type.Position2D): string {
	const h = positionValueToCss(ir.horizontal);
	const v = positionValueToCss(ir.vertical);
	return `${h} ${v}`;
}

/**
 * Generate CSS 3D position string from Position3D IR.
 *
 * @param ir - Position3D IR object to convert to CSS
 * @returns CSS 3D position string
 *
 * @public
 */
export function to3DCss(ir: Type.Position3D): string {
	const x = positionValueToCss(ir.x);
	const y = positionValueToCss(ir.y);
	const z = `${ir.z.value}${ir.z.unit}`;
	return `${x} ${y} ${z}`;
}

/**
 * Generate CSS position list string from PositionList IR.
 *
 * @param ir - PositionList IR object to convert to CSS
 * @returns CSS position list string
 *
 * @public
 */
export function toListCss(ir: Type.PositionList): string {
	const positionStrings = ir.map(toCss);
	return positionStrings.join(", ");
}

/**
 * Generate CSS position string from common position preset.
 *
 * @param preset - Common position preset name
 * @returns CSS position string
 *
 * @public
 */
export function fromCommonPosition(preset: keyof Type.CommonPositions): string {
	const position = Type.COMMON_POSITIONS[preset];
	return toCss(position);
}
