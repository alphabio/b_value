// b_path:: src/core/keywords/text-align-keywords.ts
import { z } from "zod";

/**
 * CSS text-align keyword values.
 *
 * The text-align property sets the horizontal alignment of the inline-level content
 * inside a block element or table-cell box.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-align}
 *
 * @example
 * ```typescript
 * import { textAlignKeywordsSchema } from "@/core/keywords/text-align-keywords";
 *
 * const keyword = textAlignKeywordsSchema.parse("center");
 * ```
 *
 * @public
 */
export const textAlignKeywordsSchema = z
	.union([
		z.literal("left").describe("inline contents aligned to left edge"),
		z.literal("right").describe("inline contents aligned to right edge"),
		z.literal("center").describe("inline contents centered"),
		z.literal("justify").describe("inline contents justified (text spaced to fill line)"),
		z.literal("start").describe("aligned to start edge of writing mode direction"),
		z.literal("end").describe("aligned to end edge of writing mode direction"),
	])
	.describe("CSS text-align property keyword values");

/**
 * Array of all text-align keyword values.
 *
 * @public
 */
export const TEXT_ALIGN_KEYWORDS = textAlignKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for text-align keywords.
 *
 * @public
 */
export type TextAlignKeyword = z.infer<typeof textAlignKeywordsSchema>;

/**
 * Metadata for text-align keyword options.
 *
 * @public
 */
export const textAlignKeywordOptions = textAlignKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for text-align keyword options metadata.
 *
 * @public
 */
export type TextAlignKeywordOptions = typeof textAlignKeywordOptions;
