// b_path:: src/generate/background/origin.ts
import type * as Keyword from "@/core/keywords";

/**
 * Generate CSS background-origin string from keyword.
 *
 * @param keyword - VisualBoxKeyword value
 * @returns CSS background-origin string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Origin.toCss("content-box");
 * console.log(css); // "content-box"
 * ```
 */
export function toCss(keyword: Keyword.VisualBoxKeyword): string {
	return keyword;
}
