// b_path:: src/generate/layout/padding-left.ts
import type { PaddingLeft } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS padding-left property from IR.
 *
 * @param paddingLeft - PaddingLeft IR
 * @returns CSS string like "10px" or "5%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left}
 *
 * @public
 */
export function toCss(paddingLeft: PaddingLeft): string {
	return GenUtils.lengthPercentageToCss(paddingLeft.value);
}
