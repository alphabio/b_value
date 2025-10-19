// b_path:: src/generate/transform/origin.ts
import type * as Type from "@/core/types";
import * as Position from "../position/position";

/**
 * Generate CSS transform-origin string from Position2D or Position3D IR.
 *
 * Converts a Position2D or Position3D IR object into a valid CSS transform-origin string.
 * Handles both 2D (x y) and 3D (x y z) positions.
 *
 * @param ir - Position2D or Position3D IR object
 * @returns CSS transform-origin string
 *
 * @public
 *
 * @example
 * 2D keyword position:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Transform.Origin.toCss({
 *   horizontal: "center",
 *   vertical: "top"
 * });
 * console.log(css); // "center top"
 * ```
 *
 * @example
 * 2D with values:
 * ```typescript
 * const css = Generate.Transform.Origin.toCss({
 *   horizontal: { value: 50, unit: "%" },
 *   vertical: { value: 100, unit: "px" }
 * });
 * console.log(css); // "50% 100px"
 * ```
 *
 * @example
 * 3D position:
 * ```typescript
 * const css = Generate.Transform.Origin.toCss({
 *   x: "left",
 *   y: "top",
 *   z: { value: 10, unit: "px" }
 * });
 * console.log(css); // "left top 10px"
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin | MDN: transform-origin}
 */
export function toCss(ir: Type.Position2D | Type.Position3D): string {
	// Check if it's a 3D position (has x, y, z)
	if ("x" in ir && "y" in ir && "z" in ir) {
		return Position.to3DCss(ir);
	}

	// 2D position
	return Position.toCss(ir);
}

/**
 * Generate CSS perspective-origin string from Position2D IR.
 *
 * Converts a Position2D IR object into a valid CSS perspective-origin string.
 * Only supports 2D positions.
 *
 * @param ir - Position2D IR object
 * @returns CSS perspective-origin string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Transform.PerspectiveOrigin.toCss({
 *   horizontal: { value: 50, unit: "%" },
 *   vertical: { value: 50, unit: "%" }
 * });
 * console.log(css); // "50% 50%"
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin | MDN: perspective-origin}
 */
export function toCssPerspectiveOrigin(ir: Type.Position2D): string {
	return Position.toCss(ir);
}
