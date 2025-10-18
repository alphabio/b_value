// b_path:: src/core/keywords/flex-wrap-keywords.ts
import { z } from "zod";

/**
 * CSS `flex-wrap` property keyword values.
 *
 * The flex-wrap property sets whether flex items are forced onto one line
 * or can wrap onto multiple lines.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap}
 *
 * @example
 * ```typescript
 * import { flexWrapKeywordsSchema } from "@/core/keywords/flex-wrap-keywords";
 *
 * const keyword = flexWrapKeywordsSchema.parse("wrap");
 * ```
 *
 * @public
 */
export const flexWrapKeywordsSchema = z
	.union([
		z.literal("nowrap").describe("items laid out in single line (may overflow)"),
		z.literal("wrap").describe("items wrap onto multiple lines top to bottom"),
		z.literal("wrap-reverse").describe("items wrap onto multiple lines bottom to top"),
	])
	.describe("CSS flex-wrap property keyword values");

/**
 * Array of all flex-wrap keyword values.
 *
 * @public
 */
export const FLEX_WRAP_KEYWORDS = flexWrapKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for flex-wrap keywords.
 *
 * @public
 */
export type FlexWrapKeyword = z.infer<typeof flexWrapKeywordsSchema>;

/**
 * Metadata for flex-wrap keyword options.
 *
 * @public
 */
export const flexWrapKeywordOptions = flexWrapKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for flex-wrap keyword options metadata.
 *
 * @public
 */
export type FlexWrapKeywordOptions = typeof flexWrapKeywordOptions;
