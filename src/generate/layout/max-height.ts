// b_path:: src/generate/layout/max-height.ts
import type { MaxHeight } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS max-height property from IR.
 *
 * @param maxHeight - MaxHeight IR
 * @returns CSS string like "100px", "50%", "none", or "max-content"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/max-height}
 *
 * @public
 */
export function toCss(maxHeight: MaxHeight): string {
	if (typeof maxHeight.value === "string") {
		return maxHeight.value;
	}
	return GenUtils.lengthPercentageToCss(maxHeight.value);
}
