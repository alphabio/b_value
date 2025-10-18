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
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * });
 *
 * console.log(css); // "radial-gradient(circle, red, blue)"
 * ```
 */

/**
 * Gradient generators (radial, linear, conic).
 *
 * @see {@link Gradient.Radial.toCss}
 */
export * as Gradient from "./gradient";
/**
 * Position generators (background-position, object-position, transform-origin, etc.).
 *
 * @see {@link Position.toCss}
 */
export * as Position from "./position";
/**
 * Transform generators (translate, rotate, scale, skew, matrix, etc.).
 *
 * @see {@link Transform.toCss}
 */
export * as Transform from "./transform";
