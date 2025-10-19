// b_path:: src/generate/animation/fill-mode.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS animation-fill-mode property value from IR.
 *
 * Converts AnimationFillMode IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationFillMode IR object
 * @returns CSS animation-fill-mode value string
 *
 * @example
 * Single fill mode:
 * ```typescript
 * const css = toCss({ kind: "animation-fill-mode", modes: ["forwards"] });
 * // "forwards"
 * ```
 *
 * @example
 * Multiple fill modes:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-fill-mode",
 *   modes: ["none", "forwards", "both"]
 * });
 * // "none, forwards, both"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode | MDN: animation-fill-mode}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-fill-mode | W3C Spec}
 */
export function toCss(ir: Type.AnimationFillMode): string {
	return ir.modes.join(", ");
}
