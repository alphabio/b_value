// b_path:: src/generate/typography/font-size.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FontSize } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS font-size property from IR.
 *
 * Outputs length-percentage value or keyword.
 *
 * @param fontSize - FontSize IR
 * @returns CSS string like "16px", "1.2em", or "medium"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/font-size";
 *
 * const css = toCss({ kind: "font-size", value: { value: 16, unit: "px" } });
 * // "16px"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "font-size", value: "medium" });
 * // "medium"
 * ```
 *
 * @public
 */
export function generate(fontSize: FontSize): GenerateResult {
	if (fontSize === undefined || fontSize === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof fontSize.value === "string") {
		return generateOk(fontSize.value);
	}
	return generateOk(GenUtils.lengthPercentageToCss(fontSize.value));
}
