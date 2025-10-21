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
 * Parse conic and repeating-conic gradients.
 *
 * @see {@link Conic.parse}
 */
export * as Conic from "./conic";
/**
 * Unified gradient dispatcher with auto-detection.
 *
 * @see {@link module:Parse.Gradient}
 */
export { parse } from "./gradient";

/**
 * Parse linear and repeating-linear gradients.
 *
 * @see {@link Linear.parse}
 */
export * as Linear from "./linear";
/**
 * Parse radial and repeating-radial gradients.
 *
 * @see {@link Radial.parse}
 */
export * as Radial from "./radial";
