// b_path:: src/parse/visual/visibility.ts
import * as csstree from "css-tree";
import { VISIBILITY_KEYWORDS } from "@/core/keywords/visibility-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS visibility property value.
 *
 * Accepts visibility keywords: visible, hidden, collapse.
 * Per CSS Display Module Level 3 specification.
 *
 * @param css - CSS visibility value (e.g., "visible", "hidden", "collapse")
 * @returns Result with Visibility IR or error message
 *
 * @example
 * Visible element:
 * ```typescript
 * const result = parse("visible");
 * // { ok: true, value: { kind: "visibility", value: "visible" } }
 * ```
 *
 * @example
 * Hidden element:
 * ```typescript
 * const result = parse("hidden");
 * // { ok: true, value: { kind: "visibility", value: "hidden" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility | MDN: visibility}
 * @see {@link https://www.w3.org/TR/css-display-3/#visibility | W3C Spec}
 */
export function parse(css: string): Result<Type.Visibility, string> {
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

		if (!VISIBILITY_KEYWORDS.includes(keyword as Type.Visibility["value"])) {
			return err(`Invalid visibility keyword: ${keyword}`);
		}

		return ok({
			kind: "visibility",
			value: keyword as Type.Visibility["value"],
		});
	} catch (error) {
		return err(`Failed to parse visibility: ${error instanceof Error ? error.message : String(error)}`);
	}
}
