// b_path:: src/parse/outline/width.ts
import * as csstree from "css-tree";
import { BORDER_WIDTH_KEYWORDS } from "@/core/keywords/border-width-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { ABSOLUTE_LENGTH_UNITS, FONT_LENGTH_UNITS, VIEWPORT_LENGTH_UNITS } from "@/core/units";

/**
 * Parse CSS outline-width property value.
 *
 * Accepts length values or predefined keywords (thin, medium, thick).
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param css - CSS outline-width value (e.g., "1px", "medium", "0.5em")
 * @returns Result with OutlineWidth IR or error message
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("1px");
 * // { ok: true, value: { kind: "outline-width", width: { value: 1, unit: "px" } } }
 * ```
 *
 * @example
 * Keyword value:
 * ```typescript
 * const result = parse("medium");
 * // { ok: true, value: { kind: "outline-width", width: "medium" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width | MDN: outline-width}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-width | W3C Spec}
 */
export function parse(css: string): Result<Type.OutlineWidthValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single outline-width value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty outline-width value");
		}

		// Handle keywords
		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();
			const keywordValue = keyword as "thin" | "medium" | "thick";
			if (BORDER_WIDTH_KEYWORDS.includes(keywordValue)) {
				return ok({
					kind: "outline-width",
					width: keywordValue,
				});
			}
			return err(`Invalid outline-width keyword: ${keyword}`);
		}

		// Handle length
		if (node.type === "Dimension") {
			const value = Number.parseFloat(node.value);
			const unit = node.unit.toLowerCase();

			const allLengthUnits = [...ABSOLUTE_LENGTH_UNITS, ...FONT_LENGTH_UNITS, ...VIEWPORT_LENGTH_UNITS];
			if (!allLengthUnits.includes(unit as (typeof allLengthUnits)[number])) {
				return err(`Invalid length unit for outline-width: ${unit}`);
			}

			if (value < 0) {
				return err(`outline-width must be non-negative, got: ${value}`);
			}

			return ok({
				kind: "outline-width",
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
				kind: "outline-width",
				width: {
					value: 0,
					unit: "px",
				},
			});
		}

		return err(`Unexpected node type: ${node.type}`);
	} catch (e) {
		return err(`Failed to parse outline-width: ${e instanceof Error ? e.message : String(e)}`);
	}
}
