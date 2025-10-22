// b_path:: src/generate/animation/play-state.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS animation-play-state property value from IR.
 *
 * Converts AnimationPlayState IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationPlayState IR object
 * @returns CSS animation-play-state value string
 *
 * @example
 * Single play state:
 * ```typescript
 * const css = toCss({ kind: "animation-play-state", states: ["running"] });
 * // "running"
 * ```
 *
 * @example
 * Multiple play states:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-play-state",
 *   states: ["running", "paused"]
 * });
 * // "running, paused"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state | MDN: animation-play-state}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-play-state | W3C Spec}
 */
export function generate(ir: Type.AnimationPlayState): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(ir.states.join(", "));
}
