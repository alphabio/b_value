// b_path:: src/core/keywords/font-size-keywords.ts
import { z } from "zod";

/**
 * CSS font-size absolute size keywords.
 *
 * Absolute size keywords are mapped to font sizes computed and kept by the browser.
 * These values scale relative to each other based on the user's preferred font size (medium).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#absolute-size}
 * @public
 */
export const fontSizeAbsoluteKeywordsSchema = z
	.union([
		z.literal("xx-small").describe("absolute size 60% the size of medium"),
		z.literal("x-small").describe("absolute size 75% the size of medium"),
		z.literal("small").describe("absolute size 89% the size of medium"),
		z.literal("medium").describe("user's preferred font size (reference middle value)"),
		z.literal("large").describe("absolute size 20% larger than medium"),
		z.literal("x-large").describe("absolute size 50% larger than medium"),
		z.literal("xx-large").describe("absolute size twice the size of medium"),
		z.literal("xxx-large").describe("absolute size three times the size of medium"),
	])
	.describe(
		"Absolute size keywords for font sizing. " +
			"Used in font shorthand and font-size properties, mapped to deprecated HTML size attributes.",
	);

/**
 * CSS font-size relative size keywords.
 *
 * Relative size keywords scale relative to the parent element's computed font size.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#relative-size}
 * @public
 */
export const fontSizeRelativeKeywordsSchema = z
	.union([
		z.literal("smaller").describe("one relative size smaller than parent element"),
		z.literal("larger").describe("one relative size larger than parent element"),
	])
	.describe("Relative size keywords scale relative to the parent element's font size.");

/**
 * CSS font-size keywords (all absolute and relative values).
 *
 * The font-size property sets the size of the font. Can be specified using
 * absolute size keywords (xx-small through xxx-large) or relative keywords (smaller, larger).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size}
 *
 * @example
 * ```typescript
 * import { fontSizeKeywordsSchema } from "@/core/keywords/font-size-keywords";
 *
 * const keyword = fontSizeKeywordsSchema.parse("medium"); // "medium"
 * ```
 *
 * @public
 */
export const fontSizeKeywordsSchema = z
	.union([
		// Absolute sizes
		z
			.literal("xx-small")
			.describe("absolute size 60% the size of medium"),
		z.literal("x-small").describe("absolute size 75% the size of medium"),
		z.literal("small").describe("absolute size 89% the size of medium"),
		z.literal("medium").describe("user's preferred font size (reference middle value)"),
		z.literal("large").describe("absolute size 20% larger than medium"),
		z.literal("x-large").describe("absolute size 50% larger than medium"),
		z.literal("xx-large").describe("absolute size twice the size of medium"),
		z.literal("xxx-large").describe("absolute size three times the size of medium"),

		// Relative sizes
		z
			.literal("smaller")
			.describe("one relative size smaller than parent element"),
		z.literal("larger").describe("one relative size larger than parent element"),
	])
	.describe("CSS font-size keywords (absolute and relative)");

/**
 * Array of all absolute font-size keyword values.
 *
 * @example
 * ```typescript
 * import { FONT_SIZE_ABSOLUTE_KEYWORDS } from "@/core/keywords/font-size-keywords";
 *
 * console.log(FONT_SIZE_ABSOLUTE_KEYWORDS);
 * // ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"]
 * ```
 *
 * @public
 */
export const FONT_SIZE_ABSOLUTE_KEYWORDS = fontSizeAbsoluteKeywordsSchema.options.map((option) => option.value);

/**
 * Array of all relative font-size keyword values.
 *
 * @example
 * ```typescript
 * import { FONT_SIZE_RELATIVE_KEYWORDS } from "@/core/keywords/font-size-keywords";
 *
 * console.log(FONT_SIZE_RELATIVE_KEYWORDS); // ["smaller", "larger"]
 * ```
 *
 * @public
 */
export const FONT_SIZE_RELATIVE_KEYWORDS = fontSizeRelativeKeywordsSchema.options.map((option) => option.value);

/**
 * Array of all font-size keyword values.
 *
 * @example
 * ```typescript
 * import { FONT_SIZE_KEYWORDS } from "@/core/keywords/font-size-keywords";
 *
 * console.log(FONT_SIZE_KEYWORDS);
 * // ["xx-small", "x-small", ..., "smaller", "larger"]
 * ```
 *
 * @public
 */
export const FONT_SIZE_KEYWORDS = fontSizeKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for font-size keywords.
 *
 * @public
 */
export type FontSizeKeyword = z.infer<typeof fontSizeKeywordsSchema>;

/**
 * TypeScript type for absolute font-size keywords.
 *
 * @public
 */
export type FontSizeAbsoluteKeyword = z.infer<typeof fontSizeAbsoluteKeywordsSchema>;

/**
 * TypeScript type for relative font-size keywords.
 *
 * @public
 */
export type FontSizeRelativeKeyword = z.infer<typeof fontSizeRelativeKeywordsSchema>;

/**
 * Metadata for font-size keyword options.
 *
 * Provides value and description for each font-size keyword,
 * useful for Studio UI generation and documentation.
 *
 * @example
 * ```typescript
 * import { fontSizeKeywordOptions } from "@/core/keywords/font-size-keywords";
 *
 * fontSizeKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const fontSizeKeywordOptions = fontSizeKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for font-size keyword options metadata.
 *
 * @public
 */
export type FontSizeKeywordOptions = typeof fontSizeKeywordOptions;

/**
 * Metadata for absolute font-size keyword options.
 *
 * @public
 */
export const fontSizeAbsoluteKeywordOptions = fontSizeAbsoluteKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for absolute font-size keyword options metadata.
 *
 * @public
 */
export type FontSizeAbsoluteKeywordOptions = typeof fontSizeAbsoluteKeywordOptions;

/**
 * Metadata for relative font-size keyword options.
 *
 * @public
 */
export const fontSizeRelativeKeywordOptions = fontSizeRelativeKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for relative font-size keyword options metadata.
 *
 * @public
 */
export type FontSizeRelativeKeywordOptions = typeof fontSizeRelativeKeywordOptions;
