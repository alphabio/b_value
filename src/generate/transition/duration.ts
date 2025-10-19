// b_path:: src/generate/transition/duration.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS transition-duration property value from IR.
 *
 * Converts TransitionDuration IR to CSS string representation.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param ir - TransitionDuration IR object
 * @returns CSS transition-duration value string
 *
 * @example
 * Time duration:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-duration",
 *   durations: [{ value: 1, unit: "s" }]
 * });
 * // "1s"
 * ```
 *
 * @example
 * Multiple durations:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-duration",
 *   durations: [
 *     { value: 1, unit: "s" },
 *     { value: 500, unit: "ms" }
 *   ]
 * });
 * // "1s, 500ms"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration | MDN: transition-duration}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-duration-property | W3C Spec}
 */
export function toCss(ir: Type.TransitionDuration): string {
	return ir.durations.map((duration) => `${duration.value}${duration.unit}`).join(", ");
}
