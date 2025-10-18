// b_path:: src/core/keywords/corner-shape-keywords.ts
import { z } from "zod";

/**
 * CSS corner-shape keyword values.
 *
 * Corner shape values describe the shape of container corners.
 * Used in corner-shape property to specify custom corner shapes beyond standard border-radius.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape}
 *
 * @example
 * ```typescript
 * import { cornerShapeKeywordsSchema } from "../keywords/corner-shape-keywords";
 *
 * const keyword = cornerShapeKeywordsSchema.parse("round");
 * ```
 *
 * @public
 */
export const cornerShapeKeywordsSchema = z
	.union([
		z.literal("round").describe("convex ordinary ellipse (default rounded corner)"),
		z.literal("scoop").describe("concave ordinary ellipse"),
		z.literal("bevel").describe("straight diagonal corner (neither convex nor concave)"),
		z.literal("notch").describe("90-degree concave square corner"),
		z.literal("square").describe("90-degree convex square corner"),
		z.literal("squircle").describe("convex curve between round and square"),
	])
	.describe(
		"Corner shape values describe the shape of container corners. " +
			"Used in corner-shape property to specify custom corner shapes beyond standard border-radius.",
	);

/**
 * Array of all corner-shape keyword values.
 *
 * @public
 */
export const CORNER_SHAPE_KEYWORDS = cornerShapeKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for corner-shape keywords.
 *
 * @public
 */
export type CornerShapeKeyword = z.infer<typeof cornerShapeKeywordsSchema>;

/**
 * Metadata for corner-shape keyword options.
 *
 * @public
 */
export const cornerShapeKeywordOptions = cornerShapeKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for corner-shape keyword options metadata.
 *
 * @public
 */
export type CornerShapeKeywordOptions = typeof cornerShapeKeywordOptions;
