// b_path:: src/parse/typography/text-align.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS text-align property value.
 *
 * Accepts alignment keywords.
 * Per CSS Text Module Level 3 specification.
 *
 * @param css - CSS text-align value (e.g., "left", "center", "right", "justify")
 * @returns Result with TextAlign IR or error message
 *
 * @example
 * ```typescript
 * const result = parse("center");
 * // { ok: true, value: { kind: "text-align", value: "center" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-align | MDN: text-align}
 * @see {@link https://www.w3.org/TR/css-text-3/#text-align-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TextAlign, string> {
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
			return err("Expected text-align value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["left", "right", "center", "justify", "start", "end"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "text-align",
					value: keyword as Type.TextAlign["value"],
				});
			}

			return err(`Invalid text-align keyword: ${keyword}`);
		}

		return err("Expected keyword for text-align");
	} catch (error) {
		return err(`Failed to parse text-align: ${error instanceof Error ? error.message : String(error)}`);
	}
}
