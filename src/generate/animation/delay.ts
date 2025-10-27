// b_path:: src/generate/animation/delay.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import { animationDelaySchema } from "@/core/types/animation";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS animation-delay property value from IR.
 *
 * Converts AnimationDelay IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationDelay IR object
 * @returns CSS animation-delay value string
 *
 * @example
 * Single delay:
 * ```typescript
 * const css = toCss({ kind: "animation-delay", delays: [{ value: 1, unit: "s" }] });
 * // "1s"
 * ```
 *
 * @example
 * Multiple delays:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-delay",
 *   delays: [
 *     { value: 1, unit: "s" },
 *     { value: 500, unit: "ms" },
 *     { value: 2, unit: "s" }
 *   ]
 * });
 * // "1s, 500ms, 2s"
 * ```
 *
 * @public
 *
 * @see {@link https://github.com/mdn/data/blob/main/css/properties.json | MDN Data}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay | MDN: animation-delay}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-delay | W3C Spec}
 */
export function generate(ir: Type.AnimationDelay): GenerateResult {
	// Validate IR with Zod schema
	const validation = animationDelaySchema.safeParse(ir);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(ir.delays.map((time) => `${time.value}${time.unit}`).join(", "));
}
