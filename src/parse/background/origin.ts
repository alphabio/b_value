// b_path:: src/parse/background/origin.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse background-origin value.
 *
 * Parses CSS background-origin values that set the background's origin,
 * from the border start, inside the border, or inside the padding.
 *
 * Valid values: border-box | padding-box | content-box
 *
 * @param css - CSS string containing background-origin value
 * @returns Result containing VisualBoxKeyword, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Background.Origin.parse("content-box");
 * if (result.ok) {
 *   console.log(result.value); // "content-box"
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin | MDN: background-origin}
 */
export function parse(css: string): Result<Keyword.VisualBoxKeyword, string> {
	const trimmed = css.trim();
	const result = Keyword.visualBoxKeywordsSchema.safeParse(trimmed);

	if (!result.success) {
		return err(`Invalid background-origin value: "${css}"`);
	}

	return ok(result.data);
}
