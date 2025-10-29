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
	value: z.union(
		[
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
		],
		{
			error: (issue) =>
				issue.code === "invalid_union"
					? {
							message:
								"Expected <length-percentage> | xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large | larger | smaller",
						}
					: { message: "Invalid font-size value" },
		},
	),
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
	value: z.union([z.number().min(1).max(1000), z.enum(["normal", "bold", "bolder", "lighter"])], {
		error: (issue) =>
			issue.code === "invalid_union"
				? { message: "Expected <number 1-1000> | normal | bold | bolder | lighter" }
				: { message: "Invalid font-weight value" },
	}),
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
	value: z.union([z.number(), lengthPercentageSchema, z.literal("normal")], {
		error: (issue) =>
			issue.code === "invalid_union"
				? { message: "Expected <number> | <length-percentage> | normal" }
				: { message: "Invalid line-height value" },
	}),
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
	value: z.enum(["left", "right", "center", "justify", "start", "end"], {
		error: () => ({ message: "Expected left | right | center | justify | start | end" }),
	}),
});

export type TextAlign = z.infer<typeof textAlignSchema>;

/**
 * CSS font-style property IR.
 *
 * The font-style property sets whether a font should be styled with a normal, italic,
 * or oblique face from its font-family.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-style}
 *
 * @example
 * ```typescript
 * const fontStyle: FontStyle = {
 *   kind: "font-style",
 *   value: "italic"
 * };
 * // CSS: font-style: italic;
 * ```
 *
 * @public
 */
export const fontStyleSchema = z.object({
	kind: z.literal("font-style"),
	value: z.enum(["normal", "italic", "oblique"], {
		error: () => ({ message: "Expected normal | italic | oblique" }),
	}),
});

export type FontStyle = z.infer<typeof fontStyleSchema>;

/**
 * CSS letter-spacing property IR.
 *
 * The letter-spacing property sets the horizontal spacing behavior between text characters.
 * Accepts length values or the normal keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing}
 *
 * @example
 * ```typescript
 * const letterSpacing: LetterSpacing = {
 *   kind: "letter-spacing",
 *   value: { value: 2, unit: "px" }
 * };
 * // CSS: letter-spacing: 2px;
 * ```
 *
 * @public
 */
export const letterSpacingSchema = z.object({
	kind: z.literal("letter-spacing"),
	value: z.union([lengthPercentageSchema, z.literal("normal")], {
		error: (issue) =>
			issue.code === "invalid_union"
				? { message: "Expected <length-percentage> | normal" }
				: { message: "Invalid letter-spacing value" },
	}),
});

export type LetterSpacing = z.infer<typeof letterSpacingSchema>;

/**
 * CSS text-transform property IR.
 *
 * The text-transform property specifies how to capitalize an element's text.
 * Accepts keyword values.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform}
 *
 * @example
 * ```typescript
 * const textTransform: TextTransform = {
 *   kind: "text-transform",
 *   value: "uppercase"
 * };
 * // CSS: text-transform: uppercase;
 * ```
 *
 * @public
 */
export const textTransformSchema = z.object({
	kind: z.literal("text-transform"),
	value: z.enum(["none", "capitalize", "uppercase", "lowercase", "full-width", "full-size-kana"], {
		error: () => ({
			message: "Expected none | capitalize | uppercase | lowercase | full-width | full-size-kana",
		}),
	}),
});

export type TextTransform = z.infer<typeof textTransformSchema>;

/**
 * CSS vertical-align property IR.
 *
 * The vertical-align property sets vertical alignment of an inline, inline-block or table-cell box.
 * Accepts keyword values, length, or percentage.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align}
 *
 * @example
 * ```typescript
 * const verticalAlign: VerticalAlign = {
 *   kind: "vertical-align",
 *   value: "middle"
 * };
 * // CSS: vertical-align: middle;
 * ```
 *
 * @public
 */
export const verticalAlignSchema = z.object({
	kind: z.literal("vertical-align"),
	value: z.union(
		[
			lengthPercentageSchema,
			z.enum(["baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"]),
		],
		{
			error: (issue) =>
				issue.code === "invalid_union"
					? {
							message:
								"Expected <length-percentage> | baseline | sub | super | text-top | text-bottom | middle | top | bottom",
						}
					: { message: "Invalid vertical-align value" },
		},
	),
});

export type VerticalAlign = z.infer<typeof verticalAlignSchema>;

/**
 * CSS word-break property IR.
 *
 * The word-break property sets whether line breaks appear wherever the text would otherwise overflow.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/word-break}
 *
 * @example
 * ```typescript
 * const wordBreak: WordBreak = {
 *   kind: "word-break",
 *   value: "break-all"
 * };
 * // CSS: word-break: break-all;
 * ```
 *
 * @public
 */
export const wordBreakSchema = z.object({
	kind: z.literal("word-break"),
	value: z.enum(["normal", "break-all", "keep-all", "break-word"], {
		error: () => ({ message: "Expected normal | break-all | keep-all | break-word" }),
	}),
});

export type WordBreak = z.infer<typeof wordBreakSchema>;

/**
 * CSS overflow-wrap property IR.
 *
 * The overflow-wrap property applies to inline elements, setting whether the browser should
 * insert line breaks within an otherwise unbreakable string to prevent text from overflowing.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap}
 *
 * @example
 * ```typescript
 * const overflowWrap: OverflowWrap = {
 *   kind: "overflow-wrap",
 *   value: "break-word"
 * };
 * // CSS: overflow-wrap: break-word;
 * ```
 *
 * @public
 */
export const overflowWrapSchema = z.object({
	kind: z.literal("overflow-wrap"),
	value: z.enum(["normal", "break-word", "anywhere"], {
		error: () => ({ message: "Expected normal | break-word | anywhere" }),
	}),
});

export type OverflowWrap = z.infer<typeof overflowWrapSchema>;
