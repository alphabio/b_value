// b_path:: src/parse/layout/z-index.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS z-index property value.
 *
 * Accepts integer values (positive, negative, or zero) or the keyword "auto".
 * Per CSS Positioned Layout Module Level 3 specification.
 *
 * @param css - CSS z-index value (e.g., "10", "-5", "0", "auto")
 * @returns Result with ZIndex IR or error message
 *
 * @example
 * Positive integer:
 * ```typescript
 * const result = parse("10");
 * // { ok: true, value: { kind: "z-index", value: 10 } }
 * ```
 *
 * @example
 * Negative integer:
 * ```typescript
 * const result = parse("-5");
 * // { ok: true, value: { kind: "z-index", value: -5 } }
 * ```
 *
 * @example
 * Auto keyword:
 * ```typescript
 * const result = parse("auto");
 * // { ok: true, value: { kind: "z-index", value: "auto" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/z-index | MDN: z-index}
 * @see {@link https://www.w3.org/TR/css-position-3/#z-index | W3C Spec}
 */
export function parse(css: string): Result<Type.ZIndex, string> {
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
			return err("Expected z-index value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name.toLowerCase();
			if (keyword !== "auto") {
				return err(`Invalid z-index keyword: ${keyword}`);
			}
			return ok({
				kind: "z-index",
				value: "auto",
			});
		}

		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);

			// Check if it's an integer
			if (!Number.isInteger(value)) {
				return err(`z-index must be an integer, got: ${value}`);
			}

			return ok({
				kind: "z-index",
				value,
			});
		}

		return err(`Expected integer or 'auto', got: ${node.type}`);
	} catch (error) {
		return err(`Failed to parse z-index: ${error instanceof Error ? error.message : String(error)}`);
	}
}
