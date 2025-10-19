// b_path:: src/parse/layout/opacity.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS opacity property value.
 *
 * Accepts number (0-1) or percentage (0%-100%) values.
 * Values are clamped to the range [0, 1].
 *
 * @param css - CSS opacity value (e.g., "0.5", "50%", "1")
 * @returns Result with Opacity IR or error message
 *
 * @example
 * Number value:
 * ```typescript
 * const result = parse("0.5");
 * // { ok: true, value: { kind: "opacity", value: 0.5 } }
 * ```
 *
 * @example
 * Percentage value:
 * ```typescript
 * const result = parse("50%");
 * // { ok: true, value: { kind: "opacity", value: 0.5 } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/opacity | MDN: opacity}
 * @see {@link https://www.w3.org/TR/css-color-4/#transparency | W3C Spec}
 */
export function parse(css: string): Result<Type.Opacity, string> {
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
			return err("Expected opacity value");
		}

		let value: number;

		if (node.type === "Number") {
			value = Number.parseFloat(node.value);
		} else if (node.type === "Percentage") {
			value = Number.parseFloat(node.value) / 100;
		} else {
			return err(`Expected number or percentage, got: ${node.type}`);
		}

		// Clamp value to [0, 1]
		value = Math.max(0, Math.min(1, value));

		return ok({
			kind: "opacity",
			value,
		});
	} catch (error) {
		return err(`Failed to parse opacity: ${error instanceof Error ? error.message : String(error)}`);
	}
}
