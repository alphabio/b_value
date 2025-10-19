// b_path:: src/generate/text/line.ts
import type * as Keyword from "@/core/keywords";

/**
 * Generate CSS text-decoration-line string from keyword.
 *
 * @param keyword - TextDecorationLineKeyword value
 * @returns CSS text-decoration-line string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Text.Line.toCss("underline");
 * console.log(css); // "underline"
 * ```
 */
export function toCss(keyword: Keyword.TextDecorationLineKeyword): string {
	return keyword;
}
