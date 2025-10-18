// b_path:: src/core/keywords/repeat-keywords.ts
import { z } from "zod";

/**
 * CSS background-repeat single value keywords.
 *
 * These keywords control how background images repeat along both axes.
 * Used in the single-value syntax of background-repeat.
 *
 * - `repeat`: Images repeat in both directions (tiles to fill area)
 * - `repeat-x`: Images repeat horizontally only (shorthand for `repeat no-repeat`)
 * - `repeat-y`: Images repeat vertically only (shorthand for `no-repeat repeat`)
 * - `no-repeat`: Images don't repeat (displayed once)
 * - `space`: Images repeat with spacing between them to fill area exactly
 * - `round`: Images repeat and scale to fill area without clipping
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat}
 *
 * @example
 * ```typescript
 * import { repeatKeywordsSchema } from "../keywords/repeat-keywords";
 *
 * const keyword = repeatKeywordsSchema.parse("repeat-x"); // "repeat-x"
 * ```
 *
 * @public
 */
export const repeatKeywordsSchema = z
	.union([
		z.literal("repeat").describe("repeat in both directions"),
		z.literal("repeat-x").describe("repeat horizontally only"),
		z.literal("repeat-y").describe("repeat vertically only"),
		z.literal("no-repeat").describe("do not repeat"),
		z.literal("space").describe("repeat with spacing to fill area exactly"),
		z.literal("round").describe("repeat and scale to fill area without clipping"),
	])
	.describe(
		"Keywords for background-repeat single value syntax. " + "Controls how background images repeat along both axes.",
	);

/**
 * Array of all repeat keyword values.
 *
 * @example
 * ```typescript
 * import { REPEAT_KEYWORDS } from "../keywords/repeat-keywords";
 *
 * console.log(REPEAT_KEYWORDS);
 * // ["repeat", "repeat-x", "repeat-y", "no-repeat", "space", "round"]
 * ```
 *
 * @public
 */
export const REPEAT_KEYWORDS = repeatKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for repeat keywords.
 *
 * @public
 */
export type RepeatKeyword = z.infer<typeof repeatKeywordsSchema>;

/**
 * Metadata for repeat keyword options.
 *
 * Provides value and description for each repeat keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { repeatKeywordOptions } from "../keywords/repeat-keywords";
 *
 * repeatKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const repeatKeywordOptions = repeatKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for repeat keyword options metadata.
 *
 * @public
 */
export type RepeatKeywordOptions = typeof repeatKeywordOptions;

/**
 * CSS background-repeat two-value keywords.
 *
 * Subset of repeat keywords valid in two-value syntax.
 * Used to specify separate horizontal and vertical repeat behavior.
 *
 * Note: `repeat-x` and `repeat-y` are NOT valid in two-value syntax
 * as they are themselves shorthand for two-value combinations:
 * - `repeat-x` = `repeat no-repeat`
 * - `repeat-y` = `no-repeat repeat`
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat}
 *
 * @example
 * ```typescript
 * import { repeatTwoValueKeywordsSchema } from "../keywords/repeat-keywords";
 *
 * // Valid in two-value syntax
 * const horizontal = repeatTwoValueKeywordsSchema.parse("repeat"); // "repeat"
 * const vertical = repeatTwoValueKeywordsSchema.parse("space"); // "space"
 *
 * // Invalid in two-value syntax (would fail validation)
 * // repeatTwoValueKeywordsSchema.parse("repeat-x"); // Error!
 * ```
 *
 * @public
 */
export const repeatTwoValueKeywordsSchema = z
	.union([
		z.literal("repeat").describe("repeat along axis"),
		z.literal("space").describe("repeat with spacing along axis"),
		z.literal("round").describe("repeat and scale along axis"),
		z.literal("no-repeat").describe("do not repeat along axis"),
	])
	.describe(
		"Keywords for background-repeat two-value syntax (horizontal/vertical). " +
			"Note: repeat-x and repeat-y are not valid in two-value syntax.",
	);

/**
 * Array of two-value repeat keywords.
 *
 * @public
 */
export const REPEAT_TWO_VALUE_KEYWORDS = repeatTwoValueKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for two-value repeat keywords.
 *
 * @public
 */
export type RepeatTwoValueKeyword = z.infer<typeof repeatTwoValueKeywordsSchema>;

/**
 * Metadata for two-value repeat keyword options.
 *
 * @public
 */
export const repeatTwoValueKeywordOptions = repeatTwoValueKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for two-value repeat keyword options metadata.
 *
 * @public
 */
export type RepeatTwoValueKeywordOptions = typeof repeatTwoValueKeywordOptions;
