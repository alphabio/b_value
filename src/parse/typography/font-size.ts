// b_path:: src/parse/typography/font-size.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS font-size property value.
 *
 * Accepts length, percentage, or keyword values.
 * Per CSS Fonts Module Level 4 specification.
 *
 * @param css - CSS font-size value (e.g., "16px", "1.2em", "larger", "small")
 * @returns Result with FontSize IR or error message
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("16px");
 * // { ok: true, value: { kind: "font-size", value: { value: 16, unit: "px" } } }
 * ```
 *
 * @example
 * Keyword value:
 * ```typescript
 * const result = parse("medium");
 * // { ok: true, value: { kind: "font-size", value: "medium" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size | MDN: font-size}
 * @see {@link https://www.w3.org/TR/css-fonts-4/#font-size-prop | W3C Spec}
 */
export function parse(css: string): Result<Type.FontSize, string> {
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
			return err("Expected font-size value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			// Absolute size keywords
			const absoluteSizes = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"];
			// Relative size keywords
			const relativeSizes = ["larger", "smaller"];

			if (absoluteSizes.includes(keyword) || relativeSizes.includes(keyword)) {
				return ok({
					kind: "font-size",
					value: keyword as Type.FontSize["value"],
				});
			}

			return err(`Invalid font-size keyword: ${keyword}`);
		}

		// Handle unitless 0
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "font-size",
					value: { value: 0, unit: "px" },
				});
			}
			return err("Length values require a unit (except for 0)");
		}

		const lengthResult = ParseUtils.parseLengthPercentageNode(node);
		if (!lengthResult.ok) {
			return err(lengthResult.error);
		}

		return ok({
			kind: "font-size",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse font-size: ${error instanceof Error ? error.message : String(error)}`);
	}
}
