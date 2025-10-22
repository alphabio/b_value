// b_path:: src/generate/layout/height.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { Height } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS height property from IR.
 *
 * Outputs length-percentage value, auto keyword, or intrinsic sizing keyword.
 *
 * @param height - Height IR
 * @returns CSS string like "100px", "50%", "auto", or "max-content"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/height}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/height";
 *
 * const css = toCss({ kind: "height", value: { value: 100, unit: "px" } });
 * // "100px"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "height", value: "auto" });
 * // "auto"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "height", value: "max-content" });
 * // "max-content"
 * ```
 *
 * @public
 */
export function generate(height: Height): GenerateResult {
	if (height === undefined || height === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof height.value === "string") {
		return generateOk(height.value);
	}
	return generateOk(GenUtils.lengthPercentageToCss(height.value));
}
