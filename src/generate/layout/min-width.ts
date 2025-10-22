// b_path:: src/generate/layout/min-width.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { MinWidth } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS min-width property from IR.
 *
 * @param minWidth - MinWidth IR
 * @returns CSS string like "200px", "50%", "auto", or "min-content"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/min-width}
 *
 * @public
 */
export function generate(minWidth: MinWidth): GenerateResult {
	if (minWidth === undefined || minWidth === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof minWidth.value === "string") {
		return generateOk(minWidth.value);
	}
	return GenUtils.lengthPercentageToCss(minWidth.value);
}
