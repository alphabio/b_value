// b_path:: src/generate/index.ts

/**
 * CSS value generators - convert structured IR to CSS strings.
 *
 * All generators return CSS strings directly (no Result type needed since
 * generation cannot fail). Convert intermediate representation (IR) objects
 * into spec-compliant CSS that can be used in stylesheets.
 *
 * @module Generate
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Gradient.Radial.toCss({
 *   kind: "radial",
 *   shape: "circle",
 *   colorStops: [
 *     { color: { kind: "named", name: "red" } },
 *     { color: { kind: "named", name: "blue" } }
 *   ],
 *   repeating: false
 * });
 *
 * console.log(css); // "radial-gradient(circle, red, blue)"
 * ```
 */

/**
 * Animation generators (delay, duration, iteration-count, direction, fill-mode, play-state, name, timing-function).
 *
 * @see {@link Animation.Delay.toCss}
 */
export * as Animation from "./animation";
/**
 * Border generators (width, style, color, radius).
 *
 * @see {@link Border.Width.toCss}
 */
export * as Border from "./border";
/**
 * Color generators (hex, named, RGB, HSL, HWB, LAB, LCH, OKLab, OKLCH, system, special).
 *
 * @see {@link Color.Hex.toCss}
 */
export * as Color from "./color";
/**
 * Filter generators (blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, opacity, saturate, sepia, url).
 *
 * @see {@link Filter.Blur.toCss}
 */
export * as Filter from "./filter";
/**
 * Gradient generators (radial, linear, conic).
 *
 * @see {@link Gradient.Radial.toCss}
 */
export * as Gradient from "./gradient";
/**
 * Outline generators (width, style, color, offset).
 *
 * @see {@link Outline.Width.toCss}
 */
export * as Outline from "./outline";
/**
 * Position generators (background-position, object-position, transform-origin, etc.).
 *
 * @see {@link Position.toCss}
 */
export * as Position from "./position";
/**
 * Shadow generators (box-shadow, text-shadow).
 *
 * @see {@link Shadow.BoxShadow.toCss}
 */
export * as Shadow from "./shadow";
/**
 * Transform generators (translate, rotate, scale, skew, matrix, etc.).
 *
 * @see {@link Transform.toCss}
 */
export * as Transform from "./transform";
/**
 * Transition generators (delay, duration, timing-function, property).
 *
 * @see {@link Transition.Delay.toCss}
 */
export * as Transition from "./transition";
