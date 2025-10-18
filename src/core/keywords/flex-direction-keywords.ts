// b_path:: src/core/keywords/flex-direction-keywords.ts
import { z } from "zod";

/**
 * CSS `flex-direction` property keyword values.
 *
 * The flex-direction property sets how flex items are placed in the flex container,
 * defining the main axis and the direction (normal or reversed).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction}
 *
 * @example
 * ```typescript
 * import { flexDirectionKeywordsSchema } from "../keywords/flex-direction-keywords";
 *
 * const keyword = flexDirectionKeywordsSchema.parse("row");
 * ```
 *
 * @public
 */
export const flexDirectionKeywordsSchema = z
	.union([
		z.literal("row").describe("horizontal direction in left-to-right layout"),
		z.literal("row-reverse").describe("horizontal direction reversed"),
		z.literal("column").describe("vertical direction from top to bottom"),
		z.literal("column-reverse").describe("vertical direction reversed"),
	])
	.describe("CSS flex-direction property keyword values");

/**
 * Array of all flex-direction keyword values.
 *
 * @public
 */
export const FLEX_DIRECTION_KEYWORDS = flexDirectionKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for flex-direction keywords.
 *
 * @public
 */
export type FlexDirectionKeyword = z.infer<typeof flexDirectionKeywordsSchema>;

/**
 * Metadata for flex-direction keyword options.
 *
 * @public
 */
export const flexDirectionKeywordOptions = flexDirectionKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for flex-direction keyword options metadata.
 *
 * @public
 */
export type FlexDirectionKeywordOptions = typeof flexDirectionKeywordOptions;
