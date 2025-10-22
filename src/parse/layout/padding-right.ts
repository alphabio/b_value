// b_path:: src/parse/layout/padding-right.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS padding-right property value.
 *
 * Accepts length-percentage values (non-negative).
 *
 * @param css - CSS padding-right value (e.g., "10px", "5%")
 * @returns Result with PaddingRight IR or error message
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right | MDN: padding-right}
 */
export function parse(css: string): Result<Type.PaddingRight, string> {
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
			return err("Expected padding-right value");
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "padding-right",
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
			kind: "padding-right",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse padding-right: ${error instanceof Error ? error.message : String(error)}`);
	}
}
