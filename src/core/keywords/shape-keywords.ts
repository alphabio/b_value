// b_path:: src/core/keywords/shape-keywords.ts
import { z } from "zod";

/**
 * CSS shape radius keywords for circles and ellipses.
 *
 * Shape radius keywords specify the radius of circles and ellipses relative to the reference box.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape}
 * @public
 */
export const shapeRadiusKeywordsSchema = z
	.union([
		z.literal("closest-side").describe("length from center to closest side of reference box"),
		z.literal("farthest-side").describe("length from center to farthest side of reference box"),
	])
	.describe("Shape radius keywords for circles and ellipses");

/**
 * Array of all shape radius keyword values.
 *
 * @public
 */
export const SHAPE_RADIUS_KEYWORDS = shapeRadiusKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for shape radius keywords.
 *
 * @public
 */
export type ShapeRadiusKeyword = z.infer<typeof shapeRadiusKeywordsSchema>;

/**
 * CSS fill-rule keywords.
 *
 * Fill rule determines how the interior of shapes is filled.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule}
 * @public
 */
export const fillRuleKeywordsSchema = z
	.union([
		z.literal("nonzero").describe("nonzero winding rule (default)"),
		z.literal("evenodd").describe("even-odd winding rule"),
	])
	.describe("Fill rule determines how interior of shapes is filled");

/**
 * Array of all fill-rule keyword values.
 *
 * @public
 */
export const FILL_RULE_KEYWORDS = fillRuleKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for fill-rule keywords.
 *
 * @public
 */
export type FillRuleKeyword = z.infer<typeof fillRuleKeywordsSchema>;

/**
 * CSS basic shape function keywords.
 *
 * Basic shape functions create geometric shapes for use in clip-path, shape-outside,
 * and other CSS properties.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape}
 * @public
 */
export const basicShapeKeywordsSchema = z
	.union([
		z.literal("inset").describe("rectangle by container inset"),
		z.literal("circle").describe("circular shape"),
		z.literal("ellipse").describe("elliptical shape"),
		z.literal("polygon").describe("polygonal shape with multiple points"),
		z.literal("path").describe("custom path shape"),
		z.literal("rect").describe("rectangle by coordinates"),
		z.literal("xywh").describe("rectangle by x, y, width, height"),
	])
	.describe(
		"Basic shape functions for creating geometric shapes. " +
			"Used in clip-path, shape-outside, and other CSS properties.",
	);

/**
 * Array of all basic shape keyword values.
 *
 * @public
 */
export const BASIC_SHAPE_KEYWORDS = basicShapeKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for basic shape keywords.
 *
 * @public
 */
export type BasicShapeKeyword = z.infer<typeof basicShapeKeywordsSchema>;

/**
 * Combined CSS shape keywords.
 *
 * Includes basic shapes, shape radius keywords, and fill rules.
 *
 * @public
 */
export const shapeKeywordsSchema = z
	.union([
		// Basic shapes
		z
			.literal("inset")
			.describe("rectangle by container inset"),
		z.literal("circle").describe("circular shape"),
		z.literal("ellipse").describe("elliptical shape"),
		z.literal("polygon").describe("polygonal shape with multiple points"),
		z.literal("path").describe("custom path shape"),
		z.literal("rect").describe("rectangle by coordinates"),
		z.literal("xywh").describe("rectangle by x, y, width, height"),

		// Shape radius
		z
			.literal("closest-side")
			.describe("length from center to closest side of reference box"),
		z.literal("farthest-side").describe("length from center to farthest side of reference box"),

		// Fill rules
		z
			.literal("nonzero")
			.describe("nonzero winding rule (default)"),
		z.literal("evenodd").describe("even-odd winding rule"),
	])
	.describe("CSS shape-related keywords");

/**
 * Array of all shape keyword values.
 *
 * @public
 */
export const SHAPE_KEYWORDS = shapeKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for shape keywords.
 *
 * @public
 */
export type ShapeKeyword = z.infer<typeof shapeKeywordsSchema>;

/**
 * Metadata for shape keyword options.
 *
 * @public
 */
export const shapeKeywordOptions = shapeKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for shape keyword options metadata.
 *
 * @public
 */
export type ShapeKeywordOptions = typeof shapeKeywordOptions;
