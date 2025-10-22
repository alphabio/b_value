// b_path:: src/generate/layout/top.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { Top } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS top property from IR.
 *
 * Outputs length-percentage value or "auto" keyword.
 *
 * @param top - Top IR
 * @returns CSS string like "10px", "50%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/top}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/top";
 *
 * const css = toCss({ kind: "top", value: { value: 10, unit: "px" } });
 * // "10px"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "top", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function generate(top: Top): GenerateResult {
	if (top === undefined || top === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (top.value === "auto") {
		return generateOk("auto");
	}
	return GenUtils.lengthPercentageToCss(top.value);
}
