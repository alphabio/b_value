// b_path:: src/parse/text/thickness.ts

import * as Keyword from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Text decoration thickness value (keyword or length-percentage).
 *
 * @public
 */
export type TextDecorationThicknessValue = Keyword.TextDecorationThicknessKeyword | Type.LengthPercentage;

/**
 * Parse text-decoration-thickness value.
 *
 * Parses CSS text-decoration-thickness values that set the thickness of decoration lines.
 * Supports keywords (auto, from-font) and length/percentage values.
 *
 * @param css - CSS string containing text-decoration-thickness value
 * @returns Result containing TextDecorationThicknessValue, or error message
 *
 * @public
 *
 * @example
 * Keywords:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Text.Thickness.parse("auto");
 * if (result.ok) {
 *   console.log(result.value); // "auto"
 * }
 * ```
 *
 * @example
 * Length values:
 * ```typescript
 * const result = Parse.Text.Thickness.parse("2px");
 * if (result.ok) {
 *   console.log(result.value); // { value: 2, unit: "px" }
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness | MDN: text-decoration-thickness}
 */
export function parse(css: string): Result<TextDecorationThicknessValue, string> {
	const trimmed = css.trim();

	// Try keywords (auto, from-font)
	const keywordResult = Keyword.textDecorationThicknessKeywordsSchema.safeParse(trimmed);
	if (keywordResult.success) {
		return ok(keywordResult.data);
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

	return err(`Invalid text-decoration-thickness value: "${css}"`);
}
