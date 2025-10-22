// b_path:: src/generate/layout/min-width.ts
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
export function toCss(minWidth: MinWidth): string {
	if (typeof minWidth.value === "string") {
		return minWidth.value;
	}
	return GenUtils.lengthPercentageToCss(minWidth.value);
}
