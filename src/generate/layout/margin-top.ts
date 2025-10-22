// b_path:: src/generate/layout/margin-top.ts
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
export function toCss(marginTop: MarginTop): string {
	if (typeof marginTop.value === "string") {
		return marginTop.value;
	}
	return GenUtils.lengthPercentageToCss(marginTop.value);
}
