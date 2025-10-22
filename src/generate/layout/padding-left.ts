// b_path:: src/generate/layout/padding-left.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { PaddingLeft } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS padding-left property from IR.
 *
 * @param paddingLeft - PaddingLeft IR
 * @returns CSS string like "10px" or "5%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left}
 *
 * @public
 */
export function generate(paddingLeft: PaddingLeft): GenerateResult {
	if (paddingLeft === undefined || paddingLeft === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(GenUtils.lengthPercentageToCss(paddingLeft.value));
}
