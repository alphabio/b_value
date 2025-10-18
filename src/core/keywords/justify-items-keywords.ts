// b_path:: src/core/keywords/justify-items-keywords.ts
import { z } from "zod";

/**
 * CSS `justify-items` property keyword values.
 *
 * The justify-items property defines the default justify-self for all items of the box,
 * giving them all a default way of justifying each box along the appropriate axis.
 * In grid layout, it controls the inline axis (horizontal) alignment of items within their grid area.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items}
 *
 * @example
 * ```typescript
 * import { justifyItemsKeywordsSchema } from "../keywords/justify-items-keywords";
 *
 * const keyword = justifyItemsKeywordsSchema.parse("center");
 * ```
 *
 * @public
 */
export const justifyItemsKeywordsSchema = z
	.union([
		z.literal("start").describe("items aligned at start of writing mode direction"),
		z.literal("end").describe("items aligned at end of writing mode direction"),
		z.literal("center").describe("items centered along inline axis"),
		z.literal("stretch").describe("items stretched to fill grid area"),
		z.literal("baseline").describe("items aligned along their baselines"),
		z.literal("flex-start").describe("items aligned at start of flex direction"),
		z.literal("flex-end").describe("items aligned at end of flex direction"),
		z.literal("self-start").describe("items aligned at start of their own writing mode"),
		z.literal("self-end").describe("items aligned at end of their own writing mode"),
		z.literal("left").describe("items aligned to left edge"),
		z.literal("right").describe("items aligned to right edge"),
	])
	.describe("CSS justify-items property keyword values");

/**
 * Array of all justify-items keyword values.
 *
 * @public
 */
export const JUSTIFY_ITEMS_KEYWORDS = justifyItemsKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for justify-items keywords.
 *
 * @public
 */
export type JustifyItemsKeyword = z.infer<typeof justifyItemsKeywordsSchema>;

/**
 * Metadata for justify-items keyword options.
 *
 * @public
 */
export const justifyItemsKeywordOptions = justifyItemsKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for justify-items keyword options metadata.
 *
 * @public
 */
export type JustifyItemsKeywordOptions = typeof justifyItemsKeywordOptions;
