// b_path:: src/generate/layout/padding-top.ts
import type { PaddingTop } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS padding-top property from IR.
 *
 * @param paddingTop - PaddingTop IR
 * @returns CSS string like "10px" or "5%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top}
 *
 * @public
 */
export function toCss(paddingTop: PaddingTop): string {
	return GenUtils.lengthPercentageToCss(paddingTop.value);
}
