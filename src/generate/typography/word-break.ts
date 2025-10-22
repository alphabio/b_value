// b_path:: src/generate/typography/word-break.ts
import type { WordBreak } from "@/core/types";

/**
 * Generate CSS word-break property from IR.
 *
 * Outputs keyword value.
 *
 * @param wordBreak - WordBreak IR
 * @returns CSS string like "normal", "break-all", or "keep-all"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/word-break}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/word-break";
 *
 * const css = toCss({ kind: "word-break", value: "break-all" });
 * // "break-all"
 * ```
 *
 * @public
 */
export function toCss(wordBreak: WordBreak): string {
	return wordBreak.value;
}
