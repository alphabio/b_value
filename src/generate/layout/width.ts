// b_path:: src/generate/layout/width.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { Width } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS width property from IR.
 *
 * Outputs length-percentage value, auto keyword, or intrinsic sizing keyword.
 *
 * @param width - Width IR
 * @returns CSS string like "200px", "50%", "auto", or "min-content"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/width}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/width";
 *
 * const css = toCss({ kind: "width", value: { value: 200, unit: "px" } });
 * // "200px"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "width", value: "auto" });
 * // "auto"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "width", value: "min-content" });
 * // "min-content"
 * ```
 *
 * @public
 */
export function generate(width: Width): GenerateResult {
	if (width === undefined || width === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof width.value === "string") {
		return generateOk(width.value);
	}
	return generateOk(GenUtils.lengthPercentageToCss(width.value));
}
