// b_path:: src/generate/layout/margin-right.ts
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
export function toCss(marginRight: MarginRight): string {
	if (typeof marginRight.value === "string") {
		return marginRight.value;
	}
	return GenUtils.lengthPercentageToCss(marginRight.value);
}
