// b_path:: src/core/keywords/text-decoration-style-keywords.ts
import { z } from "zod";

/**
 * CSS text-decoration-style keyword values.
 *
 * The text-decoration-style property sets the style of the lines specified
 * by text-decoration-line.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style}
 *
 * @public
 */
export const textDecorationStyleKeywordsSchema = z
	.union([
		z.literal("solid").describe("single line"),
		z.literal("double").describe("double line"),
		z.literal("dotted").describe("dotted line"),
		z.literal("dashed").describe("dashed line"),
		z.literal("wavy").describe("wavy line"),
	])
	.describe("CSS text-decoration-style property keyword values");

/**
 * Array of all text-decoration-style keyword values.
 *
 * @public
 */
export const TEXT_DECORATION_STYLE_KEYWORDS = textDecorationStyleKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for text-decoration-style keywords.
 *
 * @public
 */
export type TextDecorationStyleKeyword = z.infer<typeof textDecorationStyleKeywordsSchema>;

/**
 * Metadata for text-decoration-style keyword options.
 *
 * @public
 */
export const textDecorationStyleKeywordOptions = textDecorationStyleKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for text-decoration-style keyword options metadata.
 *
 * @public
 */
export type TextDecorationStyleKeywordOptions = typeof textDecorationStyleKeywordOptions;
