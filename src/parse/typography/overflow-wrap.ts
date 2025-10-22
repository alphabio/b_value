// b_path:: src/parse/typography/overflow-wrap.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS overflow-wrap property value.
 *
 * Accepts keyword values.
 * Per CSS Text Module Level 3 specification.
 *
 * @param css - CSS overflow-wrap value (e.g., "normal", "break-word", "anywhere")
 * @returns Result with OverflowWrap IR or error message
 *
 * @example
 * Break word:
 * ```typescript
 * const result = parse("break-word");
 * // { ok: true, value: { kind: "overflow-wrap", value: "break-word" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap | MDN: overflow-wrap}
 * @see {@link https://www.w3.org/TR/css-text-3/#overflow-wrap-property | W3C Spec}
 */
export function parse(css: string): Result<Type.OverflowWrap, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		if (children.length !== 1) {
			return err(`Expected single value, got ${children.length} values`);
		}

		const node = children[0];
		if (!node) {
			return err("Expected overflow-wrap value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["normal", "break-word", "anywhere"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "overflow-wrap",
					value: keyword as Type.OverflowWrap["value"],
				});
			}

			return err(`Invalid overflow-wrap keyword: ${keyword}`);
		}

		return err("Expected keyword for overflow-wrap");
	} catch (error) {
		return err(`Failed to parse overflow-wrap: ${error instanceof Error ? error.message : String(error)}`);
	}
}
