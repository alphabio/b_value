// b_path:: src/parse/layout/box-sizing.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS box-sizing property value.
 *
 * Accepts content-box or border-box keywords.
 * Per CSS Box Sizing Module Level 3 specification.
 *
 * @param css - CSS box-sizing value (e.g., "content-box", "border-box")
 * @returns Result with BoxSizing IR or error message
 *
 * @example
 * ```typescript
 * const result = parse("border-box");
 * // { ok: true, value: { kind: "box-sizing", value: "border-box" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing | MDN: box-sizing}
 * @see {@link https://www.w3.org/TR/css-sizing-3/#box-sizing | W3C Spec}
 */
export function parse(css: string): Result<Type.BoxSizing, string> {
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
			return err("Expected box-sizing value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			if (keyword === "content-box" || keyword === "border-box") {
				return ok({
					kind: "box-sizing",
					value: keyword,
				});
			}

			return err(`Invalid box-sizing keyword: ${keyword}`);
		}

		return err("Expected keyword for box-sizing");
	} catch (error) {
		return err(`Failed to parse box-sizing: ${error instanceof Error ? error.message : String(error)}`);
	}
}
