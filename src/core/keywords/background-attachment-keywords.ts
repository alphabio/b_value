// b_path:: src/core/keywords/background-attachment-keywords.ts
import { z } from "zod";

/**
 * CSS background-attachment keywords.
 *
 * The background-attachment property sets whether a background image's position
 * is fixed within the viewport, or scrolls with its containing block.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment}
 *
 * @example
 * ```typescript
 * import { backgroundAttachmentKeywordsSchema } from "../keywords/background-attachment-keywords";
 *
 * const keyword = backgroundAttachmentKeywordsSchema.parse("fixed"); // "fixed"
 * ```
 *
 * @public
 */
export const backgroundAttachmentKeywordsSchema = z
	.union([
		z
			.literal("scroll")
			.describe("background is fixed relative to the element itself and does not scroll with its contents"),
		z.literal("fixed").describe("background is fixed relative to the viewport"),
		z.literal("local").describe("background is fixed relative to the element's contents and scrolls with them"),
	])
	.describe(
		"Background attachment keywords control whether a background image scrolls with the page or is fixed. " +
			"Used in the background-attachment property.",
	);

/**
 * Array of all background-attachment keyword values.
 *
 * @example
 * ```typescript
 * import { BACKGROUND_ATTACHMENT_KEYWORDS } from "../keywords/background-attachment-keywords";
 *
 * console.log(BACKGROUND_ATTACHMENT_KEYWORDS); // ["scroll", "fixed", "local"]
 * ```
 *
 * @public
 */
export const BACKGROUND_ATTACHMENT_KEYWORDS = backgroundAttachmentKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for background-attachment keywords.
 *
 * @public
 */
export type BackgroundAttachmentKeyword = z.infer<typeof backgroundAttachmentKeywordsSchema>;

/**
 * Metadata for background-attachment keyword options.
 *
 * Provides value and description for each background-attachment keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { backgroundAttachmentKeywordOptions } from "../keywords/background-attachment-keywords";
 *
 * backgroundAttachmentKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const backgroundAttachmentKeywordOptions = backgroundAttachmentKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for background-attachment keyword options metadata.
 *
 * @public
 */
export type BackgroundAttachmentKeywordOptions = typeof backgroundAttachmentKeywordOptions;
