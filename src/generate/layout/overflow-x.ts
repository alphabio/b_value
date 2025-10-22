// b_path:: src/generate/layout/overflow-x.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { OverflowX } from "@/core/types";

/**
 * Generate CSS overflow-x property from IR.
 *
 * Outputs overflow-x keyword value.
 *
 * @param overflowX - OverflowX IR
 * @returns CSS string like "hidden" or "scroll"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/overflow-x";
 *
 * const css = toCss({ kind: "overflow-x", value: "hidden" });
 * // "hidden"
 * ```
 *
 * @public
 */
export function generate(overflowX: OverflowX): GenerateResult {
	if (overflowX === undefined || overflowX === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(overflowX.value);
}
