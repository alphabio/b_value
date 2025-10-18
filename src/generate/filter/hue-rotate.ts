// b_path:: src/generate/filter/hue-rotate.ts
import type { HueRotateFilter } from "@/core/types/filter";

/**
 * Generate CSS hue-rotate() filter function from IR.
 *
 * Outputs hue rotation angle with its unit (deg, grad, rad, turn).
 * Preserves the original unit from the IR.
 *
 * @param filter - HueRotateFilter IR
 * @returns CSS string like "hue-rotate(90deg)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/hue-rotate";
 *
 * const css = toCss({ kind: "hue-rotate", angle: { value: 90, unit: "deg" } });
 * // "hue-rotate(90deg)"
 * ```
 *
 * @public
 */
export function toCss(filter: HueRotateFilter): string {
	const { angle } = filter;
	return `hue-rotate(${angle.value}${angle.unit})`;
}
