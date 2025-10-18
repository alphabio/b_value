// b_path:: src/generate/filter/blur.ts
import type { BlurFilter } from "@/core/types/filter";

/**
 * Generate CSS blur() filter function from IR.
 *
 * Outputs blur radius with its unit (px, em, rem, etc.).
 * Preserves the original unit from the IR.
 *
 * @param filter - BlurFilter IR
 * @returns CSS string like "blur(5px)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/blur";
 *
 * const css = toCss({ kind: "blur", radius: { value: 5, unit: "px" } });
 * // "blur(5px)"
 * ```
 *
 * @public
 */
export function toCss(filter: BlurFilter): string {
	const { radius } = filter;
	return `blur(${radius.value}${radius.unit})`;
}
