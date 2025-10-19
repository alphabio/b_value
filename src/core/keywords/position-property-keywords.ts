// b_path:: src/core/keywords/position-property-keywords.ts
import { z } from "zod";

/**
 * CSS position property keyword values.
 *
 * The position property sets how an element is positioned in a document.
 * The top, right, bottom, and left properties determine the final location
 * of positioned elements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position}
 * @see {@link https://www.w3.org/TR/css-position-3/#position-property}
 *
 * @example
 * ```typescript
 * import { positionPropertyKeywordsSchema } from "@/core/keywords/position-property-keywords";
 *
 * const keyword = positionPropertyKeywordsSchema.parse("absolute");
 * ```
 *
 * @public
 */
export const positionPropertyKeywordsSchema = z
	.union([
		z.literal("static").describe("positioned according to normal flow (default)"),
		z.literal("relative").describe("positioned relative to its normal position"),
		z.literal("absolute").describe("positioned relative to nearest positioned ancestor"),
		z.literal("fixed").describe("positioned relative to the viewport"),
		z.literal("sticky").describe("positioned based on scroll position (hybrid of relative and fixed)"),
	])
	.describe("CSS position property keyword values");

/**
 * Array of all position property keyword values.
 *
 * @public
 */
export const POSITION_PROPERTY_KEYWORDS = positionPropertyKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for position property keywords.
 *
 * @public
 */
export type PositionPropertyKeyword = z.infer<typeof positionPropertyKeywordsSchema>;

/**
 * Metadata for position property keyword options.
 *
 * @public
 */
export const positionPropertyKeywordOptions = positionPropertyKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for position property keyword options metadata.
 *
 * @public
 */
export type PositionPropertyKeywordOptions = typeof positionPropertyKeywordOptions;
