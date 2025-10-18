// b_path:: src/core/keywords/border-style-keywords.ts
import { z } from "zod";

/**
 * CSS border-style keywords.
 *
 * Defines the style of the border line for all four sides of an element's border.
 * These keywords control how the border appears visually.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-style}
 *
 * @example
 * ```typescript
 * import { borderStyleKeywordsSchema } from "../keywords/border-style-keywords";
 *
 * const keyword = borderStyleKeywordsSchema.parse("solid"); // "solid"
 * ```
 *
 * @public
 */
export const borderStyleKeywordsSchema = z
	.union([
		z.literal("none").describe("No border"),
		z.literal("hidden").describe("Same as none, but with different behavior in table elements"),
		z.literal("dotted").describe("Series of round dots"),
		z.literal("dashed").describe("Series of short square-ended dashes"),
		z.literal("solid").describe("Single, straight, solid line"),
		z.literal("double").describe("Two straight lines that add up to the pixel size defined by border-width"),
		z.literal("groove").describe("Carved effect - opposite of ridge"),
		z.literal("ridge").describe("Extruded effect - opposite of groove"),
		z.literal("inset").describe("Border makes element appear embedded"),
		z.literal("outset").describe("Border makes element appear raised"),
	])
	.describe("CSS border style keywords");

/**
 * Array of all border-style keyword values.
 *
 * @example
 * ```typescript
 * import { BORDER_STYLE_KEYWORDS } from "../keywords/border-style-keywords";
 *
 * console.log(BORDER_STYLE_KEYWORDS); // ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"]
 * ```
 *
 * @public
 */
export const BORDER_STYLE_KEYWORDS = borderStyleKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for border-style keywords.
 *
 * @public
 */
export type BorderStyleKeyword = z.infer<typeof borderStyleKeywordsSchema>;

/**
 * Metadata for border-style keyword options.
 *
 * Provides value and description for each border-style keyword,
 * useful for Studio UI generation and documentation.
 *
 * @example
 * ```typescript
 * import { borderStyleKeywordOptions } from "../keywords/border-style-keywords";
 *
 * borderStyleKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const borderStyleKeywordOptions = borderStyleKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for border-style keyword options metadata.
 *
 * @public
 */
export type BorderStyleKeywordOptions = typeof borderStyleKeywordOptions;
