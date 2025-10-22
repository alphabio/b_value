// b_path:: src/generate/filter/sepia.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { SepiaFilter } from "@/core/types/filter";

/**
 * Generate CSS sepia() filter function from IR.
 *
 * Outputs sepia value as a number (not percentage).
 * 0 = no sepia, 1 = 100% sepia.
 *
 * @param filter - SepiaFilter IR
 * @returns CSS string like "sepia(0.5)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/sepia";
 *
 * const css = toCss({ kind: "sepia", value: 0.5 });
 * // "sepia(0.5)"
 * ```
 *
 * @public
 */
export function generate(filter: SepiaFilter): GenerateResult {
	if (filter === undefined || filter === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const { value } = filter;
	return generateOk(`sepia(${value})`);
}
