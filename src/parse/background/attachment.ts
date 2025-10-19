// b_path:: src/parse/background/attachment.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse background-attachment value.
 *
 * Parses CSS background-attachment values that control whether a background
 * image's position is fixed within the viewport, or scrolls with its containing block.
 *
 * Valid values: scroll | fixed | local
 *
 * @param css - CSS string containing background-attachment value
 * @returns Result containing BackgroundAttachmentKeyword, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Background.Attachment.parse("fixed");
 * if (result.ok) {
 *   console.log(result.value); // "fixed"
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment | MDN: background-attachment}
 */
export function parse(css: string): Result<Keyword.BackgroundAttachmentKeyword, string> {
	const trimmed = css.trim();
	const result = Keyword.backgroundAttachmentKeywordsSchema.safeParse(trimmed);

	if (!result.success) {
		return err(`Invalid background-attachment value: "${css}"`);
	}

	return ok(result.data);
}
