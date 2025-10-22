// b_path:: src/generate/layout/padding-right.ts

import { type GenerateResult, generateErr } from "@/core/result";
import type { PaddingRight } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS padding-right property from IR.
 *
 * @param paddingRight - PaddingRight IR
 * @returns CSS string like "10px" or "5%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right}
 *
 * @public
 */
export function generate(paddingRight: PaddingRight): GenerateResult {
	if (paddingRight === undefined || paddingRight === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return GenUtils.lengthPercentageToCss(paddingRight.value);
}
