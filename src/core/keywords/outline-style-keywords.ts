// b_path:: src/core/keywords/outline-style-keywords.ts
import { z } from "zod";

/**
 * CSS outline-style keyword values.
 *
 * The outline-style property sets the style of an element's outline.
 * Includes 'auto' which is outline-specific, plus all border-style values.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style}
 *
 * @public
 */
export const outlineStyleKeywordsSchema = z
	.union([
		z.literal("auto").describe("browser determines outline style"),
		z.literal("none").describe("no outline"),
		z.literal("hidden").describe("same as none, but with different behavior in table elements"),
		z.literal("dotted").describe("series of round dots"),
		z.literal("dashed").describe("series of short square-ended dashes"),
		z.literal("solid").describe("single, straight, solid line"),
		z.literal("double").describe("two straight lines that add up to the pixel size"),
		z.literal("groove").describe("carved effect - opposite of ridge"),
		z.literal("ridge").describe("extruded effect - opposite of groove"),
		z.literal("inset").describe("outline makes element appear embedded"),
		z.literal("outset").describe("outline makes element appear raised"),
	])
	.describe("CSS outline-style property keyword values");

/**
 * Array of all outline-style keyword values.
 *
 * @public
 */
export const OUTLINE_STYLE_KEYWORDS = outlineStyleKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for outline-style keywords.
 *
 * @public
 */
export type OutlineStyleKeyword = z.infer<typeof outlineStyleKeywordsSchema>;

/**
 * Metadata for outline-style keyword options.
 *
 * @public
 */
export const outlineStyleKeywordOptions = outlineStyleKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for outline-style keyword options metadata.
 *
 * @public
 */
export type OutlineStyleKeywordOptions = typeof outlineStyleKeywordOptions;
