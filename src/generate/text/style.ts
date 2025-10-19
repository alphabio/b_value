// b_path:: src/generate/text/style.ts
import type * as Keyword from "@/core/keywords";

/**
 * Generate CSS text-decoration-style string from keyword.
 *
 * @param keyword - TextDecorationStyleKeyword value
 * @returns CSS text-decoration-style string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Text.Style.toCss("wavy");
 * console.log(css); // "wavy"
 * ```
 */
export function toCss(keyword: Keyword.TextDecorationStyleKeyword): string {
	return keyword;
}
