// b_path:: src/parse/layout/overflow-y.ts
import * as csstree from "css-tree";
import { OVERFLOW_KEYWORDS } from "@/core/keywords/overflow-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS overflow-y property value.
 *
 * Accepts overflow keyword values for vertical overflow behavior.
 * Per CSS Overflow Module Level 3 specification.
 *
 * @param css - CSS overflow-y value (e.g., "visible", "hidden", "scroll", "auto", "clip")
 * @returns Result with OverflowY IR or error message
 *
 * @example
 * Hidden overflow:
 * ```typescript
 * const result = parse("hidden");
 * // { ok: true, value: { kind: "overflow-y", value: "hidden" } }
 * ```
 *
 * @example
 * Auto overflow:
 * ```typescript
 * const result = parse("auto");
 * // { ok: true, value: { kind: "overflow-y", value: "auto" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y | MDN: overflow-y}
 * @see {@link https://www.w3.org/TR/css-overflow-3/#overflow-properties | W3C Spec}
 */
export function parse(css: string): Result<Type.OverflowY, string> {
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

		if (!OVERFLOW_KEYWORDS.includes(keyword as Type.OverflowY["value"])) {
			return err(`Invalid overflow-y keyword: ${keyword}`);
		}

		return ok({
			kind: "overflow-y",
			value: keyword as Type.OverflowY["value"],
		});
	} catch (error) {
		return err(`Failed to parse overflow-y: ${error instanceof Error ? error.message : String(error)}`);
	}
}
