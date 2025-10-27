// b_path:: src/generate/transition/timing-function.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import { transitionTimingFunctionSchema } from "@/core/types/transition";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS easing function string from IR.
 *
 * @param func - EasingFunction IR
 * @returns CSS easing function string
 *
 * @internal
 */
function easingFunctionToCss(func: Type.EasingFunction): string {
	// Keyword
	if (typeof func === "string") {
		return func;
	}

	// cubic-bezier()
	if (func.type === "cubic-bezier") {
		return `cubic-bezier(${func.x1}, ${func.y1}, ${func.x2}, ${func.y2})`;
	}

	// steps()
	if (func.type === "steps") {
		if (func.position !== undefined) {
			return `steps(${func.steps}, ${func.position})`;
		}
		return `steps(${func.steps})`;
	}

	// linear()
	if (func.type === "linear") {
		const stops = func.stops
			.map((stop) => {
				if (stop.input !== undefined) {
					return `${stop.output} ${stop.input * 100}%`;
				}
				return String(stop.output);
			})
			.join(", ");
		return `linear(${stops})`;
	}

	return "";
}

/**
 * Generate CSS transition-timing-function property value from IR.
 *
 * Converts TransitionTimingFunction IR to CSS string representation.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param ir - TransitionTimingFunction IR object
 * @returns CSS transition-timing-function value string
 *
 * @example
 * Keyword:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-timing-function",
 *   functions: ["ease-in"]
 * });
 * // "ease-in"
 * ```
 *
 * @example
 * Cubic bezier:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-timing-function",
 *   functions: [{ type: "cubic-bezier", x1: 0.1, y1: 0.7, x2: 1.0, y2: 0.1 }]
 * });
 * // "cubic-bezier(0.1, 0.7, 1, 0.1)"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function | MDN: transition-timing-function}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property | W3C Spec}
 */
export function generate(ir: Type.TransitionTimingFunction): GenerateResult {
	// Validate IR with Zod schema
	const validation = transitionTimingFunctionSchema.safeParse(ir);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(ir.functions.map(easingFunctionToCss).join(", "));
}
