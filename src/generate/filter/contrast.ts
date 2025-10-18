// b_path:: src/generate/filter/contrast.ts
import type { ContrastFilter } from "@/core/types/filter";

/**
 * Generate CSS contrast() filter function from IR.
 *
 * Outputs contrast value as a number (not percentage).
 * 1 = 100% contrast (no change), 0 = completely black.
 *
 * @param filter - ContrastFilter IR
 * @returns CSS string like "contrast(1.5)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/contrast}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/contrast";
 *
 * const css = toCss({ kind: "contrast", value: 1.5 });
 * // "contrast(1.5)"
 * ```
 *
 * @public
 */
export function toCss(filter: ContrastFilter): string {
	const { value } = filter;
	return `contrast(${value})`;
}
