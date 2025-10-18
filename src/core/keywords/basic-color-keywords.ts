// b_path:: src/core/keywords/basic-color-keywords.ts
import { z } from "zod";

/**
 * CSS basic named colors (22 colors).
 *
 * Common subset of named colors for basic use cases.
 * These are the most commonly used color names in CSS.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/named-color}
 * @public
 */
export const basicNamedColorKeywordsSchema = z
	.union([
		z.literal("black").describe("Pure black color (#000000)"),
		z.literal("white").describe("Pure white color (#FFFFFF)"),
		z.literal("red").describe("Pure red color (#FF0000)"),
		z.literal("green").describe("Pure green color (#008000)"),
		z.literal("blue").describe("Pure blue color (#0000FF)"),
		z.literal("yellow").describe("Pure yellow color (#FFFF00)"),
		z.literal("orange").describe("Orange color (#FFA500)"),
		z.literal("purple").describe("Purple color (#800080)"),
		z.literal("pink").describe("Pink color (#FFC0CB)"),
		z.literal("brown").describe("Brown color (#A52A2A)"),
		z.literal("gray").describe("Gray color (#808080)"),
		z.literal("grey").describe("Alternative spelling of gray"),
		z.literal("silver").describe("Silver color (#C0C0C0)"),
		z.literal("gold").describe("Gold color (#FFD700)"),
		z.literal("navy").describe("Navy blue color (#000080)"),
		z.literal("teal").describe("Teal color (#008080)"),
		z.literal("lime").describe("Lime color (#00FF00)"),
		z.literal("aqua").describe("Aqua color (#00FFFF)"),
		z.literal("fuchsia").describe("Fuchsia color (#FF00FF)"),
		z.literal("maroon").describe("Maroon color (#800000)"),
		z.literal("olive").describe("Olive color (#808000)"),
		z.literal("cyan").describe("Cyan color (#00FFFF)"),
	])
	.describe("CSS basic named colors");

/**
 * Array of all basic named color keyword values.
 *
 * @example
 * ```typescript
 * import { BASIC_NAMED_COLOR_KEYWORDS } from "../keywords/basic-color-keywords";
 *
 * console.log(BASIC_NAMED_COLOR_KEYWORDS); // ["black", "white", "red", ...]
 * ```
 *
 * @public
 */
export const BASIC_NAMED_COLOR_KEYWORDS = basicNamedColorKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for basic named color keywords.
 *
 * @public
 */
export type BasicNamedColorKeyword = z.infer<typeof basicNamedColorKeywordsSchema>;

/**
 * Metadata for basic named color keyword options.
 *
 * Provides value and description for each basic named color keyword,
 * useful for Studio UI generation and documentation.
 *
 * @example
 * ```typescript
 * import { basicNamedColorKeywordOptions } from "../keywords/basic-color-keywords";
 *
 * basicNamedColorKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const basicNamedColorKeywordOptions = basicNamedColorKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for basic named color keyword options metadata.
 *
 * @public
 */
export type BasicNamedColorKeywordOptions = typeof basicNamedColorKeywordOptions;
