// b_path:: src/parse/animation/delay.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse time value from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with Time object or error
 *
 * @internal
 */
function parseTime(node: csstree.CssNode): Result<Type.Time, string> {
	if (node.type !== "Dimension") {
		return err(`Expected time dimension, got: ${node.type}`);
	}

	const value = Number.parseFloat(node.value);
	const unit = node.unit.toLowerCase();

	if (unit !== "s" && unit !== "ms") {
		return err(`Invalid time unit: ${unit}. Expected 's' or 'ms'`);
	}

	return ok({
		value,
		unit: unit as "s" | "ms",
	});
}

/**
 * Parse CSS animation-delay property value.
 *
 * Parses comma-separated list of time values.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-delay value (e.g., "1s, 500ms, 2s")
 * @returns Result with AnimationDelay IR or error message
 *
 * @example
 * Simple delay:
 * ```typescript
 * const result = parse("1s");
 * // { ok: true, value: { kind: "animation-delay", delays: [{ value: 1, unit: "s" }] } }
 * ```
 *
 * @example
 * Multiple delays:
 * ```typescript
 * const result = parse("1s, 500ms, 2s");
 * // { ok: true, value: { kind: "animation-delay", delays: [...] } }
 * ```
 *
 * @public
 *
 * @see {@link https://github.com/mdn/data/blob/main/css/properties.json | MDN Data}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay | MDN: animation-delay}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-delay | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationDelay, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });
		const children = ast.children.toArray();

		const delays: Type.Time[] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1) {
					const timeResult = parseTime(currentNodes[0]);
					if (!timeResult.ok) {
						return err(timeResult.error);
					}
					delays.push(timeResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single time value between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1) {
			const timeResult = parseTime(currentNodes[0]);
			if (!timeResult.ok) {
				return err(timeResult.error);
			}
			delays.push(timeResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-delay value");
		} else {
			return err("Expected single time value");
		}

		if (delays.length === 0) {
			return err("animation-delay requires at least one time value");
		}

		return ok({
			kind: "animation-delay",
			delays,
		});
	} catch (e) {
		return err(`Failed to parse animation-delay: ${e instanceof Error ? e.message : String(e)}`);
	}
}
