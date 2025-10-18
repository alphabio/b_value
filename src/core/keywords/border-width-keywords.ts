// b_path:: src/core/keywords/border-width-keywords.ts
import { z } from "zod";
import type * as Type from "../types";

/**
 * CSS border-width keywords.
 *
 * Predefined border width values that correspond to specific thickness levels.
 * These keywords provide a convenient way to specify common border widths without
 * needing to specify exact measurements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-width}
 *
 * @example
 * ```typescript
 * import { borderWidthKeywordsSchema } from "../keywords/border-width-keywords";
 *
 * const keyword = borderWidthKeywordsSchema.parse("medium"); // "medium"
 * ```
 *
 * @public
 */
export const borderWidthKeywordsSchema = z
	.union([
		z.literal("thin").describe("A thin border (typically 1px)"),
		z.literal("medium").describe("A medium border (typically 3px)"),
		z.literal("thick").describe("A thick border (typically 5px)"),
	])
	.describe("Predefined border width keywords");

/**
 * Array of all border-width keyword values.
 *
 * @example
 * ```typescript
 * import { BORDER_WIDTH_KEYWORDS } from "../keywords/border-width-keywords";
 *
 * console.log(BORDER_WIDTH_KEYWORDS); // ["thin", "medium", "thick"]
 * ```
 *
 * @public
 */
export const BORDER_WIDTH_KEYWORDS = borderWidthKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for border-width keywords.
 *
 * @public
 */
export type BorderWidthKeyword = z.infer<typeof borderWidthKeywordsSchema>;

/**
 * TypeScript type for border-width values (keywords or length).
 *
 * @public
 */
export type BorderWidthValue = z.infer<typeof borderWidthKeywordsSchema> | Type.Length;

/**
 * Metadata for border-width keyword options.
 *
 * Provides value and description for each border-width keyword,
 * useful for Studio UI generation and documentation.
 *
 * @example
 * ```typescript
 * import { borderWidthKeywordOptions } from "../keywords/border-width-keywords";
 *
 * borderWidthKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const borderWidthKeywordOptions = borderWidthKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for border-width keyword options metadata.
 *
 * @public
 */
export type BorderWidthKeywordOptions = typeof borderWidthKeywordOptions;
