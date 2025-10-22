// b_path:: src/generate/typography/text-transform.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { TextTransform } from "@/core/types";

/**
 * Generate CSS text-transform property from IR.
 *
 * Outputs keyword value.
 *
 * @param textTransform - TextTransform IR
 * @returns CSS string like "none", "uppercase", or "capitalize"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/text-transform";
 *
 * const css = toCss({ kind: "text-transform", value: "uppercase" });
 * // "uppercase"
 * ```
 *
 * @public
 */
export function generate(textTransform: TextTransform): GenerateResult {
	if (textTransform === undefined || textTransform === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(textTransform.value);
}
