// b_path:: src/core/keywords/text-decoration-thickness-keywords.ts
import { z } from "zod";

/**
 * CSS text-decoration-thickness keyword values.
 *
 * The text-decoration-thickness property sets the thickness of the decoration
 * line used on text.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness}
 *
 * @public
 */
export const textDecorationThicknessKeywordsSchema = z
	.union([
		z.literal("auto").describe("browser chooses thickness"),
		z.literal("from-font").describe("use thickness from font file"),
	])
	.describe("CSS text-decoration-thickness property keyword values");

/**
 * Array of all text-decoration-thickness keyword values.
 *
 * @public
 */
export const TEXT_DECORATION_THICKNESS_KEYWORDS = textDecorationThicknessKeywordsSchema.options.map(
	(option) => option.value,
);

/**
 * TypeScript type for text-decoration-thickness keywords.
 *
 * @public
 */
export type TextDecorationThicknessKeyword = z.infer<typeof textDecorationThicknessKeywordsSchema>;

/**
 * Metadata for text-decoration-thickness keyword options.
 *
 * @public
 */
export const textDecorationThicknessKeywordOptions = textDecorationThicknessKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for text-decoration-thickness keyword options metadata.
 *
 * @public
 */
export type TextDecorationThicknessKeywordOptions = typeof textDecorationThicknessKeywordOptions;
