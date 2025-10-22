// b_path:: src/generate/typography/text-align.ts
import type { TextAlign } from "@/core/types";

/**
 * Generate CSS text-align property from IR.
 *
 * Outputs alignment keyword.
 *
 * @param textAlign - TextAlign IR
 * @returns CSS string like "center", "left", or "justify"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-align}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/text-align";
 *
 * const css = toCss({ kind: "text-align", value: "center" });
 * // "center"
 * ```
 *
 * @public
 */
export function toCss(textAlign: TextAlign): string {
	return textAlign.value;
}
