// b_path:: src/generate/layout/right.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { Right } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS right property from IR.
 *
 * Outputs length-percentage value or "auto" keyword.
 *
 * @param right - Right IR
 * @returns CSS string like "10px", "50%", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/right}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/right";
 *
 * const css = toCss({ kind: "right", value: { value: 10, unit: "px" } });
 * // "10px"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "right", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function generate(right: Right): GenerateResult {
	if (right === undefined || right === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (right.value === "auto") {
		return generateOk("auto");
	}
	return generateOk(GenUtils.lengthPercentageToCss(right.value));
}
