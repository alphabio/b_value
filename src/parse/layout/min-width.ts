// b_path:: src/parse/layout/min-width.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS min-width property value.
 *
 * Accepts length-percentage values, auto keyword, or intrinsic sizing keywords.
 * Per CSS Sizing Module Level 3 specification.
 *
 * @param css - CSS min-width value (e.g., "200px", "50%", "auto", "min-content")
 * @returns Result with MinWidth IR or error message
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/min-width | MDN: min-width}
 * @see {@link https://www.w3.org/TR/css-sizing-3/#min-size-properties | W3C Spec}
 */
export function parse(css: string): Result<Type.MinWidth, string> {
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
			return err("Expected min-width value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			if (keyword === "auto") {
				return ok({
					kind: "min-width",
					value: "auto",
				});
			}

			if (keyword === "min-content" || keyword === "max-content" || keyword === "fit-content") {
				return ok({
					kind: "min-width",
					value: keyword,
				});
			}

			return err(`Invalid min-width keyword: ${keyword}`);
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "min-width",
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
			kind: "min-width",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse min-width: ${error instanceof Error ? error.message : String(error)}`);
	}
}
