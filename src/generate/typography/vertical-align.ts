// b_path:: src/generate/typography/vertical-align.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { VerticalAlign } from "@/core/types";
import { lengthPercentageToCss } from "@/utils/generate/values";

/**
 * Generate CSS vertical-align property from IR.
 *
 * Outputs keyword, length, or percentage value.
 *
 * @param verticalAlign - VerticalAlign IR
 * @returns CSS string like "middle", "5px", or "50%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/vertical-align";
 *
 * const css = toCss({ kind: "vertical-align", value: "middle" });
 * // "middle"
 * ```
 *
 * @public
 */
export function generate(verticalAlign: VerticalAlign): GenerateResult {
	if (verticalAlign === undefined || verticalAlign === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof verticalAlign.value === "string") {
		return generateOk(verticalAlign.value);
	}
	return lengthPercentageToCss(verticalAlign.value);
}
