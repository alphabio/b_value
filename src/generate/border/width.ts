// b_path:: src/generate/border/width.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS border-width property value from IR.
 *
 * Converts BorderWidthValue IR to CSS string representation.
 *
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param ir - BorderWidthValue IR object
 * @returns CSS border-width value string
 *
 * @example
 * Keyword:
 * ```typescript
 * const css = toCss({ kind: "border-width", width: "medium" });
 * // "medium"
 * ```
 *
 * @example
 * Length:
 * ```typescript
 * const css = toCss({ kind: "border-width", width: { value: 1, unit: "px" } });
 * // "1px"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-width | MDN: border-width}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-width | W3C Spec}
 */
export function generate(ir: Type.BorderWidthValue): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof ir.width === "string") {
		return generateOk(ir.width);
	}
	return generateOk(`${ir.width.value}${ir.width.unit}`);
}
