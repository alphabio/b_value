// b_path:: src/core/keywords/position-keywords.ts
import { z } from "zod";

/**
 * CSS position keywords.
 *
 * Position keywords specify locations along horizontal and vertical axes.
 * Used extensively in properties like background-position, object-position,
 * transform-origin, and perspective-origin.
 *
 * Keywords can be combined in various ways:
 * - Single keyword: `center` (applies to both axes)
 * - Horizontal + vertical: `left top`, `center bottom`
 * - Edge + offset: `left 10px top 20px`
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position_value}
 *
 * @example
 * ```typescript
 * import { positionKeywordsSchema } from "@/core/keywords/position-keywords";
 *
 * const keyword = positionKeywordsSchema.parse("center"); // "center"
 * ```
 *
 * @public
 */
export const positionKeywordsSchema = z
	.union([
		z.literal("center").describe("centered on both axes (50% 50%)"),
		z.literal("left").describe("left edge (0% on horizontal axis)"),
		z.literal("right").describe("right edge (100% on horizontal axis)"),
		z.literal("top").describe("top edge (0% on vertical axis)"),
		z.literal("bottom").describe("bottom edge (100% on vertical axis)"),
	])
	.describe(
		"Position keywords specify locations along horizontal and vertical axes. " +
			"Used in background-position, object-position, transform-origin, etc.",
	);

/**
 * Array of all position keyword values.
 *
 * @example
 * ```typescript
 * import { POSITION_KEYWORDS } from "@/core/keywords/position-keywords";
 *
 * console.log(POSITION_KEYWORDS);
 * // ["center", "left", "right", "top", "bottom"]
 * ```
 *
 * @public
 */
export const POSITION_KEYWORDS = positionKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for position keywords.
 *
 * @public
 */
export type PositionKeyword = z.infer<typeof positionKeywordsSchema>;

/**
 * Metadata for position keyword options.
 *
 * Provides value and description for each position keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { positionKeywordOptions } from "@/core/keywords/position-keywords";
 *
 * positionKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const positionKeywordOptions = positionKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for position keyword options metadata.
 *
 * @public
 */
export type PositionKeywordOptions = typeof positionKeywordOptions;

/**
 * CSS horizontal edge position keywords.
 *
 * Subset of position keywords that specify horizontal edges.
 * Used in four-value syntax for properties like background-position:
 * `right 10px bottom 20px` (edge + offset pairs)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-position}
 *
 * @example
 * ```typescript
 * import { positionHorizontalEdgeKeywordsSchema } from "@/core/keywords/position-keywords";
 *
 * const edge = positionHorizontalEdgeKeywordsSchema.parse("left"); // "left"
 * ```
 *
 * @public
 */
export const positionHorizontalEdgeKeywordsSchema = z
	.union([z.literal("left").describe("left horizontal edge"), z.literal("right").describe("right horizontal edge")])
	.describe("Horizontal edge position keywords (left, right) for edge+offset syntax.");

/**
 * Array of horizontal edge position keywords.
 *
 * @public
 */
export const POSITION_HORIZONTAL_EDGE_KEYWORDS = positionHorizontalEdgeKeywordsSchema.options.map(
	(option) => option.value,
);

/**
 * TypeScript type for horizontal edge position keywords.
 *
 * @public
 */
export type PositionHorizontalEdgeKeyword = z.infer<typeof positionHorizontalEdgeKeywordsSchema>;

/**
 * CSS vertical edge position keywords.
 *
 * Subset of position keywords that specify vertical edges.
 * Used in four-value syntax for properties like background-position:
 * `right 10px bottom 20px` (edge + offset pairs)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-position}
 *
 * @example
 * ```typescript
 * import { positionVerticalEdgeKeywordsSchema } from "@/core/keywords/position-keywords";
 *
 * const edge = positionVerticalEdgeKeywordsSchema.parse("top"); // "top"
 * ```
 *
 * @public
 */
export const positionVerticalEdgeKeywordsSchema = z
	.union([z.literal("top").describe("top vertical edge"), z.literal("bottom").describe("bottom vertical edge")])
	.describe("Vertical edge position keywords (top, bottom) for edge+offset syntax.");

/**
 * Array of vertical edge position keywords.
 *
 * @public
 */
export const POSITION_VERTICAL_EDGE_KEYWORDS = positionVerticalEdgeKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for vertical edge position keywords.
 *
 * @public
 */
export type PositionVerticalEdgeKeyword = z.infer<typeof positionVerticalEdgeKeywordsSchema>;
