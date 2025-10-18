// b_path:: src/core/keywords/vertical-align-keywords.ts
import { z } from "zod";

/**
 * CSS vertical-align keyword values.
 *
 * The vertical-align property sets vertical alignment of an inline, inline-block
 * or table-cell box.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align}
 *
 * @public
 */
export const verticalAlignKeywordsSchema = z
	.union([
		z.literal("baseline").describe("align baseline with parent baseline"),
		z.literal("sub").describe("align baseline with parent subscript baseline"),
		z.literal("super").describe("align baseline with parent superscript baseline"),
		z.literal("text-top").describe("align top with parent font top"),
		z.literal("text-bottom").describe("align bottom with parent font bottom"),
		z.literal("middle").describe("align middle with parent baseline plus half x-height"),
		z.literal("top").describe("align top with line top"),
		z.literal("bottom").describe("align bottom with line bottom"),
	])
	.describe("CSS vertical-align property keyword values");

/**
 * Array of all vertical-align keyword values.
 *
 * @public
 */
export const VERTICAL_ALIGN_KEYWORDS = verticalAlignKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for vertical-align keywords.
 *
 * @public
 */
export type VerticalAlignKeyword = z.infer<typeof verticalAlignKeywordsSchema>;

/**
 * Metadata for vertical-align keyword options.
 *
 * @public
 */
export const verticalAlignKeywordOptions = verticalAlignKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for vertical-align keyword options metadata.
 *
 * @public
 */
export type VerticalAlignKeywordOptions = typeof verticalAlignKeywordOptions;
