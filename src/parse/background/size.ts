// b_path:: src/parse/background/size.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Background size value (keyword or length-percentage).
 *
 * @public
 */
export type BackgroundSizeValue = Keyword.SizingKeyword | Type.LengthPercentage | "auto";

/**
 * Parse background-size value (single dimension).
 *
 * Parses CSS background-size values that control the size of background images.
 * Supports keywords (cover, contain), auto, and length/percentage values.
 *
 * @param css - CSS string containing background-size value
 * @returns Result containing BackgroundSizeValue, or error message
 *
 * @public
 *
 * @example
 * Keywords:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Background.Size.parse("cover");
 * if (result.ok) {
 *   console.log(result.value); // "cover"
 * }
 * ```
 *
 * @example
 * Length values:
 * ```typescript
 * const result = Parse.Background.Size.parse("100px");
 * if (result.ok) {
 *   console.log(result.value); // { value: 100, unit: "px" }
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-size | MDN: background-size}
 */
export function parse(css: string): Result<BackgroundSizeValue, string> {
	const trimmed = css.trim();

	// Try sizing keywords (cover, contain)
	const keywordResult = Keyword.sizingKeywordsSchema.safeParse(trimmed);
	if (keywordResult.success) {
		return ok(keywordResult.data);
	}

	// Try 'auto' keyword
	if (trimmed === "auto") {
		return ok("auto");
	}

	// Try length-percentage
	const csstree = require("css-tree");
	try {
		const ast = csstree.parse(trimmed, { context: "value" });
		const children = ast.children.toArray();
		if (children.length === 1) {
			const lengthResult = ParseUtils.parseLengthPercentageNode(children[0]);
			if (lengthResult.ok) {
				return lengthResult;
			}
		}
	} catch {
		// Continue to error
	}

	return err(`Invalid background-size value: "${css}"`);
}
