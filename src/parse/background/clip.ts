// b_path:: src/parse/background/clip.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse background-clip value.
 *
 * Parses CSS background-clip values that set whether an element's background
 * extends underneath its border box, padding box, or content box.
 *
 * Valid values: border-box | padding-box | content-box | text
 *
 * @param css - CSS string containing background-clip value
 * @returns Result containing BackgroundClipKeyword, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Background.Clip.parse("padding-box");
 * if (result.ok) {
 *   console.log(result.value); // "padding-box"
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip | MDN: background-clip}
 */
export function parse(css: string): Result<Keyword.BackgroundClipKeyword, string> {
	const trimmed = css.trim();
	const result = Keyword.backgroundClipKeywordsSchema.safeParse(trimmed);

	if (!result.success) {
		return err(`Invalid background-clip value: "${css}"`);
	}

	return ok(result.data);
}
