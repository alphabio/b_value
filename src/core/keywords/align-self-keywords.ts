// b_path:: src/core/keywords/align-self-keywords.ts
import { z } from "zod";

/**
 * CSS `align-self` property keyword values.
 *
 * The align-self property overrides a grid or flex item's align-items value.
 * In grid layout, it aligns the item inside the grid area on the block axis (vertical).
 * In flexbox, it aligns the item on the cross axis.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-self}
 *
 * @example
 * ```typescript
 * import { alignSelfKeywordsSchema } from "@/core/keywords/align-self-keywords";
 *
 * const keyword = alignSelfKeywordsSchema.parse("center");
 * ```
 *
 * @public
 */
export const alignSelfKeywordsSchema = z
	.union([
		z.literal("auto").describe("uses parent's align-items value"),
		z.literal("start").describe("item aligned at start of writing mode direction"),
		z.literal("end").describe("item aligned at end of writing mode direction"),
		z.literal("center").describe("item centered along block axis"),
		z.literal("stretch").describe("item stretched to fill container"),
		z.literal("baseline").describe("item aligned along its baseline"),
		z.literal("flex-start").describe("item aligned at start of flex direction"),
		z.literal("flex-end").describe("item aligned at end of flex direction"),
		z.literal("self-start").describe("item aligned at start of its own writing mode"),
		z.literal("self-end").describe("item aligned at end of its own writing mode"),
	])
	.describe("CSS align-self property keyword values");

/**
 * Array of all align-self keyword values.
 *
 * @public
 */
export const ALIGN_SELF_KEYWORDS = alignSelfKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for align-self keywords.
 *
 * @public
 */
export type AlignSelfKeyword = z.infer<typeof alignSelfKeywordsSchema>;

/**
 * Metadata for align-self keyword options.
 *
 * @public
 */
export const alignSelfKeywordOptions = alignSelfKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for align-self keyword options metadata.
 *
 * @public
 */
export type AlignSelfKeywordOptions = typeof alignSelfKeywordOptions;
