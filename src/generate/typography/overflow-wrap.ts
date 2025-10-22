// b_path:: src/generate/typography/overflow-wrap.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { OverflowWrap } from "@/core/types";

/**
 * Generate CSS overflow-wrap property from IR.
 *
 * Outputs keyword value.
 *
 * @param overflowWrap - OverflowWrap IR
 * @returns CSS string like "normal", "break-word", or "anywhere"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/overflow-wrap";
 *
 * const css = toCss({ kind: "overflow-wrap", value: "break-word" });
 * // "break-word"
 * ```
 *
 * @public
 */
export function generate(overflowWrap: OverflowWrap): GenerateResult {
	if (overflowWrap === undefined || overflowWrap === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(overflowWrap.value);
}
