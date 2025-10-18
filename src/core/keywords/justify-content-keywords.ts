// b_path:: src/core/keywords/justify-content-keywords.ts
import { z } from "zod";

/**
 * CSS `justify-content` property keyword values.
 *
 * The justify-content property defines how the browser distributes space between
 * and around content items along the main-axis of a flex container, and the inline
 * axis of a grid container.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content}
 *
 * @example
 * ```typescript
 * import { justifyContentKeywordsSchema } from "../keywords/justify-content-keywords";
 *
 * const keyword = justifyContentKeywordsSchema.parse("space-between");
 * ```
 *
 * @public
 */
export const justifyContentKeywordsSchema = z
	.union([
		z.literal("flex-start").describe("items packed at start of flex direction"),
		z.literal("flex-end").describe("items packed at end of flex direction"),
		z.literal("center").describe("items centered along main axis"),
		z.literal("space-between").describe("items evenly distributed, first/last at edges"),
		z.literal("space-around").describe("items evenly distributed with equal space around"),
		z.literal("space-evenly").describe("items evenly distributed with equal space between"),
		z.literal("start").describe("items packed at start of writing mode direction"),
		z.literal("end").describe("items packed at end of writing mode direction"),
		z.literal("left").describe("items packed toward left edge"),
		z.literal("right").describe("items packed toward right edge"),
	])
	.describe("CSS justify-content property keyword values");

/**
 * Array of all justify-content keyword values.
 *
 * @public
 */
export const JUSTIFY_CONTENT_KEYWORDS = justifyContentKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for justify-content keywords.
 *
 * @public
 */
export type JustifyContentKeyword = z.infer<typeof justifyContentKeywordsSchema>;

/**
 * Metadata for justify-content keyword options.
 *
 * @public
 */
export const justifyContentKeywordOptions = justifyContentKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for justify-content keyword options metadata.
 *
 * @public
 */
export type JustifyContentKeywordOptions = typeof justifyContentKeywordOptions;
