// b_path:: src/core/types/gradient/radial-size.ts
import { z } from "zod";
import { lengthPercentageSchema } from "../length-percentage";

/**
 * CSS radial gradient size value.
 *
 * Specifies the size of a radial gradient. Can be a keyword describing
 * the ending shape's size relative to the gradient box, or explicit lengths.
 *
 * Per CSS Images Module Level 3 specification:
 * - closest-side: gradient ends at the side of the box closest to the gradient's center
 * - farthest-side: gradient ends at the side of the box farthest from the gradient's center
 * - closest-corner: gradient ends at the corner of the box closest to the gradient's center
 * - farthest-corner: gradient ends at the corner of the box farthest from the gradient's center (default)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient}
 * @see {@link https://www.w3.org/TR/css-images-3/#radial-size-circle}
 *
 * @example
 * ```typescript
 * import { radialGradientSizeSchema } from "@/core/types/gradient/radial-size";
 *
 * // Keyword size
 * const size1: RadialGradientSize = {
 *   kind: "keyword",
 *   value: "closest-side"
 * };
 *
 * // Explicit circle size (single length)
 * const size2: RadialGradientSize = {
 *   kind: "circle-explicit",
 *   radius: { value: 100, unit: "px" }
 * };
 *
 * // Explicit ellipse size (two length-percentage values)
 * const size3: RadialGradientSize = {
 *   kind: "ellipse-explicit",
 *   radiusX: { value: 50, unit: "%" },
 *   radiusY: { value: 100, unit: "px" }
 * };
 * ```
 *
 * @public
 */
export const radialGradientSizeSchema = z.union([
	z.object({
		kind: z.literal("keyword"),
		value: z.union([
			z.literal("closest-side"),
			z.literal("farthest-side"),
			z.literal("closest-corner"),
			z.literal("farthest-corner"),
		]),
	}),
	z.object({
		kind: z.literal("circle-explicit"),
		radius: lengthPercentageSchema.describe("circle radius"),
	}),
	z.object({
		kind: z.literal("ellipse-explicit"),
		radiusX: lengthPercentageSchema.describe("horizontal radius"),
		radiusY: lengthPercentageSchema.describe("vertical radius"),
	}),
]);

/**
 * TypeScript type for radial gradient size.
 *
 * @public
 */
export type RadialGradientSize = z.infer<typeof radialGradientSizeSchema>;
