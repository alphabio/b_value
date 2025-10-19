// b_path:: src/parse/outline/color.ts
import * as csstree from "css-tree";
import { ALL_NAMED_COLOR_KEYWORDS } from "@/core/keywords/color-value-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS outline-color property value.
 *
 * Accepts color keywords (currentcolor, transparent, named colors, invert).
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * Note: This parser currently handles color keywords only.
 * For full color support (rgb, hsl, hex, etc.), use the color parsers.
 *
 * @param css - CSS outline-color value (e.g., "red", "transparent", "invert")
 * @returns Result with OutlineColor IR or error message
 *
 * @example
 * Named color:
 * ```typescript
 * const result = parse("red");
 * // { ok: true, value: { kind: "outline-color", color: "red" } }
 * ```
 *
 * @example
 * Invert (outline-specific):
 * ```typescript
 * const result = parse("invert");
 * // { ok: true, value: { kind: "outline-color", color: "invert" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color | MDN: outline-color}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-color | W3C Spec}
 */
export function parse(css: string): Result<Type.OutlineColorValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single outline-color value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty outline-color value");
		}

		if (node.type !== "Identifier") {
			return err(`Expected color keyword for outline-color, got: ${node.type}`);
		}

		const keyword = node.name.toLowerCase();

		// Check for 'invert' which is outline-specific
		if (keyword === "invert") {
			return ok({
				kind: "outline-color",
				color: "invert",
			});
		}

		// Check standard color keywords
		if (!ALL_NAMED_COLOR_KEYWORDS.includes(keyword as (typeof ALL_NAMED_COLOR_KEYWORDS)[number])) {
			return err(`Invalid color keyword: ${keyword}`);
		}

		return ok({
			kind: "outline-color",
			color: keyword as (typeof ALL_NAMED_COLOR_KEYWORDS)[number] | "invert",
		});
	} catch (e) {
		return err(`Failed to parse outline-color: ${e instanceof Error ? e.message : String(e)}`);
	}
}
