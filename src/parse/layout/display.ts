// b_path:: src/parse/layout/display.ts
import * as csstree from "css-tree";
import { DISPLAY_KEYWORDS } from "@/core/keywords/display-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS display property value.
 *
 * Accepts display keywords including box, inside, internal, legacy, and outside values.
 * Per CSS Display Module Level 3 specification.
 *
 * @param css - CSS display value (e.g., "flex", "block", "inline-block", "none")
 * @returns Result with Display IR or error message
 *
 * @example
 * Flex layout:
 * ```typescript
 * const result = parse("flex");
 * // { ok: true, value: { kind: "display", value: "flex" } }
 * ```
 *
 * @example
 * Hidden element:
 * ```typescript
 * const result = parse("none");
 * // { ok: true, value: { kind: "display", value: "none" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display | MDN: display}
 * @see {@link https://www.w3.org/TR/css-display-3/ | W3C Spec}
 */
export function parse(css: string): Result<Type.Display, string> {
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

		if (!DISPLAY_KEYWORDS.includes(keyword as Type.Display["value"])) {
			return err(`Invalid display keyword: ${keyword}`);
		}

		return ok({
			kind: "display",
			value: keyword as Type.Display["value"],
		});
	} catch (error) {
		return err(`Failed to parse display: ${error instanceof Error ? error.message : String(error)}`);
	}
}
