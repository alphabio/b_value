// b_path:: src/core/keywords/display-keywords.ts
import { z } from "zod";

/**
 * CSS display box keywords.
 *
 * Display box values control whether an element generates a box at all.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display#box}
 * @public
 */
export const displayBoxKeywordsSchema = z
	.union([
		z.literal("contents").describe("element doesn't produce a specific box by itself"),
		z.literal("none").describe("turns off the display of an element"),
	])
	.describe("Display box values that control whether an element generates a box");

/**
 * CSS display inside keywords.
 *
 * Display inside values specify the element's inner display type,
 * which defines how its contents are laid out.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display#inside}
 * @public
 */
export const displayInsideKeywordsSchema = z
	.union([
		z.literal("flow").describe("element lays out its contents using flow layout"),
		z.literal("flow-root").describe("generates a block element box that establishes a new block formatting context"),
		z.literal("table").describe("behaves like HTML table elements"),
		z.literal("flex").describe("behaves like a block element and lays out content according to the flexbox model"),
		z.literal("grid").describe("behaves like a block element and lays out content according to the grid model"),
		z
			.literal("ruby")
			.describe("behaves like an inline element and lays out content according to the ruby formatting model"),
	])
	.describe("Display inside values that specify the element's inner display type");

/**
 * CSS display internal keywords.
 *
 * Display internal values are for complex layout models like table and ruby.
 * These elements have internal structures with specific roles.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display#internal}
 * @public
 */
export const displayInternalKeywordsSchema = z
	.union([
		z.literal("table-row-group").describe("behaves like tbody HTML elements"),
		z.literal("table-header-group").describe("behaves like thead HTML elements"),
		z.literal("table-footer-group").describe("behaves like tfoot HTML elements"),
		z.literal("table-row").describe("behaves like tr HTML elements"),
		z.literal("table-cell").describe("behaves like td HTML elements"),
		z.literal("table-column-group").describe("behaves like colgroup HTML elements"),
		z.literal("table-column").describe("behaves like col HTML elements"),
		z.literal("table-caption").describe("behaves like caption HTML elements"),
		z.literal("ruby-base").describe("behaves like rb HTML elements"),
		z.literal("ruby-text").describe("behaves like rt HTML elements"),
		z.literal("ruby-base-container").describe("generated as anonymous boxes"),
		z.literal("ruby-text-container").describe("behaves like rtc HTML elements"),
	])
	.describe("Display internal values for complex layout models like table and ruby");

/**
 * CSS display legacy keywords.
 *
 * Display legacy values are from CSS 2 single-keyword syntax.
 * These combine outer and inner display types in a single keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display#legacy}
 * @public
 */
export const displayLegacyKeywordsSchema = z
	.union([
		z.literal("inline-block").describe("generates a block element box flowed with surrounding content as inline"),
		z.literal("inline-table").describe("behaves like HTML table element but as an inline box"),
		z.literal("inline-flex").describe("behaves like an inline element and lays out content according to flexbox model"),
		z.literal("inline-grid").describe("behaves like an inline element and lays out content according to grid model"),
	])
	.describe("Display legacy values from CSS 2 single-keyword syntax");

/**
 * CSS display outside keywords.
 *
 * Display outside values specify the element's outer display type,
 * which determines how it participates in flow layout.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display#outside}
 * @public
 */
export const displayOutsideKeywordsSchema = z
	.union([
		z.literal("block").describe("generates a block element box with line breaks before and after"),
		z.literal("inline").describe("generates inline element boxes without line breaks"),
		z.literal("run-in").describe("element runs into the next block if possible"),
	])
	.describe("Display outside values that specify the element's outer display type");

/**
 * CSS display list-item keyword.
 *
 * The list-item keyword makes an element behave like a list item,
 * generating both a principal box and a marker box.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display#list-item}
 * @public
 */
export const displayListItemKeywordsSchema = z.literal("list-item").describe("element behaves like a list item");

/**
 * CSS display keywords.
 *
 * The display property controls how an element is displayed in the layout,
 * including its box generation, inner layout type, and outer display type.
 *
 * This schema includes all valid display values:
 * - Box values (contents, none)
 * - Inside values (flow, flex, grid, table, etc.)
 * - Internal values (table-row, table-cell, etc.)
 * - Legacy values (inline-block, inline-flex, etc.)
 * - Outside values (block, inline, run-in)
 * - List item
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display}
 *
 * @example
 * ```typescript
 * import { displayKeywordsSchema } from "@/core/keywords/display-keywords";
 *
 * const keyword = displayKeywordsSchema.parse("flex"); // "flex"
 * ```
 *
 * @public
 */
export const displayKeywordsSchema = z
	.union([
		// Display Box
		z
			.literal("contents")
			.describe("element doesn't produce a specific box by itself"),
		z.literal("none").describe("turns off the display of an element"),

		// Display Inside
		z
			.literal("flow")
			.describe("element lays out its contents using flow layout"),
		z.literal("flow-root").describe("generates a block element box that establishes a new block formatting context"),
		z.literal("table").describe("behaves like HTML table elements"),
		z.literal("flex").describe("behaves like a block element and lays out content according to the flexbox model"),
		z.literal("grid").describe("behaves like a block element and lays out content according to the grid model"),
		z
			.literal("ruby")
			.describe("behaves like an inline element and lays out content according to the ruby formatting model"),

		// Display Internal
		z
			.literal("table-row-group")
			.describe("behaves like tbody HTML elements"),
		z.literal("table-header-group").describe("behaves like thead HTML elements"),
		z.literal("table-footer-group").describe("behaves like tfoot HTML elements"),
		z.literal("table-row").describe("behaves like tr HTML elements"),
		z.literal("table-cell").describe("behaves like td HTML elements"),
		z.literal("table-column-group").describe("behaves like colgroup HTML elements"),
		z.literal("table-column").describe("behaves like col HTML elements"),
		z.literal("table-caption").describe("behaves like caption HTML elements"),
		z.literal("ruby-base").describe("behaves like rb HTML elements"),
		z.literal("ruby-text").describe("behaves like rt HTML elements"),
		z.literal("ruby-base-container").describe("generated as anonymous boxes"),
		z.literal("ruby-text-container").describe("behaves like rtc HTML elements"),

		// Display Legacy
		z
			.literal("inline-block")
			.describe("generates a block element box flowed with surrounding content as inline"),
		z.literal("inline-table").describe("behaves like HTML table element but as an inline box"),
		z.literal("inline-flex").describe("behaves like an inline element and lays out content according to flexbox model"),
		z.literal("inline-grid").describe("behaves like an inline element and lays out content according to grid model"),

		// Display Outside
		z
			.literal("block")
			.describe("generates a block element box with line breaks before and after"),
		z.literal("inline").describe("generates inline element boxes without line breaks"),
		z.literal("run-in").describe("element runs into the next block if possible"),

		// List Item
		z
			.literal("list-item")
			.describe("element behaves like a list item"),
	])
	.describe("CSS display property values that control how an element is displayed");

/**
 * Array of all display keyword values.
 *
 * @example
 * ```typescript
 * import { DISPLAY_KEYWORDS } from "@/core/keywords/display-keywords";
 *
 * console.log(DISPLAY_KEYWORDS);
 * // ["contents", "none", "flow", "flex", "grid", "block", "inline", ...]
 * ```
 *
 * @public
 */
export const DISPLAY_KEYWORDS = displayKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for display keywords.
 *
 * @public
 */
export type DisplayKeyword = z.infer<typeof displayKeywordsSchema>;

/**
 * Metadata for display keyword options.
 *
 * Provides value and description for each display keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { displayKeywordOptions } from "@/core/keywords/display-keywords";
 *
 * displayKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const displayKeywordOptions = displayKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for display keyword options metadata.
 *
 * @public
 */
export type DisplayKeywordOptions = typeof displayKeywordOptions;
