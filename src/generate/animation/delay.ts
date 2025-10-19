// b_path:: src/generate/animation/delay.ts
import type * as Type from "@/core/types";

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
export function toCss(ir: Type.AnimationDelay): string {
	return ir.delays.map((time) => `${time.value}${time.unit}`).join(", ");
}
