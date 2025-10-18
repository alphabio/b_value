// b_path:: src/core/types/gradient/radial.ts
import { z } from "zod";
import * as Keyword from "../../keywords";
import { colorStopListSchema } from "../color-stop";
import { position2DSchema } from "../position";
import { radialGradientShapeSchema } from "./radial-shape";
import { radialGradientSizeSchema } from "./radial-size";

/**
 * CSS radial gradient value.
 *
 * A radial gradient transitions colors progressively from a center point (origin)
 * outward in a circular or elliptical pattern. The gradient can have optional shape,
 * size, position, color interpolation method, and must have at least 2 color stops.
 *
 * Per CSS Images Module Level 3 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient}
 * @see {@link https://www.w3.org/TR/css-images-3/#radial-gradients}
 *
 * @example
 * ```typescript
 * import { radialGradientSchema } from "@/core/types/gradient/radial";
 *
 * // Simple radial gradient (defaults to ellipse at center)
 * const grad1: RadialGradient = {
 *   kind: "radial",
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // Circle with keyword size
 * const grad2: RadialGradient = {
 *   kind: "radial",
 *   shape: "circle",
 *   size: { kind: "keyword", value: "closest-side" },
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // Ellipse at specific position
 * const grad3: RadialGradient = {
 *   kind: "radial",
 *   shape: "ellipse",
 *   position: { horizontal: "left", vertical: "top" },
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // With explicit size and color interpolation
 * const grad4: RadialGradient = {
 *   kind: "radial",
 *   shape: "circle",
 *   size: { kind: "circle-explicit", radius: { value: 100, unit: "px" } },
 *   position: { horizontal: "center", vertical: "center" },
 *   colorSpace: "oklch",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "%" } },
 *     { color: "blue", position: { value: 100, unit: "%" } }
 *   ],
 *   repeating: false
 * };
 *
 * // Repeating radial gradient
 * const grad5: RadialGradient = {
 *   kind: "radial",
 *   shape: "circle",
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue", position: { value: 20, unit: "px" } }
 *   ],
 *   repeating: true
 * };
 * ```
 *
 * @public
 */
export const radialGradientSchema = z.object({
	kind: z.literal("radial"),
	shape: radialGradientShapeSchema.optional().describe("gradient shape (default: ellipse)"),
	size: radialGradientSizeSchema.optional().describe("gradient size (default: farthest-corner)"),
	position: position2DSchema.optional().describe("gradient center position (default: center)"),
	colorSpace: Keyword.colorInterpolationKeywordsSchema
		.optional()
		.describe("color interpolation method (e.g., oklch, srgb)"),
	colorStops: colorStopListSchema.describe("array of color stops (min 2)"),
	repeating: z.boolean().describe("whether this is a repeating gradient"),
});

/**
 * TypeScript type for radial gradient.
 *
 * @public
 */
export type RadialGradient = z.infer<typeof radialGradientSchema>;
