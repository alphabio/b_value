// b_path:: src/generate/outline/offset.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS outline-offset property value from IR.
 *
 * Converts OutlineOffsetValue IR to CSS string representation.
 *
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param ir - OutlineOffsetValue IR object
 * @returns CSS outline-offset value string
 *
 * @example
 * Positive offset:
 * ```typescript
 * const css = toCss({ kind: "outline-offset", offset: { value: 5, unit: "px" } });
 * // "5px"
 * ```
 *
 * @example
 * Negative offset:
 * ```typescript
 * const css = toCss({ kind: "outline-offset", offset: { value: -2, unit: "px" } });
 * // "-2px"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset | MDN: outline-offset}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-offset | W3C Spec}
 */
export function generate(ir: Type.OutlineOffsetValue): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(`${ir.offset.value}${ir.offset.unit}`);
}
