// b_path:: src/core/types/border.ts
import { z } from "zod";
import * as Keyword from "../keywords";
import { lengthSchema } from "./length-percentage";

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
