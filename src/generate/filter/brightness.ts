// b_path:: src/generate/filter/brightness.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { BrightnessFilter } from "@/core/types/filter";

/**
 * Generate CSS brightness() filter function from IR.
 *
 * Outputs brightness value as a number (not percentage).
 * 1 = 100% brightness (no change), 0 = completely black.
 *
 * @param filter - BrightnessFilter IR
 * @returns CSS string like "brightness(1.5)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/brightness";
 *
 * const css = toCss({ kind: "brightness", value: 1.5 });
 * // "brightness(1.5)"
 * ```
 *
 * @public
 */
export function generate(filter: BrightnessFilter): GenerateResult {
	if (filter === undefined || filter === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const { value } = filter;
	return generateOk(`brightness(${value})`);
}
