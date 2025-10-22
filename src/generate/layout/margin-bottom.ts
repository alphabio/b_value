// b_path:: src/generate/layout/margin-bottom.ts
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
export function toCss(marginBottom: MarginBottom): string {
	if (typeof marginBottom.value === "string") {
		return marginBottom.value;
	}
	return GenUtils.lengthPercentageToCss(marginBottom.value);
}
