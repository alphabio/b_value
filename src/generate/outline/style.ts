// b_path:: src/generate/outline/style.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS outline-style property value from IR.
 *
 * Converts OutlineStyleValue IR to CSS string representation.
 *
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param ir - OutlineStyleValue IR object
 * @returns CSS outline-style value string
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "outline-style", style: "solid" });
 * // "solid"
 * ```
 *
 * @example
 * Auto (outline-specific):
 * ```typescript
 * const css = toCss({ kind: "outline-style", style: "auto" });
 * // "auto"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style | MDN: outline-style}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-style | W3C Spec}
 */
export function toCss(ir: Type.OutlineStyleValue): string {
	return ir.style;
}
