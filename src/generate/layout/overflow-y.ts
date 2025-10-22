// b_path:: src/generate/layout/overflow-y.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { OverflowY } from "@/core/types";

/**
 * Generate CSS overflow-y property from IR.
 *
 * Outputs overflow-y keyword value.
 *
 * @param overflowY - OverflowY IR
 * @returns CSS string like "auto" or "scroll"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/overflow-y";
 *
 * const css = toCss({ kind: "overflow-y", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function generate(overflowY: OverflowY): GenerateResult {
	if (overflowY === undefined || overflowY === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(overflowY.value);
}
