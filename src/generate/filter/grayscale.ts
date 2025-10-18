// b_path:: src/generate/filter/grayscale.ts
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
export function toCss(filter: GrayscaleFilter): string {
	const { value } = filter;
	return `grayscale(${value})`;
}
