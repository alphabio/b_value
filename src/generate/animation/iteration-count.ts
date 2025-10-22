// b_path:: src/generate/animation/iteration-count.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS animation-iteration-count property value from IR.
 *
 * Converts AnimationIterationCount IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationIterationCount IR object
 * @returns CSS animation-iteration-count value string
 *
 * @example
 * Number count:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-iteration-count",
 *   counts: [{ type: "number", value: 3 }]
 * });
 * // "3"
 * ```
 *
 * @example
 * Infinite keyword:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-iteration-count",
 *   counts: [{ type: "infinite" }]
 * });
 * // "infinite"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count | MDN: animation-iteration-count}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-iteration-count | W3C Spec}
 */
export function generate(ir: Type.AnimationIterationCount): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return ir.counts
		.map((count) => {
			if (count.type === "infinite") {
				return generateOk("infinite");
			}
			return generateOk(String(count.value));
		})
		.join(", ");
}
