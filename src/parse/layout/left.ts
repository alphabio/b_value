// b_path:: src/parse/layout/left.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS left property value.
 *
 * Accepts length-percentage values or the keyword "auto".
 * Per CSS Positioned Layout Module Level 3 specification.
 *
 * @param css - CSS left value (e.g., "10px", "50%", "auto")
 * @returns Result with Left IR or error message
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("10px");
 * // { ok: true, value: { kind: "left", value: { value: 10, unit: "px" } } }
 * ```
 *
 * @example
 * Percentage value:
 * ```typescript
 * const result = parse("50%");
 * // { ok: true, value: { kind: "left", value: { value: 50, unit: "%" } } }
 * ```
 *
 * @example
 * Auto keyword:
 * ```typescript
 * const result = parse("auto");
 * // { ok: true, value: { kind: "left", value: "auto" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/left | MDN: left}
 * @see {@link https://www.w3.org/TR/css-position-3/#insets | W3C Spec}
 */
export function parse(css: string): Result<Type.Left, string> {
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
		if (!node) {
			return err("Expected left value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();
			if (keyword !== "auto") {
				return err(`Invalid left keyword: ${keyword}`);
			}
			return ok({
				kind: "left",
				value: "auto",
			});
		}

		// Handle unitless 0 (parsed as Number by csstree)
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "left",
					value: { value: 0, unit: "px" },
				});
			}
			return err("Length values require a unit (except for 0)");
		}

		const lengthResult = ParseUtils.parseLengthPercentageNode(node);
		if (!lengthResult.ok) {
			return err(lengthResult.error);
		}

		return ok({
			kind: "left",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse left: ${error instanceof Error ? error.message : String(error)}`);
	}
}
