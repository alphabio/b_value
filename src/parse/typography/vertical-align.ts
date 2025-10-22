// b_path:: src/parse/typography/vertical-align.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseLengthPercentageNode } from "@/utils/parse/nodes/length";

/**
 * Parse CSS vertical-align property value.
 *
 * Accepts keyword values, length, or percentage.
 * Per CSS Inline Layout Module Level 3 specification.
 *
 * @param css - CSS vertical-align value (e.g., "baseline", "middle", "5px", "50%")
 * @returns Result with VerticalAlign IR or error message
 *
 * @example
 * Keyword value:
 * ```typescript
 * const result = parse("middle");
 * // { ok: true, value: { kind: "vertical-align", value: "middle" } }
 * ```
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("5px");
 * // { ok: true, value: { kind: "vertical-align", value: { value: 5, unit: "px" } } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align | MDN: vertical-align}
 * @see {@link https://www.w3.org/TR/css-inline-3/#propdef-vertical-align | W3C Spec}
 */
export function parse(css: string): Result<Type.VerticalAlign, string> {
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
			return err("Expected vertical-align value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "vertical-align",
					value: keyword as Type.VerticalAlign["value"],
				});
			}

			return err(`Invalid vertical-align keyword: ${keyword}`);
		}

		const lengthResult = parseLengthPercentageNode(node);
		if (lengthResult.ok) {
			return ok({
				kind: "vertical-align",
				value: lengthResult.value,
			});
		}

		return err("Expected keyword, length, or percentage for vertical-align");
	} catch (error) {
		return err(`Failed to parse vertical-align: ${error instanceof Error ? error.message : String(error)}`);
	}
}
