// b_path:: src/generate/layout/margin-top.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { MarginTop } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS margin-top property from IR.
 *
 * @param marginTop - MarginTop IR
 * @returns CSS string like "10px", "5%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top}
 *
 * @public
 */
export function generate(marginTop: MarginTop): GenerateResult {
	if (marginTop === undefined || marginTop === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof marginTop.value === "string") {
		return generateOk(marginTop.value);
	}
	return generateOk(GenUtils.lengthPercentageToCss(marginTop.value));
}
