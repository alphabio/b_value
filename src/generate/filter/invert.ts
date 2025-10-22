// b_path:: src/generate/filter/invert.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { InvertFilter } from "@/core/types/filter";

/**
 * Generate CSS invert() filter function from IR.
 *
 * Outputs invert value as a number (not percentage).
 * 0 = no invert, 1 = 100% invert.
 *
 * @param filter - InvertFilter IR
 * @returns CSS string like "invert(0.5)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/invert";
 *
 * const css = toCss({ kind: "invert", value: 0.5 });
 * // "invert(0.5)"
 * ```
 *
 * @public
 */
export function generate(filter: InvertFilter): GenerateResult {
	if (filter === undefined || filter === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const { value } = filter;
	return generateOk(`invert(${value})`);
}
