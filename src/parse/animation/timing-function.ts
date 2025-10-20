// b_path:: src/parse/animation/timing-function.ts
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";
import { EasingFunction } from "@/utils/parse/easing";

/**
 * Parse CSS animation-timing-function property value.
 *
 * Parses comma-separated list of easing functions.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-timing-function value (e.g., "ease-in, cubic-bezier(0.1, 0.7, 1.0, 0.1)")
 * @returns Result with AnimationTimingFunction IR or error message
 *
 * @example
 * Keyword:
 * ```typescript
 * const result = parse("ease-in");
 * // { ok: true, value: { kind: "animation-timing-function", functions: ["ease-in"] } }
 * ```
 *
 * @example
 * Cubic bezier:
 * ```typescript
 * const result = parse("cubic-bezier(0.1, 0.7, 1.0, 0.1)");
 * // { ok: true, value: { kind: "animation-timing-function", functions: [{ type: "cubic-bezier", x1: 0.1, ... }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function | MDN: animation-timing-function}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-timing-function | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationTimingFunction, string> {
	const functionsResult = parseCommaSeparatedSingle(
		css,
		EasingFunction.parseEasingFunction,
		"animation-timing-function",
	);

	if (!functionsResult.ok) {
		return err(functionsResult.error);
	}

	return ok({
		kind: "animation-timing-function",
		functions: functionsResult.value,
	});
}
