// b_path:: src/generate/typography/letter-spacing.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { LetterSpacing } from "@/core/types";
import { lengthPercentageToCss } from "@/utils/generate/values";

/**
 * Generate CSS letter-spacing property from IR.
 *
 * Outputs length value or 'normal' keyword.
 *
 * @param letterSpacing - LetterSpacing IR
 * @returns CSS string like "normal", "0.1em", or "2px"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/letter-spacing";
 *
 * const css = toCss({ kind: "letter-spacing", value: "normal" });
 * // "normal"
 * ```
 *
 * @public
 */
export function generate(letterSpacing: LetterSpacing): GenerateResult {
	if (letterSpacing === undefined || letterSpacing === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (letterSpacing.value === "normal") {
		return generateOk("normal");
	}
	return generateOk(lengthPercentageToCss(letterSpacing.value));
}
