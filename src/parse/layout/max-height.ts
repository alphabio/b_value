// b_path:: src/parse/layout/max-height.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS max-height property value.
 *
 * Accepts length-percentage values, none keyword, or intrinsic sizing keywords.
 * Per CSS Sizing Module Level 3 specification.
 *
 * @param css - CSS max-height value (e.g., "100px", "50%", "none", "max-content")
 * @returns Result with MaxHeight IR or error message
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/max-height | MDN: max-height}
 * @see {@link https://www.w3.org/TR/css-sizing-3/#max-size-properties | W3C Spec}
 */
export function parse(css: string): Result<Type.MaxHeight, string> {
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
			return err("Expected max-height value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			if (keyword === "none") {
				return ok({
					kind: "max-height",
					value: "none",
				});
			}

			if (keyword === "min-content" || keyword === "max-content" || keyword === "fit-content") {
				return ok({
					kind: "max-height",
					value: keyword,
				});
			}

			return err(`Invalid max-height keyword: ${keyword}`);
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "max-height",
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
			kind: "max-height",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse max-height: ${error instanceof Error ? error.message : String(error)}`);
	}
}
