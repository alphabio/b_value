// b_path:: src/core/types/typography.ts
import { z } from "zod";
import { lengthPercentageSchema } from "./length-percentage";

/**
 * CSS font-size property IR.
 *
 * The font-size property sets the size of the font.
 * Accepts length, percentage, or keyword values.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size}
 *
 * @example
 * ```typescript
 * const fontSize: FontSize = {
 *   kind: "font-size",
 *   value: { value: 16, unit: "px" }
 * };
 * // CSS: font-size: 16px;
 * ```
 *
 * @public
 */
export const fontSizeSchema = z.object({
	kind: z.literal("font-size"),
	value: z.union([
		lengthPercentageSchema,
		z.enum([
			"xx-small",
			"x-small",
			"small",
			"medium",
			"large",
			"x-large",
			"xx-large",
			"xxx-large",
			"larger",
			"smaller",
		]),
	]),
});

export type FontSize = z.infer<typeof fontSizeSchema>;

/**
 * CSS font-family property IR.
 *
 * The font-family property specifies a prioritized list of font family names.
 * The browser will use the first font in the list that is available.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-family}
 *
 * @example
 * ```typescript
 * const fontFamily: FontFamily = {
 *   kind: "font-family",
 *   families: ["Arial", "sans-serif"]
 * };
 * // CSS: font-family: Arial, sans-serif;
 * ```
 *
 * @public
 */
export const fontFamilySchema = z.object({
	kind: z.literal("font-family"),
	families: z.array(z.string()).min(1),
});

export type FontFamily = z.infer<typeof fontFamilySchema>;

/**
 * CSS font-weight property IR.
 *
 * The font-weight property sets the weight (or boldness) of the font.
 * Accepts numeric values (1-1000) or keyword values.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight}
 *
 * @example
 * ```typescript
 * const fontWeight: FontWeight = {
 *   kind: "font-weight",
 *   value: 700
 * };
 * // CSS: font-weight: 700;
 * ```
 *
 * @public
 */
export const fontWeightSchema = z.object({
	kind: z.literal("font-weight"),
	value: z.union([z.number().min(1).max(1000), z.enum(["normal", "bold", "bolder", "lighter"])]),
});

export type FontWeight = z.infer<typeof fontWeightSchema>;

/**
 * CSS line-height property IR.
 *
 * The line-height property sets the height of a line box.
 * Accepts unitless number, length, percentage, or normal keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/line-height}
 *
 * @example
 * ```typescript
 * const lineHeight: LineHeight = {
 *   kind: "line-height",
 *   value: 1.5
 * };
 * // CSS: line-height: 1.5;
 * ```
 *
 * @public
 */
export const lineHeightSchema = z.object({
	kind: z.literal("line-height"),
	value: z.union([z.number(), lengthPercentageSchema, z.literal("normal")]),
});

export type LineHeight = z.infer<typeof lineHeightSchema>;

/**
 * CSS text-align property IR.
 *
 * The text-align property sets the horizontal alignment of the inline-level content
 * inside a block element or table-cell box.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-align}
 *
 * @example
 * ```typescript
 * const textAlign: TextAlign = {
 *   kind: "text-align",
 *   value: "center"
 * };
 * // CSS: text-align: center;
 * ```
 *
 * @public
 */
export const textAlignSchema = z.object({
	kind: z.literal("text-align"),
	value: z.enum(["left", "right", "center", "justify", "start", "end"]),
});

export type TextAlign = z.infer<typeof textAlignSchema>;
