// b_path:: src/parse/layout/overflow-x.ts
import * as csstree from "css-tree";
import { OVERFLOW_KEYWORDS } from "@/core/keywords/overflow-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS overflow-x property value.
 *
 * Accepts overflow keyword values for horizontal overflow behavior.
 * Per CSS Overflow Module Level 3 specification.
 *
 * @param css - CSS overflow-x value (e.g., "visible", "hidden", "scroll", "auto", "clip")
 * @returns Result with OverflowX IR or error message
 *
 * @example
 * Hidden overflow:
 * ```typescript
 * const result = parse("hidden");
 * // { ok: true, value: { kind: "overflow-x", value: "hidden" } }
 * ```
 *
 * @example
 * Scroll overflow:
 * ```typescript
 * const result = parse("scroll");
 * // { ok: true, value: { kind: "overflow-x", value: "scroll" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x | MDN: overflow-x}
 * @see {@link https://www.w3.org/TR/css-overflow-3/#overflow-properties | W3C Spec}
 */
export function parse(css: string): Result<Type.OverflowX, string> {
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
			return err(`Expected keyword identifier, got: ${node?.type || "nothing"}`);
		}

		const keyword = node.name.toLowerCase();

		if (!OVERFLOW_KEYWORDS.includes(keyword as Type.OverflowX["value"])) {
			return err(`Invalid overflow-x keyword: ${keyword}`);
		}

		return ok({
			kind: "overflow-x",
			value: keyword as Type.OverflowX["value"],
		});
	} catch (error) {
		return err(`Failed to parse overflow-x: ${error instanceof Error ? error.message : String(error)}`);
	}
}
