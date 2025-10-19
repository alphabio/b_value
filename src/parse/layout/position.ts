// b_path:: src/parse/layout/position.ts
import * as csstree from "css-tree";
import { POSITION_PROPERTY_KEYWORDS } from "@/core/keywords/position-property-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS position property value.
 *
 * Accepts position keyword values that control positioning scheme.
 * Per CSS Positioned Layout Module Level 3 specification.
 *
 * @param css - CSS position value (e.g., "static", "relative", "absolute", "fixed", "sticky")
 * @returns Result with PositionProperty IR or error message
 *
 * @example
 * Absolute positioning:
 * ```typescript
 * const result = parse("absolute");
 * // { ok: true, value: { kind: "position-property", value: "absolute" } }
 * ```
 *
 * @example
 * Sticky positioning:
 * ```typescript
 * const result = parse("sticky");
 * // { ok: true, value: { kind: "position-property", value: "sticky" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position | MDN: position}
 * @see {@link https://www.w3.org/TR/css-position-3/#position-property | W3C Spec}
 */
export function parse(css: string): Result<Type.PositionProperty, string> {
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

		if (!POSITION_PROPERTY_KEYWORDS.includes(keyword as Type.PositionProperty["value"])) {
			return err(`Invalid position keyword: ${keyword}`);
		}

		return ok({
			kind: "position-property",
			value: keyword as Type.PositionProperty["value"],
		});
	} catch (error) {
		return err(`Failed to parse position: ${error instanceof Error ? error.message : String(error)}`);
	}
}
