// b_path:: src/generate/filter/grayscale.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { GrayscaleFilter } from "@/core/types/filter";

/**
 * Generate CSS grayscale() filter function from IR.
 *
 * Outputs grayscale value as a number (not percentage).
 * 0 = no grayscale, 1 = 100% grayscale.
 *
 * @param filter - GrayscaleFilter IR
 * @returns CSS string like "grayscale(0.5)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/grayscale}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/grayscale";
 *
 * const css = toCss({ kind: "grayscale", value: 0.5 });
 * // "grayscale(0.5)"
 * ```
 *
 * @public
 */
export function generate(filter: GrayscaleFilter): GenerateResult {
	if (filter === undefined || filter === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const { value } = filter;
	return generateOk(`grayscale(${value})`);
}
