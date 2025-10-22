// b_path:: src/generate/layout/margin-right.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { MarginRight } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS margin-right property from IR.
 *
 * @param marginRight - MarginRight IR
 * @returns CSS string like "10px", "5%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right}
 *
 * @public
 */
export function generate(marginRight: MarginRight): GenerateResult {
	if (marginRight === undefined || marginRight === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof marginRight.value === "string") {
		return generateOk(marginRight.value);
	}
	return GenUtils.lengthPercentageToCss(marginRight.value);
}
