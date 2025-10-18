// b_path:: src/core/keywords/content-position-keywords.ts
import { z } from "zod";

/**
 * CSS content position keywords.
 *
 * Content position values align the box's contents within itself
 * along a single axis (main or cross axis for flex, inline or block for grid).
 *
 * Used in:
 * - `justify-content` - Alignment along main/inline axis
 * - `align-content` - Alignment along cross/block axis
 * - `place-content` - Shorthand for both axes
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Alignment#positional_alignment}
 *
 * @example
 * ```typescript
 * import { contentPositionKeywordsSchema } from "@/core/keywords/content-position-keywords";
 *
 * const keyword = contentPositionKeywordsSchema.parse("center");
 * ```
 *
 * @public
 */
export const contentPositionKeywordsSchema = z
	.union([
		z.literal("center").describe("centers the alignment subject within its alignment container"),
		z.literal("start").describe("aligns the alignment subject flush with the alignment container's start edge"),
		z.literal("end").describe("aligns the alignment subject flush with the alignment container's end edge"),
		z.literal("flex-start").describe("aligns flush with flex container's main-start or cross-start side"),
		z.literal("flex-end").describe("aligns flush with flex container's main-end or cross-end side"),
	])
	.describe(
		"Content position values align the box's contents within itself. " +
			"Used in justify-content, align-content, and place-content properties.",
	);

/**
 * Array of all content position keyword values.
 *
 * @example
 * ```typescript
 * import { CONTENT_POSITION_KEYWORDS } from "@/core/keywords/content-position-keywords";
 *
 * console.log(CONTENT_POSITION_KEYWORDS);
 * // ["center", "start", "end", "flex-start", "flex-end"]
 * ```
 *
 * @public
 */
export const CONTENT_POSITION_KEYWORDS = contentPositionKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for content position keywords.
 *
 * @public
 */
export type ContentPositionKeyword = z.infer<typeof contentPositionKeywordsSchema>;

/**
 * Metadata for content position keyword options.
 *
 * Provides value and description for each keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { contentPositionKeywordOptions } from "@/core/keywords/content-position-keywords";
 *
 * contentPositionKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const contentPositionKeywordOptions = contentPositionKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for content position keyword options metadata.
 *
 * @public
 */
export type ContentPositionKeywordOptions = typeof contentPositionKeywordOptions;
