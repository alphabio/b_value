// b_path:: src/generate/border/radius.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS border-radius property value from IR.
 *
 * Converts BorderRadiusValue IR to CSS string representation.
 *
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param ir - BorderRadiusValue IR object
 * @returns CSS border-radius value string
 *
 * @example
 * Length:
 * ```typescript
 * const css = toCss({ kind: "border-radius", radius: { value: 5, unit: "px" } });
 * // "5px"
 * ```
 *
 * @example
 * Percentage:
 * ```typescript
 * const css = toCss({ kind: "border-radius", radius: { value: 50, unit: "%" } });
 * // "50%"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius | MDN: border-radius}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-radius | W3C Spec}
 */
export function toCss(ir: Type.BorderRadiusValue): string {
	return `${ir.radius.value}${ir.radius.unit}`;
}
