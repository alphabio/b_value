// b_path:: src/parse/index.ts

/**
 * CSS value parsers - convert CSS strings to structured IR.
 *
 * All parsers return Result<T, string> for type-safe error handling.
 * Parse any CSS value into a structured intermediate representation (IR)
 * that can be inspected, transformed, or converted back to CSS.
 *
 * @module Parse
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Gradient.Radial.parse(
 *   "radial-gradient(circle, red, blue)"
 * );
 *
 * if (result.ok) {
 *   console.log(result.value.shape); // "circle"
 *   console.log(result.value.colorStops); // [...]
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */

/**
 * Animation parsers (delay, duration, iteration-count, direction, fill-mode, play-state, name, timing-function).
 *
 * @see {@link Animation.Delay.parse}
 */
export * as Animation from "./animation";
/**
 * Background parsers (attachment, clip, origin, repeat, size).
 *
 * @see {@link Background.Attachment.parse}
 */
export * as Background from "./background";
/**
 * Border parsers (width, style, color, radius).
 *
 * @see {@link Border.Width.parse}
 */
export * as Border from "./border";
/**
 * Color parsers (hex, named, RGB, HSL, HWB, LAB, LCH, OKLab, OKLCH, system, special).
 *
 * @see {@link Color.Hex.parse}
 */
export * as Color from "./color";
/**
 * Filter parsers (blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, opacity, saturate, sepia, url).
 *
 * @see {@link Filter.Blur.parse}
 */
export * as Filter from "./filter";
/**
 * Gradient parsers (radial, linear, conic).
 *
 * @see {@link Gradient.Radial.parse}
 */
export * as Gradient from "./gradient";
/**
 * Outline parsers (width, style, color, offset).
 *
 * @see {@link Outline.Width.parse}
 */
export * as Outline from "./outline";
/**
 * Position parsers (background-position, object-position, transform-origin, etc.).
 *
 * @see {@link Position.parse}
 */
export * as Position from "./position/position";
/**
 * Shadow parsers (box-shadow, text-shadow).
 *
 * @see {@link Shadow.BoxShadow.parse}
 */
export * as Shadow from "./shadow";
/**
 * Transform parsers (translate, rotate, scale, skew, matrix, etc.).
 *
 * @see {@link Transform.parse}
 */
export * as Transform from "./transform/transform";
/**
 * Transition parsers (delay, duration, timing-function, property).
 *
 * @see {@link Transition.Delay.parse}
 */
export * as Transition from "./transition";
