// b_path:: src/generate/layout/padding-right.ts
import type { PaddingRight } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS padding-right property from IR.
 *
 * @param paddingRight - PaddingRight IR
 * @returns CSS string like "10px" or "5%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right}
 *
 * @public
 */
export function toCss(paddingRight: PaddingRight): string {
	return GenUtils.lengthPercentageToCss(paddingRight.value);
}
