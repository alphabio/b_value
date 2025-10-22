// b_path:: src/generate/layout/margin-left.ts
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
export function toCss(marginLeft: MarginLeft): string {
	if (typeof marginLeft.value === "string") {
		return marginLeft.value;
	}
	return GenUtils.lengthPercentageToCss(marginLeft.value);
}
