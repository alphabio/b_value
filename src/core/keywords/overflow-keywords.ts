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
export const overflowKeywordsSchema = z.enum(["visible", "hidden", "clip", "scroll", "auto"], {
	error: () => ({ message: "Expected visible | hidden | clip | scroll | auto" }),
});

/**
 * Array of all overflow keyword values.
 *
 * @public
 */
export const OVERFLOW_KEYWORDS = overflowKeywordsSchema.options;

/**
 * TypeScript type for overflow keywords.
 *
 * @public
 */
export type OverflowKeyword = z.infer<typeof overflowKeywordsSchema>;

/**
 * Descriptions for overflow keywords.
 *
 * @internal
 */
const OVERFLOW_DESCRIPTIONS: Record<OverflowKeyword, string> = {
	visible: "content is not clipped and may overflow the element's box",
	hidden: "content is clipped and no scrollbars are provided",
	clip: "content is clipped at the overflow clip edge, no scrollbars",
	scroll: "content is clipped and scrollbars are always shown",
	auto: "content is clipped and scrollbars shown only when needed",
};

/**
 * Metadata for overflow keyword options.
 *
 * @public
 */
export const overflowKeywordOptions = OVERFLOW_KEYWORDS.map((value) => ({
	value,
	description: OVERFLOW_DESCRIPTIONS[value],
}));

/**
 * Type for overflow keyword options metadata.
 *
 * @public
 */
export type OverflowKeywordOptions = typeof overflowKeywordOptions;
