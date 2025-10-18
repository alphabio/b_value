// b_path:: src/core/keywords/text-transform-keywords.ts
import { z } from "zod";

/**
 * CSS text-transform keyword values.
 *
 * The text-transform property specifies how to capitalize an element's text.
 * It can be used to make text appear in all-uppercase or all-lowercase, or with
 * each word capitalized.
 *
 * Includes CSS Text Level 4 values for CJK (Chinese/Japanese/Korean) typography support.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform}
 * @see {@link https://www.w3.org/TR/css-text-4/#text-transform-property}
 *
 * @example
 * ```typescript
 * import { textTransformKeywordsSchema } from "../keywords/text-transform-keywords";
 *
 * const keyword = textTransformKeywordsSchema.parse("uppercase");
 * ```
 *
 * @public
 */
export const textTransformKeywordsSchema = z
	.union([
		z.literal("none").describe("no capitalization, text renders as is"),
		z.literal("capitalize").describe("first letter of each word capitalized"),
		z.literal("uppercase").describe("all characters converted to uppercase"),
		z.literal("lowercase").describe("all characters converted to lowercase"),
		z.literal("full-width").describe("transforms characters to their fullwidth forms (CJK typography)"),
		z.literal("full-size-kana").describe("converts small Kana to full-size characters (Japanese typography)"),
	])
	.describe("CSS text-transform property keyword values (includes CSS Text Level 4 values)");

/**
 * Array of all text-transform keyword values.
 *
 * @public
 */
export const TEXT_TRANSFORM_KEYWORDS = textTransformKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for text-transform keywords.
 *
 * @public
 */
export type TextTransformKeyword = z.infer<typeof textTransformKeywordsSchema>;

/**
 * Metadata for text-transform keyword options.
 *
 * @public
 */
export const textTransformKeywordOptions = textTransformKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for text-transform keyword options metadata.
 *
 * @public
 */
export type TextTransformKeywordOptions = typeof textTransformKeywordOptions;
