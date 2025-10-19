// b_path:: src/generate/animation/duration.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS animation-duration property value from IR.
 *
 * Converts AnimationDuration IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationDuration IR object
 * @returns CSS animation-duration value string
 *
 * @example
 * Time duration:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-duration",
 *   durations: [{ type: "time", value: 1, unit: "s" }]
 * });
 * // "1s"
 * ```
 *
 * @example
 * Auto keyword:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-duration",
 *   durations: [{ type: "auto" }]
 * });
 * // "auto"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration | MDN: animation-duration}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-duration | W3C Spec}
 */
export function toCss(ir: Type.AnimationDuration): string {
	return ir.durations
		.map((duration) => {
			if (duration.type === "auto") {
				return "auto";
			}
			return `${duration.value}${duration.unit}`;
		})
		.join(", ");
}
