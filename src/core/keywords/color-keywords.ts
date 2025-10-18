// b_path:: src/core/keywords/color-keywords.ts
import { z } from "zod";

/**
 * CSS special color keywords.
 *
 * These keywords have special meaning in CSS color contexts.
 * - `transparent`: Fully transparent color
 * - `currentcolor`: Uses the current text color
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
 * @public
 */
export const specialColorKeywordsSchema = z
	.union([
		z.literal("transparent").describe("Fully transparent color"),
		z.literal("currentcolor").describe("Uses the current text color value"),
	])
	.describe("CSS special color keywords");

/**
 * Array of all special color keyword values.
 *
 * @example
 * ```typescript
 * import { SPECIAL_COLOR_KEYWORDS } from "../keywords/color-keywords";
 *
 * console.log(SPECIAL_COLOR_KEYWORDS); // ["transparent", "currentcolor"]
 * ```
 *
 * @public
 */
export const SPECIAL_COLOR_KEYWORDS = specialColorKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for special color keywords.
 *
 * @public
 */
export type SpecialColorKeyword = z.infer<typeof specialColorKeywordsSchema>;

/**
 * Metadata for special color keyword options.
 *
 * Provides value and description for each special color keyword,
 * useful for Studio UI generation and documentation.
 *
 * @example
 * ```typescript
 * import { specialColorKeywordOptions } from "../keywords/color-keywords";
 *
 * specialColorKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const specialColorKeywordOptions = specialColorKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for special color keyword options metadata.
 *
 * @public
 */
export type SpecialColorKeywordOptions = typeof specialColorKeywordOptions;
