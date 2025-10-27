// b_path:: src/core/types/outline.ts
import { z } from "zod";
import * as Keyword from "../keywords";
import { lengthSchema } from "./length-percentage";

/**
 * CSS outline-width property IR.
 *
 * Specifies the width of the outline.
 * Single length value or keyword (thin, medium, thick).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-width}
 *
 * @public
 */
export const outlineWidthValueSchema = z.object({
	kind: z.literal("outline-width"),
	width: z.union([lengthSchema, Keyword.borderWidthKeywordsSchema], {
		error: (issue) =>
			issue.code === "invalid_union"
				? 'Invalid outline width. Expected a length or keyword ("thin", "medium", "thick").'
				: "Invalid input",
	}),
});

/**
 * CSS outline-width property type.
 *
 * @public
 */
export type OutlineWidthValue = z.infer<typeof outlineWidthValueSchema>;

/**
 * CSS outline-style property IR.
 *
 * Specifies the style of the outline line.
 * Single style keyword including 'auto' (outline-specific).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-style}
 *
 * @public
 */
export const outlineStyleValueSchema = z.object({
	kind: z.literal("outline-style"),
	style: Keyword.outlineStyleKeywordsSchema,
});

/**
 * CSS outline-style property type.
 *
 * @public
 */
export type OutlineStyleValue = z.infer<typeof outlineStyleValueSchema>;

/**
 * CSS outline-style keyword type (extracted from schema).
 *
 * @public
 */
export type OutlineStyle = z.infer<typeof Keyword.outlineStyleKeywordsSchema>;

/**
 * CSS outline-color property IR.
 *
 * Specifies the color of the outline.
 * Single color value or keyword including 'invert' (outline-specific).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-color}
 *
 * @public
 */
export const outlineColorValueSchema = z.object({
	kind: z.literal("outline-color"),
	color: z.union([Keyword.colorValueKeywordsSchema, z.literal("invert")], {
		error: (issue) =>
			issue.code === "invalid_union" ? 'Invalid outline color. Expected a color keyword or "invert".' : "Invalid input",
	}),
});

/**
 * CSS outline-color property type.
 *
 * @public
 */
export type OutlineColorValue = z.infer<typeof outlineColorValueSchema>;

/**
 * CSS outline-offset property IR.
 *
 * Specifies the space between outline and element edge.
 * Single length value (can be negative).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset}
 * @see {@link https://www.w3.org/TR/css-ui-3/#outline-offset}
 *
 * @public
 */
export const outlineOffsetValueSchema = z.object({
	kind: z.literal("outline-offset"),
	offset: lengthSchema,
});

/**
 * CSS outline-offset property type.
 *
 * @public
 */
export type OutlineOffsetValue = z.infer<typeof outlineOffsetValueSchema>;
