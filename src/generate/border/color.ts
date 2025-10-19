// b_path:: src/generate/border/color.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS border-color property value from IR.
 *
 * Converts BorderColorValue IR to CSS string representation.
 *
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param ir - BorderColorValue IR object
 * @returns CSS border-color value string
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "border-color", color: "red" });
 * // "red"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-color | MDN: border-color}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-color | W3C Spec}
 */
export function toCss(ir: Type.BorderColorValue): string {
	return ir.color;
}
