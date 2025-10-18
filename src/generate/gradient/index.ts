// b_path:: src/generate/gradient/index.ts

/**
 * CSS gradient generators - convert gradient IR to CSS strings.
 *
 * @module Generate.Gradient
 * @public
 */

/**
 * Generate color stop CSS strings.
 *
 * @see {@link ColorStop.toCss}
 */
export * as ColorStop from "./color-stop";

/**
 * Generate radial and repeating-radial gradient CSS strings.
 *
 * @see {@link Radial.toCss}
 */
export * as Radial from "./radial";
