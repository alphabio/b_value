// b_path:: src/core/keywords/text-decoration-line-keywords.ts
import { z } from "zod";

/**
 * CSS text-decoration-line keyword values.
 *
 * The text-decoration-line property sets the kind of decoration that is used on text
 * in an element, such as an underline or overline.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line}
 *
 * @example
 * ```typescript
 * import { textDecorationLineKeywordsSchema } from "../keywords/text-decoration-line-keywords";
 *
 * const keyword = textDecorationLineKeywordsSchema.parse("underline");
 * ```
 *
 * @public
 */
export const textDecorationLineKeywordsSchema = z
	.union([
		z.literal("none").describe("no text decoration"),
		z.literal("underline").describe("line below the text"),
		z.literal("overline").describe("line above the text"),
		z.literal("line-through").describe("line through the middle of the text"),
	])
	.describe("CSS text-decoration-line property keyword values");

/**
 * Array of all text-decoration-line keyword values.
 *
 * @public
 */
export const TEXT_DECORATION_LINE_KEYWORDS = textDecorationLineKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for text-decoration-line keywords.
 *
 * @public
 */
export type TextDecorationLineKeyword = z.infer<typeof textDecorationLineKeywordsSchema>;

/**
 * Metadata for text-decoration-line keyword options.
 *
 * @public
 */
export const textDecorationLineKeywordOptions = textDecorationLineKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for text-decoration-line keyword options metadata.
 *
 * @public
 */
export type TextDecorationLineKeywordOptions = typeof textDecorationLineKeywordOptions;
