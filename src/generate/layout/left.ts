// b_path:: src/generate/layout/left.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
export function generate(left: Left): GenerateResult {
	if (left === undefined || left === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (left.value === "auto") {
		return generateOk("auto");
	}
	return GenUtils.lengthPercentageToCss(left.value);
}
