// b_path:: src/generate/animation/timing-function.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import { animationTimingFunctionSchema } from "@/core/types/animation";
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
 * Generate CSS animation-timing-function property value from IR.
 *
 * Converts AnimationTimingFunction IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationTimingFunction IR object
 * @returns CSS animation-timing-function value string
 *
 * @example
 * Keyword:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-timing-function",
 *   functions: ["ease-in"]
 * });
 * // "ease-in"
 * ```
 *
 * @example
 * Cubic bezier:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-timing-function",
 *   functions: [{ type: "cubic-bezier", x1: 0.1, y1: 0.7, x2: 1.0, y2: 0.1 }]
 * });
 * // "cubic-bezier(0.1, 0.7, 1.0, 0.1)"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function | MDN: animation-timing-function}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-timing-function | W3C Spec}
 */
export function generate(ir: Type.AnimationTimingFunction): GenerateResult {
	// Validate IR with Zod schema
	const validation = animationTimingFunctionSchema.safeParse(ir);

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
