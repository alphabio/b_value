// b_path:: src/parse/text/style.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse text-decoration-style value.
 *
 * Parses CSS text-decoration-style values that set the style of text decoration lines.
 * Valid values: solid | double | dotted | dashed | wavy
 *
 * @param css - CSS string containing text-decoration-style value
 * @returns Result containing TextDecorationStyleKeyword, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Text.Style.parse("wavy");
 * if (result.ok) {
 *   console.log(result.value); // "wavy"
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style | MDN: text-decoration-style}
 */
export function parse(css: string): Result<Keyword.TextDecorationStyleKeyword, string> {
	const trimmed = css.trim();
	const result = Keyword.textDecorationStyleKeywordsSchema.safeParse(trimmed);

	if (!result.success) {
		return err(`Invalid text-decoration-style value: "${css}"`);
	}

	return ok(result.data);
}
