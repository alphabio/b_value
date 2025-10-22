// b_path:: src/parse/typography/text-transform.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS text-transform property value.
 *
 * Accepts keyword values.
 * Per CSS Text Module Level 3 specification.
 *
 * @param css - CSS text-transform value (e.g., "none", "uppercase", "capitalize")
 * @returns Result with TextTransform IR or error message
 *
 * @example
 * Uppercase:
 * ```typescript
 * const result = parse("uppercase");
 * // { ok: true, value: { kind: "text-transform", value: "uppercase" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform | MDN: text-transform}
 * @see {@link https://www.w3.org/TR/css-text-3/#text-transform-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TextTransform, string> {
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
			return err("Expected text-transform value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["none", "capitalize", "uppercase", "lowercase", "full-width", "full-size-kana"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "text-transform",
					value: keyword as Type.TextTransform["value"],
				});
			}

			return err(`Invalid text-transform keyword: ${keyword}`);
		}

		return err("Expected keyword for text-transform");
	} catch (error) {
		return err(`Failed to parse text-transform: ${error instanceof Error ? error.message : String(error)}`);
	}
}
