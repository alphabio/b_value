// b_path:: src/generate/typography/overflow-wrap.ts
import type { OverflowWrap } from "@/core/types";

/**
 * Generate CSS overflow-wrap property from IR.
 *
 * Outputs keyword value.
 *
 * @param overflowWrap - OverflowWrap IR
 * @returns CSS string like "normal", "break-word", or "anywhere"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/overflow-wrap";
 *
 * const css = toCss({ kind: "overflow-wrap", value: "break-word" });
 * // "break-word"
 * ```
 *
 * @public
 */
export function toCss(overflowWrap: OverflowWrap): string {
	return overflowWrap.value;
}
