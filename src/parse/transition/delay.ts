// b_path:: src/parse/transition/delay.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

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
 * Parse CSS transition-delay property value.
 *
 * Parses comma-separated list of time values.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param css - CSS transition-delay value (e.g., "1s, 500ms, 2s")
 * @returns Result with TransitionDelay IR or error message
 *
 * @example
 * Simple delay:
 * ```typescript
 * const result = parse("1s");
 * // { ok: true, value: { kind: "transition-delay", delays: [{ value: 1, unit: "s" }] } }
 * ```
 *
 * @example
 * Multiple delays:
 * ```typescript
 * const result = parse("1s, 500ms, 2s");
 * // { ok: true, value: { kind: "transition-delay", delays: [...] } }
 * ```
 *
 * @public
 *
 * @see {@link https://github.com/mdn/data/blob/main/css/properties.json | MDN Data}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay | MDN: transition-delay}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-delay-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TransitionDelay, string> {
	const delaysResult = parseCommaSeparatedSingle(css, parseTime, "transition-delay");

	if (!delaysResult.ok) {
		return err(delaysResult.error);
	}

	return ok({
		kind: "transition-delay",
		delays: delaysResult.value,
	});
}
