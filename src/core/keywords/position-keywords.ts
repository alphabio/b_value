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
export const positionKeywordsSchema = z.enum(["center", "left", "right", "top", "bottom"], {
	error: () => ({
		message: "Expected center | left | right | top | bottom",
	}),
});

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
export const POSITION_KEYWORDS = positionKeywordsSchema.options;

/**
 * TypeScript type for position keywords.
 *
 * @public
 */
export type PositionKeyword = z.infer<typeof positionKeywordsSchema>;

/**
 * Descriptions for position keywords.
 *
 * @internal
 */
const POSITION_DESCRIPTIONS: Record<PositionKeyword, string> = {
	center: "centered on both axes (50% 50%)",
	left: "left edge (0% on horizontal axis)",
	right: "right edge (100% on horizontal axis)",
	top: "top edge (0% on vertical axis)",
	bottom: "bottom edge (100% on vertical axis)",
};

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
export const positionKeywordOptions = POSITION_KEYWORDS.map((value) => ({
	value,
	description: POSITION_DESCRIPTIONS[value],
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
export const positionHorizontalEdgeKeywordsSchema = z.enum(["left", "right"], {
	error: () => ({
		message: "Expected left | right",
	}),
});

/**
 * Array of horizontal edge position keywords.
 *
 * @public
 */
export const POSITION_HORIZONTAL_EDGE_KEYWORDS = positionHorizontalEdgeKeywordsSchema.options;

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
export const positionVerticalEdgeKeywordsSchema = z.enum(["top", "bottom"], {
	error: () => ({
		message: "Expected top | bottom",
	}),
});

/**
 * Array of vertical edge position keywords.
 *
 * @public
 */
export const POSITION_VERTICAL_EDGE_KEYWORDS = positionVerticalEdgeKeywordsSchema.options;

/**
 * TypeScript type for vertical edge position keywords.
 *
 * @public
 */
export type PositionVerticalEdgeKeyword = z.infer<typeof positionVerticalEdgeKeywordsSchema>;
