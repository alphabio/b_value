// b_path:: src/parse/typography/word-break.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS word-break property value.
 *
 * Accepts keyword values.
 * Per CSS Text Module Level 3 specification.
 *
 * @param css - CSS word-break value (e.g., "normal", "break-all", "keep-all")
 * @returns Result with WordBreak IR or error message
 *
 * @example
 * Break all:
 * ```typescript
 * const result = parse("break-all");
 * // { ok: true, value: { kind: "word-break", value: "break-all" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/word-break | MDN: word-break}
 * @see {@link https://www.w3.org/TR/css-text-3/#word-break-property | W3C Spec}
 */
export function parse(css: string): Result<Type.WordBreak, string> {
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
			return err("Expected word-break value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["normal", "break-all", "keep-all", "break-word"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "word-break",
					value: keyword as Type.WordBreak["value"],
				});
			}

			return err(`Invalid word-break keyword: ${keyword}`);
		}

		return err("Expected keyword for word-break");
	} catch (error) {
		return err(`Failed to parse word-break: ${error instanceof Error ? error.message : String(error)}`);
	}
}
