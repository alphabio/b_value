// b_path:: src/generate/background/clip.ts
import type * as Keyword from "@/core/keywords";

/**
 * Generate CSS background-clip string from keyword.
 *
 * @param keyword - BackgroundClipKeyword value
 * @returns CSS background-clip string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Clip.toCss("padding-box");
 * console.log(css); // "padding-box"
 * ```
 */
export function toCss(keyword: Keyword.BackgroundClipKeyword): string {
	return keyword;
}
