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
 * Gradient parsers (radial, linear, conic).
 *
 * @see {@link Gradient.Radial.parse}
 */
export * as Gradient from "./gradient";
/**
 * Position parsers (background-position, object-position, transform-origin, etc.).
 *
 * @see {@link Position.parse}
 */
export * as Position from "./position/position";
/**
 * Transform parsers (translate, rotate, scale, skew, matrix, etc.).
 *
 * @see {@link Transform.parse}
 */
export * as Transform from "./transform/transform";
