// b_path:: src/parse/border/radius.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS border-radius property value.
 *
 * Accepts length or percentage values.
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param css - CSS border-radius value (e.g., "5px", "50%", "1em")
 * @returns Result with BorderRadius IR or error message
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("5px");
 * // { ok: true, value: { kind: "border-radius", radius: { value: 5, unit: "px" } } }
 * ```
 *
 * @example
 * Percentage value:
 * ```typescript
 * const result = parse("50%");
 * // { ok: true, value: { kind: "border-radius", radius: { value: 50, unit: "%" } } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius | MDN: border-radius}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-radius | W3C Spec}
 */
export function parse(css: string): Result<Type.BorderRadiusValue, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();
		if (children.length !== 1) {
			return err("Expected single border-radius value");
		}

		const node = children[0];
		if (!node) {
			return err("Empty border-radius value");
		}

		// Handle zero without unit
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value !== 0) {
				return err("Unitless values must be zero");
			}
			return ok({
				kind: "border-radius",
				radius: {
					value: 0,
					unit: "px",
				},
			});
		}

		// Use utility to parse length-percentage
		const radiusResult = ParseUtils.parseLengthPercentageNode(node);
		if (!radiusResult.ok) {
			return err(`Invalid border-radius value: ${radiusResult.error}`);
		}

		// border-radius doesn't accept negative values
		if (radiusResult.value.value < 0) {
			return err(`border-radius must be non-negative, got: ${radiusResult.value.value}`);
		}

		return ok({
			kind: "border-radius",
			radius: radiusResult.value,
		});
	} catch (e) {
		return err(`Failed to parse border-radius: ${e instanceof Error ? e.message : String(e)}`);
	}
}
