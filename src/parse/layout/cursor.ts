// b_path:: src/parse/layout/cursor.ts
import * as csstree from "css-tree";
import { CURSOR_KEYWORDS } from "@/core/keywords/cursor-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS cursor property value.
 *
 * Accepts cursor keyword values.
 * Per CSS Basic User Interface Module Level 4 specification.
 *
 * @param css - CSS cursor value (e.g., "pointer", "default", "text", "move")
 * @returns Result with Cursor IR or error message
 *
 * @example
 * Pointer cursor:
 * ```typescript
 * const result = parse("pointer");
 * // { ok: true, value: { kind: "cursor", value: "pointer" } }
 * ```
 *
 * @example
 * Text cursor:
 * ```typescript
 * const result = parse("text");
 * // { ok: true, value: { kind: "cursor", value: "text" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor | MDN: cursor}
 * @see {@link https://www.w3.org/TR/css-ui-4/#cursor | W3C Spec}
 */
export function parse(css: string): Result<Type.Cursor, string> {
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

		if (!CURSOR_KEYWORDS.includes(keyword as Type.Cursor["value"])) {
			return err(`Invalid cursor keyword: ${keyword}`);
		}

		return ok({
			kind: "cursor",
			value: keyword as Type.Cursor["value"],
		});
	} catch (error) {
		return err(`Failed to parse cursor: ${error instanceof Error ? error.message : String(error)}`);
	}
}
