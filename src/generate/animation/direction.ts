// b_path:: src/generate/animation/direction.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import { animationDirectionSchema } from "@/core/types/animation";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS animation-direction property value from IR.
 *
 * Converts AnimationDirection IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationDirection IR object
 * @returns CSS animation-direction value string
 *
 * @example
 * Single direction:
 * ```typescript
 * const css = toCss({ kind: "animation-direction", directions: ["normal"] });
 * // "normal"
 * ```
 *
 * @example
 * Multiple directions:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-direction",
 *   directions: ["normal", "reverse", "alternate"]
 * });
 * // "normal, reverse, alternate"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction | MDN: animation-direction}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-direction | W3C Spec}
 */
export function generate(ir: Type.AnimationDirection): GenerateResult {
	// Validate IR with Zod schema
	const validation = animationDirectionSchema.safeParse(ir);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(ir.directions.join(", "));
}
