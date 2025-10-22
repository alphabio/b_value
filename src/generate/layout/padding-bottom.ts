// b_path:: src/generate/layout/padding-bottom.ts
import type { PaddingBottom } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS padding-bottom property from IR.
 *
 * @param paddingBottom - PaddingBottom IR
 * @returns CSS string like "10px" or "5%"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom}
 *
 * @public
 */
export function toCss(paddingBottom: PaddingBottom): string {
	return GenUtils.lengthPercentageToCss(paddingBottom.value);
}
