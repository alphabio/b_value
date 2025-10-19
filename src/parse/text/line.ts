// b_path:: src/parse/text/line.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse text-decoration-line value.
 *
 * Parses CSS text-decoration-line values that set the kind of decoration used.
 * Valid values: none | underline | overline | line-through
 *
 * @param css - CSS string containing text-decoration-line value
 * @returns Result containing TextDecorationLineKeyword, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Text.Line.parse("underline");
 * if (result.ok) {
 *   console.log(result.value); // "underline"
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line | MDN: text-decoration-line}
 */
export function parse(css: string): Result<Keyword.TextDecorationLineKeyword, string> {
	const trimmed = css.trim();
	const result = Keyword.textDecorationLineKeywordsSchema.safeParse(trimmed);

	if (!result.success) {
		return err(`Invalid text-decoration-line value: "${css}"`);
	}

	return ok(result.data);
}
