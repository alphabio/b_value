// b_path:: src/generate/layout/bottom.ts
import type { Bottom } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS bottom property from IR.
 *
 * Outputs length-percentage value or "auto" keyword.
 *
 * @param bottom - Bottom IR
 * @returns CSS string like "10px", "50%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/bottom}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/bottom";
 *
 * const css = toCss({ kind: "bottom", value: { value: 10, unit: "px" } });
 * // "10px"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "bottom", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function toCss(bottom: Bottom): string {
	if (bottom.value === "auto") {
		return "auto";
	}
	return GenUtils.lengthPercentageToCss(bottom.value);
}
