// b_path:: src/parse/gradient/index.ts

/**
 * CSS gradient parsers - convert gradient strings to structured IR.
 *
 * @module Parse.Gradient
 * @public
 */

/**
 * Parse color stops within gradients.
 *
 * @see {@link ColorStop.parse}
 */
export * as ColorStop from "./color-stop";

/**
 * Parse radial and repeating-radial gradients.
 *
 * @see {@link Radial.parse}
 */
export * as Radial from "./radial";
