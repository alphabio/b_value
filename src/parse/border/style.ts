// b_path:: src/parse/border/style.ts
import * as csstree from "css-tree";
import { BORDER_STYLE_KEYWORDS } from "@/core/keywords/border-style-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS border-style property value.
 *
 * Accepts predefined style keywords.
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param css - CSS border-style value (e.g., "solid", "dashed", "dotted")
 * @returns Result with BorderStyle IR or error message
 *
 * @example
 * Solid border:
 * ```typescript
 * const result = parse("solid");
 * // { ok: true, value: { kind: "border-style", style: "solid" } }
 * ```
 *
 * @example
 * Dashed border:
 * ```typescript
 * const result = parse("dashed");
 * // { ok: true, value: { kind: "border-style", style: "dashed" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-style | MDN: border-style}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-style | W3C Spec}
 */
export function parse(css: string): Result<Type.BorderStyleValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single border-style value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty border-style value");
		}

		if (node.type !== "Identifier") {
			return err(`Expected keyword for border-style, got: ${node.type}`);
		}

		const keyword = node.name.toLowerCase();
		if (!BORDER_STYLE_KEYWORDS.includes(keyword as Type.BorderStyle)) {
			return err(`Invalid border-style keyword: ${keyword}`);
		}

		return ok({
			kind: "border-style",
			style: keyword as Type.BorderStyle,
		});
	} catch (e) {
		return err(`Failed to parse border-style: ${e instanceof Error ? e.message : String(e)}`);
	}
}
