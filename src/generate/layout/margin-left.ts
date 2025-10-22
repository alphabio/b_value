// b_path:: src/generate/layout/margin-left.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { MarginLeft } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS margin-left property from IR.
 *
 * @param marginLeft - MarginLeft IR
 * @returns CSS string like "10px", "5%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left}
 *
 * @public
 */
export function generate(marginLeft: MarginLeft): GenerateResult {
	if (marginLeft === undefined || marginLeft === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof marginLeft.value === "string") {
		return generateOk(marginLeft.value);
	}
	return GenUtils.lengthPercentageToCss(marginLeft.value);
}
