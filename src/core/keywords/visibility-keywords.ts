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
export const visibilityKeywordsSchema = z.enum(["visible", "hidden", "collapse"], {
	error: () => ({
		message: "Expected visible | hidden | collapse",
	}),
});

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
export const VISIBILITY_KEYWORDS = visibilityKeywordsSchema.options;

/**
 * TypeScript type for visibility keywords.
 *
 * @public
 */
export type VisibilityKeyword = z.infer<typeof visibilityKeywordsSchema>;

/**
 * Descriptions for visibility keywords.
 *
 * @internal
 */
const VISIBILITY_DESCRIPTIONS: Record<VisibilityKeyword, string> = {
	visible: "element is visible",
	hidden: "element is invisible but still takes up space",
	collapse: "for table elements, removes row/column without affecting layout",
};

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
export const visibilityKeywordOptions = VISIBILITY_KEYWORDS.map((value) => ({
	value,
	description: VISIBILITY_DESCRIPTIONS[value],
}));

/**
 * Type for visibility keyword options metadata.
 *
 * @public
 */
export type VisibilityKeywordOptions = typeof visibilityKeywordOptions;
