// b_path:: src/index.ts

/**
 * b_value - Bidirectional CSS value parser
 *
 * Parse CSS values to structured IR and generate CSS from IR.
 * Built on css-tree and Zod for type-safe, spec-compliant CSS value handling.
 *
 * @packageDocumentation
 *
 * @example
 * Parse CSS to IR:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Gradient.Radial.parse(
 *   "radial-gradient(circle at center, red 0%, blue 100%)"
 * );
 *
 * if (result.ok) {
 *   console.log(result.value);
 * }
 * ```
 *
 * @example
 * Generate IR to CSS:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Gradient.Radial.toCss({
 *   kind: "radial",
 *   shape: "circle",
 *   position: { horizontal: "center", vertical: "center" },
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "%" } },
 *     { color: "blue", position: { value: 100, unit: "%" } }
 *   ],
 *   repeating: false
 * });
 *
 * console.log(css);
 * // "radial-gradient(circle at center center, red 0%, blue 100%)"
 * ```
 *
 * @example
 * Round-trip transformation:
 * ```typescript
 * import { Parse, Generate } from "b_value";
 *
 * const original = "radial-gradient(circle, red, blue)";
 * const parsed = Parse.Gradient.Radial.parse(original);
 *
 * if (parsed.ok) {
 *   const generated = Generate.Gradient.Radial.toCss(parsed.value);
 *   console.log(generated === original); // true
 * }
 * ```
 */

/**
 * Core types, schemas, units, and keywords.
 *
 * Provides access to all Zod schemas and TypeScript types used for CSS value
 * intermediate representation (IR). Most users won't need to use Core directly,
 * but it's available for advanced use cases like custom validation or schema
 * composition.
 *
 * @example
 * ```typescript
 * import { Core } from "b_value";
 *
 * // Access TypeScript types
 * type RadialGradient = Core.Type.RadialGradient;
 * type ColorStop = Core.Type.ColorStop;
 *
 * // Access Zod schemas for validation
 * const result = Core.Schema.radialGradientSchema.safeParse(data);
 * ```
 */
export * as Core from "./core";
/**
 * Public API types for parsing and generation.
 *
 * @example
 * ```typescript
 * import type { ParseResult, GenerateResult, Issue, CSSPropertyName } from "b_value";
 *
 * const result: ParseResult<Color> = Parse.Color.parse("#ff0000");
 * if (result.ok) {
 *   console.log(result.value);
 * } else {
 *   console.error(result.issues);
 * }
 * ```
 */
export type {
	CSSLonghandProperty,
	CSSPropertyName,
	CSSShorthandProperty,
	GenerateResult,
	Issue,
	IssueCode,
	ParseResult,
} from "./core/result";
export {
	addIssue,
	combineResults,
	generateErr,
	generateOk,
	Issues,
	parseErr,
	parseOk,
	withWarning,
} from "./core/result";

// Export CSSValue union type and helpers
export type { CSSValue } from "./core/types/css-value";
export { isCSSValue, isUnparsedString } from "./core/types/css-value";
/**
 * CSS → IR generators (convert IR to CSS strings).
 *
 * Generators take intermediate representation (IR) objects and produce
 * spec-compliant CSS strings. All generators return strings directly
 * (no Result type needed since generation cannot fail).
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Gradient.Radial.toCss({
 *   kind: "radial",
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * // "radial-gradient(red, blue)"
 * ```
 */
export * as Generate from "./generate";
/**
 * CSS → IR parsers (convert CSS strings to structured IR).
 *
 * Parsers take CSS strings and produce type-safe intermediate representation
 * (IR) objects. All parsers return Result<T, string> for type-safe error
 * handling without exceptions.
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Gradient.Radial.parse(
 *   "radial-gradient(red, blue)"
 * );
 *
 * if (result.ok) {
 *   console.log(result.value); // RadialGradient IR
 * } else {
 *   console.error(result.error); // Error message
 * }
 * ```
 */
export * as Parse from "./parse";
/**
 * Universal API for parsing and generating ANY CSS longhand property.
 *
 * Parse declarations like "color: red" and generate CSS from IR with property names.
 *
 * @example
 * Parse any longhand property:
 * ```typescript
 * import { parse } from "b_value";
 *
 * const result = parse("color: red");
 * if (result.ok) {
 *   console.log(result.property); // "color"
 *   console.log(result.value);    // { kind: "named", name: "red" }
 * }
 * ```
 *
 * @example
 * Generate CSS from IR:
 * ```typescript
 * import { generate } from "b_value";
 *
 * const result = generate({
 *   property: "color",
 *   value: { kind: "hex", r: 255, g: 0, b: 0 }
 * });
 * if (result.ok) {
 *   console.log(result.value); // "#ff0000"
 * }
 * ```
 *
 * @example
 * Batch parse multiple properties:
 * ```typescript
 * import { parseAll } from "b_value";
 *
 * const result = parseAll("color: red; width: 10px");
 * if (result.ok) {
 *   console.log(result.value.color);  // { kind: "named", name: "red" }
 *   console.log(result.value.width);  // { kind: "length", value: 10, unit: "px" }
 * }
 * ```
 */
export { generate, parse, parseAll } from "./universal";
