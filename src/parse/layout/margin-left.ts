// b_path:: src/parse/layout/margin-left.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS margin-left property value.
 *
 * Accepts length-percentage values or auto keyword.
 *
 * @param css - CSS margin-left value (e.g., "10px", "5%", "auto")
 * @returns Result with MarginLeft IR or error message
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left | MDN: margin-left}
 */
export function parse(css: string): Result<Type.MarginLeft, string> {
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
			return err("Expected margin-left value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			if (keyword === "auto") {
				return ok({
					kind: "margin-left",
					value: "auto",
				});
			}

			return err(`Invalid margin-left keyword: ${keyword}`);
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "margin-left",
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
			kind: "margin-left",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse margin-left: ${error instanceof Error ? error.message : String(error)}`);
	}
}
