// b_path:: src/generate/filter/saturate.ts
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
export function toCss(filter: SaturateFilter): string {
	const { value } = filter;
	return `saturate(${value})`;
}
