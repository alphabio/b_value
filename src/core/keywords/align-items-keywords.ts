// b_path:: src/core/keywords/align-items-keywords.ts
import { z } from "zod";

/**
 * CSS `align-items` property keyword values.
 *
 * The align-items property sets the align-self value on all direct children as a group.
 * In flexbox, it controls the alignment of items on the cross axis. In grid layout,
 * it controls the alignment of items on the block axis within their grid area.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-items}
 *
 * @example
 * ```typescript
 * import { alignItemsKeywordsSchema } from "@/core/keywords/align-items-keywords";
 *
 * const keyword = alignItemsKeywordsSchema.parse("center");
 * ```
 *
 * @public
 */
export const alignItemsKeywordsSchema = z
	.union([
		z.literal("flex-start").describe("items aligned at start of cross axis"),
		z.literal("flex-end").describe("items aligned at end of cross axis"),
		z.literal("center").describe("items centered along cross axis"),
		z.literal("baseline").describe("items aligned along their baselines"),
		z.literal("stretch").describe("items stretched to fill container"),
		z.literal("start").describe("items aligned at start of writing mode direction"),
		z.literal("end").describe("items aligned at end of writing mode direction"),
		z.literal("self-start").describe("items aligned at start of their own writing mode"),
		z.literal("self-end").describe("items aligned at end of their own writing mode"),
	])
	.describe("CSS align-items property keyword values");

/**
 * Array of all align-items keyword values.
 *
 * @public
 */
export const ALIGN_ITEMS_KEYWORDS = alignItemsKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for align-items keywords.
 *
 * @public
 */
export type AlignItemsKeyword = z.infer<typeof alignItemsKeywordsSchema>;

/**
 * Metadata for align-items keyword options.
 *
 * @public
 */
export const alignItemsKeywordOptions = alignItemsKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for align-items keyword options metadata.
 *
 * @public
 */
export type AlignItemsKeywordOptions = typeof alignItemsKeywordOptions;
