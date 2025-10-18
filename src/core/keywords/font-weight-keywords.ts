// b_path:: src/core/keywords/font-weight-keywords.ts
import { z } from "zod";

/**
 * CSS font-weight keyword values.
 *
 * The font-weight property sets the weight (or boldness) of the font.
 * These keyword values are relative to the inherited weight or absolute weights.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight}
 *
 * @example
 * ```typescript
 * import { fontWeightKeywordsSchema } from "../keywords/font-weight-keywords";
 *
 * const keyword = fontWeightKeywordsSchema.parse("bold");
 * ```
 *
 * @public
 */
export const fontWeightKeywordsSchema = z
	.union([
		z.literal("normal").describe("normal font weight (equivalent to 400)"),
		z.literal("bold").describe("bold font weight (equivalent to 700)"),
		z.literal("lighter").describe("one relative font weight lighter than parent"),
		z.literal("bolder").describe("one relative font weight bolder than parent"),
	])
	.describe("CSS font-weight property keyword values");

/**
 * Array of all font-weight keyword values.
 *
 * @public
 */
export const FONT_WEIGHT_KEYWORDS = fontWeightKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for font-weight keywords.
 *
 * @public
 */
export type FontWeightKeyword = z.infer<typeof fontWeightKeywordsSchema>;

/**
 * Metadata for font-weight keyword options.
 *
 * @public
 */
export const fontWeightKeywordOptions = fontWeightKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for font-weight keyword options metadata.
 *
 * @public
 */
export type FontWeightKeywordOptions = typeof fontWeightKeywordOptions;
