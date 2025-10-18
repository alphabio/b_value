// b_path:: src/core/keywords/content-distribution-keywords.ts
import { z } from "zod";

/**
 * CSS content distribution keywords.
 *
 * Content distribution values control how extra space is distributed
 * among flex items or grid tracks within their alignment container.
 *
 * Used in:
 * - `justify-content` - Alignment along main axis
 * - `align-content` - Alignment along cross axis
 * - `place-content` - Shorthand for both axes
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Alignment#content_distribution}
 *
 * @example
 * ```typescript
 * import { contentDistributionKeywordsSchema } from "@/core/keywords/content-distribution-keywords";
 *
 * const keyword = contentDistributionKeywordsSchema.parse("space-between");
 * ```
 *
 * @public
 */
export const contentDistributionKeywordsSchema = z
	.union([
		z.literal("space-between").describe("evenly distributes items with first/last flush to edges"),
		z.literal("space-around").describe("evenly distributes items with half-size space on ends"),
		z.literal("space-evenly").describe("evenly distributes items with full-size space on ends"),
		z.literal("stretch").describe("grows items equally to fill container"),
	])
	.describe(
		"Content distribution values control how extra space is distributed among alignment subjects. " +
			"Used in justify-content, align-content, and place-content properties.",
	);

/**
 * Array of all content distribution keyword values.
 *
 * @example
 * ```typescript
 * import { CONTENT_DISTRIBUTION_KEYWORDS } from "@/core/keywords/content-distribution-keywords";
 *
 * console.log(CONTENT_DISTRIBUTION_KEYWORDS);
 * // ["space-between", "space-around", "space-evenly", "stretch"]
 * ```
 *
 * @public
 */
export const CONTENT_DISTRIBUTION_KEYWORDS = contentDistributionKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for content distribution keywords.
 *
 * @public
 */
export type ContentDistributionKeyword = z.infer<typeof contentDistributionKeywordsSchema>;

/**
 * Metadata for content distribution keyword options.
 *
 * Provides value and description for each keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { contentDistributionKeywordOptions } from "@/core/keywords/content-distribution-keywords";
 *
 * contentDistributionKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const contentDistributionKeywordOptions = contentDistributionKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for content distribution keyword options metadata.
 *
 * @public
 */
export type ContentDistributionKeywordOptions = typeof contentDistributionKeywordOptions;
