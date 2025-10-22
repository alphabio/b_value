// b_path:: src/parse/typography/line-height.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS line-height property value.
 *
 * Accepts length, percentage, number, or normal keyword.
 * Per CSS Inline Layout Module Level 3 specification.
 *
 * @param css - CSS line-height value (e.g., "1.5", "20px", "normal")
 * @returns Result with LineHeight IR or error message
 *
 * @example
 * Unitless number:
 * ```typescript
 * const result = parse("1.5");
 * // { ok: true, value: { kind: "line-height", value: 1.5 } }
 * ```
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("20px");
 * // { ok: true, value: { kind: "line-height", value: { value: 20, unit: "px" } } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/line-height | MDN: line-height}
 * @see {@link https://www.w3.org/TR/css-inline-3/#line-height-property | W3C Spec}
 */
export function parse(css: string): Result<Type.LineHeight, string> {
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
			return err("Expected line-height value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			if (keyword === "normal") {
				return ok({
					kind: "line-height",
					value: "normal",
				});
			}

			return err(`Invalid line-height keyword: ${keyword}`);
		}

		// Unitless number
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			return ok({
				kind: "line-height",
				value: value,
			});
		}

		// Length or percentage
		const lengthResult = ParseUtils.parseLengthPercentageNode(node);
		if (!lengthResult.ok) {
			return err(lengthResult.error);
		}

		return ok({
			kind: "line-height",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse line-height: ${error instanceof Error ? error.message : String(error)}`);
	}
}
