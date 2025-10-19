// b_path:: src/generate/outline/color.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS outline-color property value from IR.
 *
 * Converts OutlineColorValue IR to CSS string representation.
 *
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param ir - OutlineColorValue IR object
 * @returns CSS outline-color value string
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "outline-color", color: "red" });
 * // "red"
 * ```
 *
 * @example
 * Invert (outline-specific):
 * ```typescript
 * const css = toCss({ kind: "outline-color", color: "invert" });
 * // "invert"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color | MDN: outline-color}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-color | W3C Spec}
 */
export function toCss(ir: Type.OutlineColorValue): string {
	return ir.color;
}
