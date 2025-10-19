// b_path:: src/parse/border/width.ts
import * as csstree from "css-tree";
import { BORDER_WIDTH_KEYWORDS } from "@/core/keywords/border-width-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { ABSOLUTE_LENGTH_UNITS, FONT_LENGTH_UNITS, VIEWPORT_LENGTH_UNITS } from "@/core/units";

/**
 * Parse CSS border-width property value.
 *
 * Accepts length values or predefined keywords (thin, medium, thick).
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param css - CSS border-width value (e.g., "1px", "medium", "0.5em")
 * @returns Result with BorderWidth IR or error message
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("1px");
 * // { ok: true, value: { kind: "border-width", width: { value: 1, unit: "px" } } }
 * ```
 *
 * @example
 * Keyword value:
 * ```typescript
 * const result = parse("medium");
 * // { ok: true, value: { kind: "border-width", width: "medium" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-width | MDN: border-width}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-width | W3C Spec}
 */
export function parse(css: string): Result<Type.BorderWidthValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single border-width value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty border-width value");
		}

		// Handle keywords
		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();
			const keywordValue = keyword as "thin" | "medium" | "thick";
			if (BORDER_WIDTH_KEYWORDS.includes(keywordValue)) {
				return ok({
					kind: "border-width",
					width: keywordValue,
				});
			}
			return err(`Invalid border-width keyword: ${keyword}`);
		}

		// Handle length
		if (node.type === "Dimension") {
			const value = Number.parseFloat(node.value);
			const unit = node.unit.toLowerCase();

			const allLengthUnits = [...ABSOLUTE_LENGTH_UNITS, ...FONT_LENGTH_UNITS, ...VIEWPORT_LENGTH_UNITS];
			if (!allLengthUnits.includes(unit as (typeof allLengthUnits)[number])) {
				return err(`Invalid length unit for border-width: ${unit}`);
			}

			if (value < 0) {
				return err(`border-width must be non-negative, got: ${value}`);
			}

			return ok({
				kind: "border-width",
				width: {
					value,
					unit: unit as (typeof allLengthUnits)[number],
				},
			});
		}

		// Handle zero without unit
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value !== 0) {
				return err("Unitless values must be zero");
			}
			return ok({
				kind: "border-width",
				width: {
					value: 0,
					unit: "px",
				},
			});
		}

		return err(`Unexpected node type: ${node.type}`);
	} catch (e) {
		return err(`Failed to parse border-width: ${e instanceof Error ? e.message : String(e)}`);
	}
}
