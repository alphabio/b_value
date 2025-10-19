// b_path:: src/parse/outline/offset.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { ABSOLUTE_LENGTH_UNITS, FONT_LENGTH_UNITS, VIEWPORT_LENGTH_UNITS } from "@/core/units";

/**
 * Parse CSS outline-offset property value.
 *
 * Accepts length values (can be negative unlike border/outline-width).
 * Per CSS Basic User Interface Module Level 3 specification.
 *
 * @param css - CSS outline-offset value (e.g., "5px", "-2px", "0.5em")
 * @returns Result with OutlineOffset IR or error message
 *
 * @example
 * Positive offset:
 * ```typescript
 * const result = parse("5px");
 * // { ok: true, value: { kind: "outline-offset", offset: { value: 5, unit: "px" } } }
 * ```
 *
 * @example
 * Negative offset:
 * ```typescript
 * const result = parse("-2px");
 * // { ok: true, value: { kind: "outline-offset", offset: { value: -2, unit: "px" } } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset | MDN: outline-offset}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-offset | W3C Spec}
 */
export function parse(css: string): Result<Type.OutlineOffsetValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single outline-offset value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty outline-offset value");
		}

		// Handle zero without unit
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value !== 0) {
				return err("Unitless values must be zero");
			}
			return ok({
				kind: "outline-offset",
				offset: {
					value: 0,
					unit: "px",
				},
			});
		}

		// Handle length (including negative values)
		if (node.type === "Dimension") {
			const value = Number.parseFloat(node.value);
			const unit = node.unit.toLowerCase();

			const allLengthUnits = [...ABSOLUTE_LENGTH_UNITS, ...FONT_LENGTH_UNITS, ...VIEWPORT_LENGTH_UNITS];
			if (!allLengthUnits.includes(unit as (typeof allLengthUnits)[number])) {
				return err(`Invalid length unit for outline-offset: ${unit}`);
			}

			return ok({
				kind: "outline-offset",
				offset: {
					value,
					unit: unit as (typeof allLengthUnits)[number],
				},
			});
		}

		return err(`Unexpected node type: ${node.type}`);
	} catch (e) {
		return err(`Failed to parse outline-offset: ${e instanceof Error ? e.message : String(e)}`);
	}
}
