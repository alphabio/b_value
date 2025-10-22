// b_path:: src/generate/layout/margin-bottom.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { MarginBottom } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS margin-bottom property from IR.
 *
 * @param marginBottom - MarginBottom IR
 * @returns CSS string like "10px", "5%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom}
 *
 * @public
 */
export function generate(marginBottom: MarginBottom): GenerateResult {
	if (marginBottom === undefined || marginBottom === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof marginBottom.value === "string") {
		return generateOk(marginBottom.value);
	}
	return generateOk(GenUtils.lengthPercentageToCss(marginBottom.value));
}
