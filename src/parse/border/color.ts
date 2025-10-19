// b_path:: src/parse/border/color.ts
import * as csstree from "css-tree";
import { ALL_NAMED_COLOR_KEYWORDS } from "@/core/keywords/color-value-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS border-color property value.
 *
 * Accepts color keywords (currentcolor, transparent, named colors).
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * Note: This parser currently handles color keywords only.
 * For full color support (rgb, hsl, hex, etc.), use the color parsers.
 *
 * @param css - CSS border-color value (e.g., "red", "transparent", "currentcolor")
 * @returns Result with BorderColor IR or error message
 *
 * @example
 * Named color:
 * ```typescript
 * const result = parse("red");
 * // { ok: true, value: { kind: "border-color", color: "red" } }
 * ```
 *
 * @example
 * Transparent:
 * ```typescript
 * const result = parse("transparent");
 * // { ok: true, value: { kind: "border-color", color: "transparent" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-color | MDN: border-color}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-color | W3C Spec}
 */
export function parse(css: string): Result<Type.BorderColorValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single border-color value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty border-color value");
		}

		if (node.type !== "Identifier") {
			return err(`Expected color keyword for border-color, got: ${node.type}`);
		}

		const keyword = node.name.toLowerCase();
		if (!ALL_NAMED_COLOR_KEYWORDS.includes(keyword as (typeof ALL_NAMED_COLOR_KEYWORDS)[number])) {
			return err(`Invalid color keyword: ${keyword}`);
		}

		return ok({
			kind: "border-color",
			color: keyword as (typeof ALL_NAMED_COLOR_KEYWORDS)[number],
		});
	} catch (e) {
		return err(`Failed to parse border-color: ${e instanceof Error ? e.message : String(e)}`);
	}
}
