// b_path:: src/core/keywords/align-content-keywords.ts
import { z } from "zod";

/**
 * CSS `align-content` property keyword values.
 *
 * The align-content property sets the distribution of space between and around
 * content items along a flexbox's cross-axis or a grid's block axis.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-content}
 *
 * @example
 * ```typescript
 * import { alignContentKeywordsSchema } from "@/core/keywords/align-content-keywords";
 *
 * const keyword = alignContentKeywordsSchema.parse("space-between");
 * ```
 *
 * @public
 */
export const alignContentKeywordsSchema = z
	.union([
		z.literal("flex-start").describe("items packed at start of cross axis"),
		z.literal("flex-end").describe("items packed at end of cross axis"),
		z.literal("center").describe("items centered along cross axis"),
		z.literal("space-between").describe("items evenly distributed, first/last at edges"),
		z.literal("space-around").describe("items evenly distributed with equal space around"),
		z.literal("space-evenly").describe("items evenly distributed with equal space between"),
		z.literal("stretch").describe("items stretched to fill container"),
		z.literal("start").describe("items packed at start of writing mode direction"),
		z.literal("end").describe("items packed at end of writing mode direction"),
	])
	.describe("CSS align-content property keyword values");

/**
 * Array of all align-content keyword values.
 *
 * @public
 */
export const ALIGN_CONTENT_KEYWORDS = alignContentKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for align-content keywords.
 *
 * @public
 */
export type AlignContentKeyword = z.infer<typeof alignContentKeywordsSchema>;

/**
 * Metadata for align-content keyword options.
 *
 * @public
 */
export const alignContentKeywordOptions = alignContentKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for align-content keyword options metadata.
 *
 * @public
 */
export type AlignContentKeywordOptions = typeof alignContentKeywordOptions;
