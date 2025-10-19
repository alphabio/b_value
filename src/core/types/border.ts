// b_path:: src/core/types/border.ts
import { z } from "zod";
import * as Keyword from "../keywords";
import { lengthPercentageSchema, lengthSchema } from "./length-percentage";

/**
 * CSS <border-width> data type.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-width}
 * @public
 */
export const borderWidthSchema = z.union([lengthSchema, Keyword.borderWidthKeywordsSchema]);

/**
 * CSS <border-style> data type.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-style}
 * @public
 */
export const borderStyleSchema = Keyword.borderStyleKeywordsSchema;

/**
 * CSS <color> data type for borders.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-color}
 * @public
 */
export const borderColorSchema = Keyword.colorValueKeywordsSchema;

/**
 * Side specification for multi-side operations.
 * Optional - when omitted, applies to all sides.
 *
 * @public
 */
export const borderSidesSchema = z.array(z.enum(["top", "right", "bottom", "left"])).optional();

/**
 * Unified border specification.
 *
 * NOT a CSS spec type - this is a convenience type for
 * applying complete borders to one or more sides programmatically.
 *
 * @example
 * ```typescript
 * // All sides
 * { width: { value: 1, unit: "px" }, style: "solid", color: "red" }
 *
 * // Specific sides
 * { sides: ["top"], width: { value: 2, unit: "px" }, style: "dashed", color: "blue" }
 * ```
 *
 * @public
 */
export const unifiedBorderSchema = z.object({
	sides: borderSidesSchema,
	width: borderWidthSchema,
	style: borderStyleSchema,
	color: borderColorSchema,
});

export type BorderWidth = z.infer<typeof borderWidthSchema>;
export type BorderStyle = z.infer<typeof borderStyleSchema>;
export type BorderColor = z.infer<typeof borderColorSchema>;
export type BorderSides = z.infer<typeof borderSidesSchema>;
export type UnifiedBorder = z.infer<typeof unifiedBorderSchema>;

/**
 * CSS border-width property IR.
 *
 * Specifies the width of the border.
 * Single length value or keyword (thin, medium, thick).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-width}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-width}
 *
 * @public
 */
export const borderWidthValueSchema = z.object({
	kind: z.literal("border-width"),
	width: borderWidthSchema,
});

/**
 * CSS border-width property type.
 *
 * @public
 */
export type BorderWidthValue = z.infer<typeof borderWidthValueSchema>;

/**
 * CSS border-style property IR.
 *
 * Specifies the style of the border line.
 * Single style keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-style}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-style}
 *
 * @public
 */
export const borderStyleValueSchema = z.object({
	kind: z.literal("border-style"),
	style: borderStyleSchema,
});

/**
 * CSS border-style property type.
 *
 * @public
 */
export type BorderStyleValue = z.infer<typeof borderStyleValueSchema>;

/**
 * CSS border-color property IR.
 *
 * Specifies the color of the border.
 * Single color value or keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-color}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-color}
 *
 * @public
 */
export const borderColorValueSchema = z.object({
	kind: z.literal("border-color"),
	color: borderColorSchema,
});

/**
 * CSS border-color property type.
 *
 * @public
 */
export type BorderColorValue = z.infer<typeof borderColorValueSchema>;

/**
 * CSS border-radius property IR.
 *
 * Specifies the radius of the border corners.
 * Single length-percentage value.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#border-radius}
 *
 * @public
 */
export const borderRadiusValueSchema = z.object({
	kind: z.literal("border-radius"),
	radius: lengthPercentageSchema,
});

/**
 * CSS border-radius property type.
 *
 * @public
 */
export type BorderRadiusValue = z.infer<typeof borderRadiusValueSchema>;
