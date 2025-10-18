// b_path:: src/core/keywords/sizing-keywords.ts
import { z } from "zod";

/**
 * CSS sizing keywords for properties like `background-size`, `object-fit`, etc.
 *
 * These keywords control how content is sized to fit its container.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-size}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit}
 *
 * @example
 * ```typescript
 * import { sizingKeywordsSchema } from "../keywords/sizing-keywords";
 *
 * // Parse and validate
 * const size = sizingKeywordsSchema.parse("cover"); // "cover"
 *
 * // Use in background-size
 * const backgroundSize = "contain";
 * ```
 *
 * @public
 */
export const sizingKeywordsSchema = z
	.union([
		z.literal("cover").describe("scale content to cover container (may crop to maintain aspect ratio)"),
		z
			.literal("contain")
			.describe("scale content to fit inside container (maintains aspect ratio, may have empty space)"),
	])
	.describe("sizing keywords that control how content is sized to fit its container");

/**
 * TypeScript type for sizing keywords.
 *
 * @public
 */
export type SizingKeyword = z.infer<typeof sizingKeywordsSchema>;

/**
 * Array of all valid sizing keyword values.
 *
 * Extracted from the schema for runtime iteration.
 *
 * @example
 * ```typescript
 * import { SIZING_KEYWORDS } from "../keywords/sizing-keywords";
 *
 * // Iterate over keywords
 * SIZING_KEYWORDS.forEach(keyword => {
 *   console.log(keyword); // "cover", "contain"
 * });
 *
 * // Check if value is valid
 * if (SIZING_KEYWORDS.includes(input)) {
 *   // Valid sizing keyword
 * }
 * ```
 *
 * @public
 */
export const SIZING_KEYWORDS = sizingKeywordsSchema.options.map((option) => option.value);

/**
 * Metadata for sizing keywords including descriptions.
 *
 * Provides both value and description for each keyword option,
 * useful for generating Studio UI select menus or documentation.
 *
 * @example
 * ```typescript
 * import { sizingKeywordOptions } from "../keywords/sizing-keywords";
 *
 * // Generate UI options
 * sizingKeywordOptions.forEach(({ value, description }) => {
 *   <Option value={value} tooltip={description} />
 * });
 * ```
 *
 * @public
 */
export const sizingKeywordOptions = sizingKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for sizing keyword options metadata array.
 *
 * @public
 */
export type SizingKeywordOptions = typeof sizingKeywordOptions;
