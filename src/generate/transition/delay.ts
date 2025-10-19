// b_path:: src/generate/transition/delay.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS transition-delay property value from IR.
 *
 * Converts TransitionDelay IR to CSS string representation.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param ir - TransitionDelay IR object
 * @returns CSS transition-delay value string
 *
 * @example
 * Single delay:
 * ```typescript
 * const css = toCss({ kind: "transition-delay", delays: [{ value: 1, unit: "s" }] });
 * // "1s"
 * ```
 *
 * @example
 * Multiple delays:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-delay",
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
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay | MDN: transition-delay}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-delay-property | W3C Spec}
 */
export function toCss(ir: Type.TransitionDelay): string {
	return ir.delays.map((time) => `${time.value}${time.unit}`).join(", ");
}
