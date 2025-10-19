// b_path:: src/generate/background/repeat.ts
import type * as Keyword from "@/core/keywords";

/**
 * Generate CSS background-repeat string from keyword.
 *
 * @param keyword - RepeatKeyword value
 * @returns CSS background-repeat string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Repeat.toCss("repeat-x");
 * console.log(css); // "repeat-x"
 * ```
 */
export function toCss(keyword: Keyword.RepeatKeyword): string {
	return keyword;
}
