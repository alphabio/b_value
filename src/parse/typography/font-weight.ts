// b_path:: src/parse/typography/font-weight.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS font-weight property value.
 *
 * Accepts numeric values (100-900) or keyword values.
 * Per CSS Fonts Module Level 4 specification.
 *
 * @param css - CSS font-weight value (e.g., "400", "bold", "normal")
 * @returns Result with FontWeight IR or error message
 *
 * @example
 * Numeric value:
 * ```typescript
 * const result = parse("400");
 * // { ok: true, value: { kind: "font-weight", value: 400 } }
 * ```
 *
 * @example
 * Keyword value:
 * ```typescript
 * const result = parse("bold");
 * // { ok: true, value: { kind: "font-weight", value: "bold" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight | MDN: font-weight}
 * @see {@link https://www.w3.org/TR/css-fonts-4/#font-weight-prop | W3C Spec}
 */
export function parse(css: string): Result<Type.FontWeight, string> {
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
			return err("Expected font-weight value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["normal", "bold", "bolder", "lighter"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "font-weight",
					value: keyword as Type.FontWeight["value"],
				});
			}

			return err(`Invalid font-weight keyword: ${keyword}`);
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);

			// font-weight accepts 1-1000 in CSS Fonts 4
			if (value >= 1 && value <= 1000) {
				return ok({
					kind: "font-weight",
					value: value,
				});
			}

			return err(`font-weight must be between 1 and 1000, got ${value}`);
		}

		return err("Expected number or keyword for font-weight");
	} catch (error) {
		return err(`Failed to parse font-weight: ${error instanceof Error ? error.message : String(error)}`);
	}
}
