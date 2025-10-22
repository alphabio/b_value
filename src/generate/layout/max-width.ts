// b_path:: src/generate/layout/max-width.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { MaxWidth } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS max-width property from IR.
 *
 * @param maxWidth - MaxWidth IR
 * @returns CSS string like "200px", "50%", "none", or "max-content"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/max-width}
 *
 * @public
 */
export function generate(maxWidth: MaxWidth): GenerateResult {
	if (maxWidth === undefined || maxWidth === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof maxWidth.value === "string") {
		return generateOk(maxWidth.value);
	}
	return GenUtils.lengthPercentageToCss(maxWidth.value);
}
