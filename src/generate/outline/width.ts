// b_path:: src/generate/outline/width.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS outline-width property value from IR.
 *
 * Converts OutlineWidthValue IR to CSS string representation.
 *
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param ir - OutlineWidthValue IR object
 * @returns CSS outline-width value string
 *
 * @example
 * Keyword:
 * ```typescript
 * const css = toCss({ kind: "outline-width", width: "medium" });
 * // "medium"
 * ```
 *
 * @example
 * Length:
 * ```typescript
 * const css = toCss({ kind: "outline-width", width: { value: 1, unit: "px" } });
 * // "1px"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width | MDN: outline-width}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-width | W3C Spec}
 */
export function toCss(ir: Type.OutlineWidthValue): string {
	if (typeof ir.width === "string") {
		return ir.width;
	}
	return `${ir.width.value}${ir.width.unit}`;
}
