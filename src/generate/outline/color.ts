// b_path:: src/generate/outline/color.ts
import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS outline-color property value from IR.
 *
 * Converts OutlineColorValue IR to CSS string representation.
 *
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param ir - OutlineColorValue IR object
 * @returns GenerateResult containing CSS outline-color value string
 *
 * @example
 * ```typescript
 * const result = generate({ kind: "outline-color", color: "red" });
 * // { ok: true, value: "red", issues: [] }
 * ```
 *
 * @example
 * Invert (outline-specific):
 * ```typescript
 * const result = generate({ kind: "outline-color", color: "invert" });
 * // { ok: true, value: "invert", issues: [] }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color | MDN: outline-color}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-color | W3C Spec}
 */
export function generate(ir: Type.OutlineColorValue): GenerateResult {
	return generateOk(ir.color);
}
