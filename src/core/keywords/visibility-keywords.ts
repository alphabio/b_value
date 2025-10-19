// b_path:: src/core/keywords/visibility-keywords.ts
import { z } from "zod";

/**
 * CSS visibility keywords.
 *
 * The visibility property controls whether an element is visible or hidden.
 * Unlike display: none, visibility: hidden elements still take up space in the layout.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
 *
 * @example
 * ```typescript
 * import { visibilityKeywordsSchema } from "@/core/keywords/visibility-keywords";
 *
 * const keyword = visibilityKeywordsSchema.parse("hidden"); // "hidden"
 * ```
 *
 * @public
 */
export const visibilityKeywordsSchema = z
	.union([
		z.literal("visible").describe("element is visible"),
		z.literal("hidden").describe("element is invisible but still takes up space"),
		z.literal("collapse").describe("for table elements, removes row/column without affecting layout"),
	])
	.describe("CSS visibility property values that control element visibility");

/**
 * Array of all visibility keyword values.
 *
 * @example
 * ```typescript
 * import { VISIBILITY_KEYWORDS } from "@/core/keywords/visibility-keywords";
 *
 * console.log(VISIBILITY_KEYWORDS); // ["visible", "hidden", "collapse"]
 * ```
 *
 * @public
 */
export const VISIBILITY_KEYWORDS = visibilityKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for visibility keywords.
 *
 * @public
 */
export type VisibilityKeyword = z.infer<typeof visibilityKeywordsSchema>;

/**
 * Metadata for visibility keyword options.
 *
 * Provides value and description for each visibility keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { visibilityKeywordOptions } from "@/core/keywords/visibility-keywords";
 *
 * visibilityKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const visibilityKeywordOptions = visibilityKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for visibility keyword options metadata.
 *
 * @public
 */
export type VisibilityKeywordOptions = typeof visibilityKeywordOptions;
