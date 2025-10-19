// b_path:: src/generate/background/attachment.ts
import type * as Keyword from "@/core/keywords";

/**
 * Generate CSS background-attachment string from keyword.
 *
 * @param keyword - BackgroundAttachmentKeyword value
 * @returns CSS background-attachment string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Attachment.toCss("fixed");
 * console.log(css); // "fixed"
 * ```
 */
export function toCss(keyword: Keyword.BackgroundAttachmentKeyword): string {
	return keyword;
}
