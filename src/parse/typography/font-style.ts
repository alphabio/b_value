// b_path:: src/parse/typography/font-style.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS font-style property value.
 *
 * Accepts keyword values: normal, italic, oblique.
 * Per CSS Fonts Module Level 4 specification.
 *
 * @param css - CSS font-style value (e.g., "normal", "italic", "oblique")
 * @returns Result with FontStyle IR or error message
 *
 * @example
 * Normal font style:
 * ```typescript
 * const result = parse("normal");
 * // { ok: true, value: { kind: "font-style", value: "normal" } }
 * ```
 *
 * @example
 * Italic font style:
 * ```typescript
 * const result = parse("italic");
 * // { ok: true, value: { kind: "font-style", value: "italic" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-style | MDN: font-style}
 * @see {@link https://www.w3.org/TR/css-fonts-4/#font-style-prop | W3C Spec}
 */
export function parse(css: string): Result<Type.FontStyle, string> {
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
			return err("Expected font-style value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["normal", "italic", "oblique"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "font-style",
					value: keyword as Type.FontStyle["value"],
				});
			}

			return err(`Invalid font-style keyword: ${keyword}`);
		}

		return err("Expected keyword for font-style");
	} catch (error) {
		return err(`Failed to parse font-style: ${error instanceof Error ? error.message : String(error)}`);
	}
}
