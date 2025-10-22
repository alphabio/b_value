// b_path:: src/parse/typography/letter-spacing.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseLengthPercentageNode } from "@/utils/parse/nodes/length";

/**
 * Parse CSS letter-spacing property value.
 *
 * Accepts length values or the normal keyword.
 * Per CSS Text Module Level 3 specification.
 *
 * @param css - CSS letter-spacing value (e.g., "normal", "0.1em", "2px")
 * @returns Result with LetterSpacing IR or error message
 *
 * @example
 * Normal letter spacing:
 * ```typescript
 * const result = parse("normal");
 * // { ok: true, value: { kind: "letter-spacing", value: "normal" } }
 * ```
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("0.1em");
 * // { ok: true, value: { kind: "letter-spacing", value: { value: 0.1, unit: "em" } } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing | MDN: letter-spacing}
 * @see {@link https://www.w3.org/TR/css-text-3/#letter-spacing-property | W3C Spec}
 */
export function parse(css: string): Result<Type.LetterSpacing, string> {
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
			return err("Expected letter-spacing value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			if (keyword === "normal") {
				return ok({
					kind: "letter-spacing",
					value: "normal",
				});
			}

			return err(`Invalid letter-spacing keyword: ${keyword}`);
		}

		const lengthResult = parseLengthPercentageNode(node);
		if (lengthResult.ok) {
			return ok({
				kind: "letter-spacing",
				value: lengthResult.value,
			});
		}

		return err("Expected length or 'normal' for letter-spacing");
	} catch (error) {
		return err(`Failed to parse letter-spacing: ${error instanceof Error ? error.message : String(error)}`);
	}
}
