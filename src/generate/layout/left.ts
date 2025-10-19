// b_path:: src/generate/layout/left.ts
import type { Left } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS left property from IR.
 *
 * Outputs length-percentage value or "auto" keyword.
 *
 * @param left - Left IR
 * @returns CSS string like "10px", "50%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/left}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/left";
 *
 * const css = toCss({ kind: "left", value: { value: 10, unit: "px" } });
 * // "10px"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "left", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function toCss(left: Left): string {
	if (left.value === "auto") {
		return "auto";
	}
	return GenUtils.lengthPercentageToCss(left.value);
}
