// b_path:: src/parse/layout/width.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS width property value.
 *
 * Accepts length-percentage values, auto keyword, or intrinsic sizing keywords.
 * Per CSS Sizing Module Level 3 specification.
 *
 * @param css - CSS width value (e.g., "200px", "50%", "auto", "min-content")
 * @returns Result with Width IR or error message
 *
 * @example
 * Length value:
 * ```typescript
 * const result = parse("200px");
 * // { ok: true, value: { kind: "width", value: { value: 200, unit: "px" } } }
 * ```
 *
 * @example
 * Auto keyword:
 * ```typescript
 * const result = parse("auto");
 * // { ok: true, value: { kind: "width", value: "auto" } }
 * ```
 *
 * @example
 * Intrinsic sizing:
 * ```typescript
 * const result = parse("min-content");
 * // { ok: true, value: { kind: "width", value: "min-content" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/width | MDN: width}
 * @see {@link https://www.w3.org/TR/css-sizing-3/#width-height-keywords | W3C Spec}
 */
export function parse(css: string): Result<Type.Width, string> {
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
			return err("Expected width value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();

			// Check for auto
			if (keyword === "auto") {
				return ok({
					kind: "width",
					value: "auto",
				});
			}

			// Check for intrinsic sizing keywords
			if (keyword === "min-content" || keyword === "max-content" || keyword === "fit-content") {
				return ok({
					kind: "width",
					value: keyword,
				});
			}

			return err(`Invalid width keyword: ${keyword}`);
		}

		// Handle unitless 0 (parsed as Number by csstree)
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				return ok({
					kind: "width",
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
			kind: "width",
			value: lengthResult.value,
		});
	} catch (error) {
		return err(`Failed to parse width: ${error instanceof Error ? error.message : String(error)}`);
	}
}
