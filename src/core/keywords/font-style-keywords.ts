// b_path:: src/core/keywords/font-style-keywords.ts
import { z } from "zod";

/**
 * CSS font-style keyword values.
 *
 * The font-style property sets whether a font should be styled with a normal, italic,
 * or oblique face from its font-family.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-style}
 *
 * @example
 * ```typescript
 * import { fontStyleKeywordsSchema } from "../keywords/font-style-keywords";
 *
 * const keyword = fontStyleKeywordsSchema.parse("italic");
 * ```
 *
 * @public
 */
export const fontStyleKeywordsSchema = z
	.union([
		z.literal("normal").describe("normal font style"),
		z.literal("italic").describe("italic font style using dedicated italic font face"),
		z.literal("oblique").describe("oblique font style using slanted version of normal font"),
	])
	.describe("CSS font-style property keyword values");

/**
 * Array of all font-style keyword values.
 *
 * @public
 */
export const FONT_STYLE_KEYWORDS = fontStyleKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for font-style keywords.
 *
 * @public
 */
export type FontStyleKeyword = z.infer<typeof fontStyleKeywordsSchema>;

/**
 * Metadata for font-style keyword options.
 *
 * @public
 */
export const fontStyleKeywordOptions = fontStyleKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for font-style keyword options metadata.
 *
 * @public
 */
export type FontStyleKeywordOptions = typeof fontStyleKeywordOptions;
