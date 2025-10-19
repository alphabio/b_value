// b_path:: src/generate/border/style.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS border-style property value from IR.
 *
 * Converts BorderStyleValue IR to CSS string representation.
 *
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param ir - BorderStyleValue IR object
 * @returns CSS border-style value string
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "border-style", style: "solid" });
 * // "solid"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-style | MDN: border-style}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-style | W3C Spec}
 */
export function toCss(ir: Type.BorderStyleValue): string {
	return ir.style;
}
