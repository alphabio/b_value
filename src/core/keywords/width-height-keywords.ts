// b_path:: src/core/keywords/width-height-keywords.ts
import { z } from "zod";

/**
 * CSS width/height intrinsic sizing keywords.
 *
 * These keywords represent intrinsic sizes based on content.
 * Per CSS Sizing Module Level 3 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/width}
 * @see {@link https://www.w3.org/TR/css-sizing-3/#sizing-values}
 *
 * @example
 * ```typescript
 * import { widthHeightKeywordsSchema } from "@/core/keywords/width-height-keywords";
 *
 * const size = widthHeightKeywordsSchema.parse("min-content");
 * ```
 *
 * @public
 */
export const widthHeightKeywordsSchema = z
	.union([
		z.literal("min-content").describe("intrinsic minimum width/height"),
		z.literal("max-content").describe("intrinsic preferred width/height"),
		z.literal("fit-content").describe("use available space but not more than max-content"),
	])
	.describe("intrinsic sizing keywords for width/height properties");

/**
 * TypeScript type for width/height keywords.
 *
 * @public
 */
export type WidthHeightKeyword = z.infer<typeof widthHeightKeywordsSchema>;

/**
 * Array of all valid width/height keyword values.
 *
 * @public
 */
export const WIDTH_HEIGHT_KEYWORDS = widthHeightKeywordsSchema.options.map((option) => option.value);
