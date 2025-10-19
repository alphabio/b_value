// b_path:: src/parse/background/repeat.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse background-repeat value.
 *
 * Parses CSS background-repeat values that control how background images repeat.
 * Supports single-value syntax (repeat, repeat-x, repeat-y, no-repeat, space, round).
 *
 * @param css - CSS string containing background-repeat value
 * @returns Result containing RepeatKeyword, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Background.Repeat.parse("repeat-x");
 * if (result.ok) {
 *   console.log(result.value); // "repeat-x"
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat | MDN: background-repeat}
 */
export function parse(css: string): Result<Keyword.RepeatKeyword, string> {
	const trimmed = css.trim();
	const result = Keyword.repeatKeywordsSchema.safeParse(trimmed);

	if (!result.success) {
		return err(`Invalid background-repeat value: "${css}"`);
	}

	return ok(result.data);
}
