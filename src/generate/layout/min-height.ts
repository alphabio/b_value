// b_path:: src/generate/layout/min-height.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { MinHeight } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS min-height property from IR.
 *
 * @param minHeight - MinHeight IR
 * @returns CSS string like "100px", "50%", "auto", or "min-content"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/min-height}
 *
 * @public
 */
export function generate(minHeight: MinHeight): GenerateResult {
	if (minHeight === undefined || minHeight === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof minHeight.value === "string") {
		return generateOk(minHeight.value);
	}
	return GenUtils.lengthPercentageToCss(minHeight.value);
}
