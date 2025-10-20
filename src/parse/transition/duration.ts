// b_path:: src/parse/transition/duration.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

/**
 * Parse duration value from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with Time object or error
 *
 * @internal
 */
function parseDuration(node: csstree.CssNode): Result<Type.Time, string> {
	if (node.type !== "Dimension") {
		return err(`Expected time dimension, got: ${node.type}`);
	}

	const value = Number.parseFloat(node.value);
	const unit = node.unit.toLowerCase();

	if (unit !== "s" && unit !== "ms") {
		return err(`Invalid time unit: ${unit}. Expected 's' or 'ms'`);
	}

	if (value < 0) {
		return err(`transition-duration must be non-negative, got: ${value}`);
	}

	return ok({
		value,
		unit: unit as "s" | "ms",
	});
}

/**
 * Parse CSS transition-duration property value.
 *
 * Parses comma-separated list of time values.
 * Time values must be non-negative.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param css - CSS transition-duration value (e.g., "1s, 500ms")
 * @returns Result with TransitionDuration IR or error message
 *
 * @example
 * Simple duration:
 * ```typescript
 * const result = parse("1s");
 * // { ok: true, value: { kind: "transition-duration", durations: [{ value: 1, unit: "s" }] } }
 * ```
 *
 * @example
 * Multiple durations:
 * ```typescript
 * const result = parse("1s, 500ms");
 * // { ok: true, value: { kind: "transition-duration", durations: [...] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration | MDN: transition-duration}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-duration-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TransitionDuration, string> {
	const durationsResult = parseCommaSeparatedSingle(css, parseDuration, "transition-duration");

	if (!durationsResult.ok) {
		return err(durationsResult.error);
	}

	return ok({
		kind: "transition-duration",
		durations: durationsResult.value,
	});
}
