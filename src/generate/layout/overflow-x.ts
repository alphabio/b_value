// b_path:: src/generate/layout/overflow-x.ts
import type { OverflowX } from "@/core/types";

/**
 * Generate CSS overflow-x property from IR.
 *
 * Outputs overflow-x keyword value.
 *
 * @param overflowX - OverflowX IR
 * @returns CSS string like "hidden" or "scroll"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/overflow-x";
 *
 * const css = toCss({ kind: "overflow-x", value: "hidden" });
 * // "hidden"
 * ```
 *
 * @public
 */
export function toCss(overflowX: OverflowX): string {
	return overflowX.value;
}
