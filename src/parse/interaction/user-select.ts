// b_path:: src/parse/interaction/user-select.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS user-select property value.
 *
 * Accepts keyword values: auto, text, none, contain, all.
 * Per CSS Basic User Interface Module Level 4 specification.
 *
 * @param css - CSS user-select value (e.g., "none", "auto", "text")
 * @returns Result with UserSelect IR or error message
 *
 * @example
 * Disable text selection:
 * ```typescript
 * const result = parse("none");
 * // { ok: true, value: { kind: "user-select", value: "none" } }
 * ```
 *
 * @example
 * Auto selection:
 * ```typescript
 * const result = parse("auto");
 * // { ok: true, value: { kind: "user-select", value: "auto" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select | MDN: user-select}
 * @see {@link https://www.w3.org/TR/css-ui-4/#propdef-user-select | W3C Spec}
 */
export function parse(css: string): Result<Type.UserSelect, string> {
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
			return err("Expected user-select value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			const validKeywords = ["auto", "text", "none", "contain", "all"];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "user-select",
					value: keyword as Type.UserSelect["value"],
				});
			}

			return err(`Invalid user-select keyword: ${keyword}`);
		}

		return err("Expected keyword for user-select");
	} catch (error) {
		return err(`Failed to parse user-select: ${error instanceof Error ? error.message : String(error)}`);
	}
}
