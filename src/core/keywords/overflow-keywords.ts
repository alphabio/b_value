// b_path:: src/core/keywords/overflow-keywords.ts
import { z } from "zod";

/**
 * CSS overflow keyword values.
 *
 * The overflow, overflow-x, and overflow-y properties control what happens when content
 * overflows an element's box. These properties apply to block containers, flex containers,
 * and grid containers.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow}
 * @see {@link https://www.w3.org/TR/css-overflow-3/#overflow-properties}
 *
 * @example
 * ```typescript
 * import { overflowKeywordsSchema } from "@/core/keywords/overflow-keywords";
 *
 * const keyword = overflowKeywordsSchema.parse("hidden");
 * ```
 *
 * @public
 */
export const overflowKeywordsSchema = z
	.union([
		z.literal("visible").describe("content is not clipped and may overflow the element's box"),
		z.literal("hidden").describe("content is clipped and no scrollbars are provided"),
		z.literal("clip").describe("content is clipped at the overflow clip edge, no scrollbars"),
		z.literal("scroll").describe("content is clipped and scrollbars are always shown"),
		z.literal("auto").describe("content is clipped and scrollbars shown only when needed"),
	])
	.describe("CSS overflow property keyword values");

/**
 * Array of all overflow keyword values.
 *
 * @public
 */
export const OVERFLOW_KEYWORDS = overflowKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for overflow keywords.
 *
 * @public
 */
export type OverflowKeyword = z.infer<typeof overflowKeywordsSchema>;

/**
 * Metadata for overflow keyword options.
 *
 * @public
 */
export const overflowKeywordOptions = overflowKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for overflow keyword options metadata.
 *
 * @public
 */
export type OverflowKeywordOptions = typeof overflowKeywordOptions;
