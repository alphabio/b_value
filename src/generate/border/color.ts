// b_path:: src/generate/border/color.ts
import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS border-color property value from IR.
 *
 * Converts BorderColorValue IR to CSS string representation.
 *
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param ir - BorderColorValue IR object
 * @returns GenerateResult containing CSS border-color value string
 *
 * @example
 * ```typescript
 * const result = generate({ kind: "border-color", color: "red" });
 * // { ok: true, value: "red", issues: [] }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-color | MDN: border-color}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-color | W3C Spec}
 */
export function generate(ir: Type.BorderColorValue): GenerateResult {
	return generateOk(ir.color);
}
