// b_path:: src/parse/flexbox/flex-direction.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS flex-direction property value.
 *
 * @param css - CSS flex-direction value
 * @returns Result with FlexDirection IR or error message
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction}
 */
export function parse(css: string): Result<Type.FlexDirection, string> {
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
		if (!node || node.type !== "Identifier") {
			return err("Expected identifier");
		}

		const value = node.name.toLowerCase();

		if (value === "row" || value === "row-reverse" || value === "column" || value === "column-reverse") {
			return ok({
				kind: "flex-direction",
				value,
			});
		}

		return err(`Invalid flex-direction value: ${value}`);
	} catch (error) {
		return err(`Failed to parse flex-direction: ${error instanceof Error ? error.message : String(error)}`);
	}
}
