// b_path:: src/parse/layout/min-height.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS min-height property value.
 *
 * Accepts length-percentage values, auto keyword, or intrinsic sizing keywords.
 * Per CSS Sizing Module Level 3 specification.
 *
 * @param css - CSS min-height value (e.g., "100px", "50%", "auto", "min-content")
 * @returns Result with MinHeight IR or error message
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/min-height | MDN: min-height}
 * @see {@link https://www.w3.org/TR/css-sizing-3/#min-size-properties | W3C Spec}
 */
export function parse(css: string): Result<Type.MinHeight, string> {
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
			return err("Expected min-height value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			if (keyword === "auto") {
				return ok({
					kind: "min-height",
					value: "auto",
				});
			}

			if (keyword === "min-content" || keyword === "max-content" || keyword === "fit-content") {
				return ok({
					kind: "min-height",
					value: keyword,
				});
			}

			return err(`Invalid min-height keyword: ${keyword}`);
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "min-height",
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
			kind: "min-height",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse min-height: ${error instanceof Error ? error.message : String(error)}`);
	}
}
