import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";
import { EasingFunction } from "@/utils/parse/easing";

/**
 * Parse CSS transition-timing-function property value.
 *
 * Parses comma-separated list of easing functions.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param css - CSS transition-timing-function value (e.g., "ease-in, cubic-bezier(0.1, 0.7, 1.0, 0.1)")
 * @returns Result with TransitionTimingFunction IR or error message
 *
 * @example
 * Keyword:
 * ```typescript
 * const result = parse("ease-in");
 * // { ok: true, value: { kind: "transition-timing-function", functions: ["ease-in"] } }
 * ```
 *
 * @example
 * Cubic bezier:
 * ```typescript
 * const result = parse("cubic-bezier(0.1, 0.7, 1.0, 0.1)");
 * // { ok: true, value: { kind: "transition-timing-function", functions: [{ type: "cubic-bezier", x1: 0.1, ... }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function | MDN: transition-timing-function}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TransitionTimingFunction, string> {
	const functionsResult = parseCommaSeparatedSingle(
		css,
		EasingFunction.parseEasingFunction,
		"transition-timing-function",
	);

	if (!functionsResult.ok) {
		return err(functionsResult.error);
	}

	return ok({
		kind: "transition-timing-function",
		functions: functionsResult.value,
	});
}
