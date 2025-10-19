// b_path:: src/parse/outline/style.ts
import * as csstree from "css-tree";
import { OUTLINE_STYLE_KEYWORDS } from "@/core/keywords/outline-style-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS outline-style property value.
 *
 * Accepts predefined style keywords including 'auto' (outline-specific).
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param css - CSS outline-style value (e.g., "solid", "dashed", "auto")
 * @returns Result with OutlineStyle IR or error message
 *
 * @example
 * Solid outline:
 * ```typescript
 * const result = parse("solid");
 * // { ok: true, value: { kind: "outline-style", style: "solid" } }
 * ```
 *
 * @example
 * Auto outline (browser-determined):
 * ```typescript
 * const result = parse("auto");
 * // { ok: true, value: { kind: "outline-style", style: "auto" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style | MDN: outline-style}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-style | W3C Spec}
 */
export function parse(css: string): Result<Type.OutlineStyleValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single outline-style value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty outline-style value");
		}

		if (node.type !== "Identifier") {
			return err(`Expected keyword for outline-style, got: ${node.type}`);
		}

		const keyword = node.name.toLowerCase();
		if (!OUTLINE_STYLE_KEYWORDS.includes(keyword as Type.OutlineStyle)) {
			return err(`Invalid outline-style keyword: ${keyword}`);
		}

		return ok({
			kind: "outline-style",
			style: keyword as Type.OutlineStyle,
		});
	} catch (e) {
		return err(`Failed to parse outline-style: ${e instanceof Error ? e.message : String(e)}`);
	}
}
