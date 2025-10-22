// b_path:: src/generate/filter/saturate.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { SaturateFilter } from "@/core/types/filter";

/**
 * Generate CSS saturate() filter function from IR.
 *
 * Outputs saturate value as a number (not percentage).
 * 1 = 100% saturate (no change), 0 = completely black.
 *
 * @param filter - SaturateFilter IR
 * @returns CSS string like "saturate(1.5)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/saturate";
 *
 * const css = toCss({ kind: "saturate", value: 1.5 });
 * // "saturate(1.5)"
 * ```
 *
 * @public
 */
export function generate(filter: SaturateFilter): GenerateResult {
	if (filter === undefined || filter === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const { value } = filter;
	return generateOk(`saturate(${value})`);
}
