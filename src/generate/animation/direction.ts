// b_path:: src/generate/animation/direction.ts
import type * as Type from "@/core/types";

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
export function toCss(ir: Type.AnimationDirection): string {
	return ir.directions.join(", ");
}
