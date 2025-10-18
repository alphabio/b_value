// b_path:: src/core/keywords/system-color-keywords.ts
import { z } from "zod";

/**
 * CSS system color keywords (CSS Color Module Level 4).
 *
 * System colors represent colors from the user's operating system or browser theme.
 * These allow web content to integrate with the user's system appearance.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/#css-system-colors}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/system-color}
 * @public
 */
export const systemColorKeywordsSchema = z
	.union([
		z.literal("AccentColor").describe("Accent color from the user's system"),
		z.literal("AccentColorText").describe("Text color on accent color backgrounds"),
		z.literal("ActiveText").describe("Text color of active links"),
		z.literal("ButtonBorder").describe("Border color of controls"),
		z.literal("ButtonFace").describe("Background color of controls"),
		z.literal("ButtonText").describe("Text color of controls"),
		z.literal("Canvas").describe("Background color of application content or documents"),
		z.literal("CanvasText").describe("Text color in application content or documents"),
		z.literal("Field").describe("Background color of input fields"),
		z.literal("FieldText").describe("Text color in input fields"),
		z.literal("GrayText").describe("Text color for disabled items"),
		z.literal("Highlight").describe("Background color of selected items"),
		z.literal("HighlightText").describe("Text color of selected items"),
		z.literal("LinkText").describe("Text color of non-active, non-visited links"),
		z.literal("Mark").describe("Background color of marked/highlighted text"),
		z.literal("MarkText").describe("Text color of marked/highlighted text"),
		z.literal("SelectedItem").describe("Background color of selected items"),
		z.literal("SelectedItemText").describe("Text color of selected items"),
		z.literal("VisitedText").describe("Text color of visited links"),
	])
	.describe("CSS system color keywords");

/**
 * Array of all system color keyword values.
 *
 * @example
 * ```typescript
 * import { SYSTEM_COLOR_KEYWORDS } from "@/core/keywords/system-color-keywords";
 *
 * console.log(SYSTEM_COLOR_KEYWORDS);
 * // ["AccentColor", "AccentColorText", "ActiveText", ...]
 * ```
 *
 * @public
 */
export const SYSTEM_COLOR_KEYWORDS = systemColorKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for system color keywords.
 *
 * @public
 */
export type SystemColorKeyword = z.infer<typeof systemColorKeywordsSchema>;

/**
 * Metadata for system color keyword options.
 *
 * Provides value and description for each system color keyword,
 * useful for Studio UI generation and documentation.
 *
 * @example
 * ```typescript
 * import { systemColorKeywordOptions } from "@/core/keywords/system-color-keywords";
 *
 * systemColorKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const systemColorKeywordOptions = systemColorKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for system color keyword options metadata.
 *
 * @public
 */
export type SystemColorKeywordOptions = typeof systemColorKeywordOptions;
