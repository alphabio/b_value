// b_path:: src/core/keywords/justify-self-keywords.ts
import { z } from "zod";

/**
 * CSS `justify-self` property keyword values.
 *
 * The justify-self property sets the way a box is justified inside its alignment container
 * along the appropriate axis. In grid layout, it controls the inline axis (horizontal)
 * alignment of a single item within its grid area.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self}
 *
 * @example
 * ```typescript
 * import { justifySelfKeywordsSchema } from "../keywords/justify-self-keywords";
 *
 * const keyword = justifySelfKeywordsSchema.parse("center");
 * ```
 *
 * @public
 */
export const justifySelfKeywordsSchema = z
	.union([
		z.literal("auto").describe("uses parent's justify-items value"),
		z.literal("start").describe("item aligned at start of writing mode direction"),
		z.literal("end").describe("item aligned at end of writing mode direction"),
		z.literal("center").describe("item centered along inline axis"),
		z.literal("stretch").describe("item stretched to fill grid area"),
		z.literal("baseline").describe("item aligned along its baseline"),
		z.literal("flex-start").describe("item aligned at start of flex direction"),
		z.literal("flex-end").describe("item aligned at end of flex direction"),
		z.literal("self-start").describe("item aligned at start of its own writing mode"),
		z.literal("self-end").describe("item aligned at end of its own writing mode"),
		z.literal("left").describe("item aligned to left edge"),
		z.literal("right").describe("item aligned to right edge"),
	])
	.describe("CSS justify-self property keyword values");

/**
 * Array of all justify-self keyword values.
 *
 * @public
 */
export const JUSTIFY_SELF_KEYWORDS = justifySelfKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for justify-self keywords.
 *
 * @public
 */
export type JustifySelfKeyword = z.infer<typeof justifySelfKeywordsSchema>;

/**
 * Metadata for justify-self keyword options.
 *
 * @public
 */
export const justifySelfKeywordOptions = justifySelfKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for justify-self keyword options metadata.
 *
 * @public
 */
export type JustifySelfKeywordOptions = typeof justifySelfKeywordOptions;
