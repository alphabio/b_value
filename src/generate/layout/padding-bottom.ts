// b_path:: src/generate/layout/padding-bottom.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { PaddingBottom } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS padding-bottom property from IR.
 *
 * @param paddingBottom - PaddingBottom IR
 * @returns CSS string like "10px" or "5%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom}
 *
 * @public
 */
export function generate(paddingBottom: PaddingBottom): GenerateResult {
	if (paddingBottom === undefined || paddingBottom === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(GenUtils.lengthPercentageToCss(paddingBottom.value));
}
