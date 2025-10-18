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
 * Generate conic and repeating-conic gradient CSS strings.
 *
 * @see {@link Conic.toCss}
 */
export * as Conic from "./conic";

/**
 * Generate linear and repeating-linear gradient CSS strings.
 *
 * @see {@link Linear.toCss}
 */
export * as Linear from "./linear";
/**
 * Generate radial and repeating-radial gradient CSS strings.
 *
 * @see {@link Radial.toCss}
 */
export * as Radial from "./radial";
