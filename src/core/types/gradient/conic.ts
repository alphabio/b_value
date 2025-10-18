// b_path:: src/core/types/gradient/conic.ts
import { z } from "zod";
import * as Keyword from "../../keywords";
import { angleSchema } from "../angle";
import { colorStopListSchema } from "../color-stop";
import { position2DSchema } from "../position";

/**
 * CSS conic gradient value.
 *
 * A conic gradient transitions colors progressively around a center point.
 * The gradient sweeps in a circular arc, starting from a specified angle.
 * It can have optional starting angle, position, color interpolation method,
 * and must have at least 2 color stops.
 *
 * Per CSS Images Module Level 4 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient}
 * @see {@link https://www.w3.org/TR/css-images-4/#conic-gradients}
 *
 * @example
 * ```typescript
 * import { conicGradientSchema } from "@/core/types/gradient/conic";
 *
 * // Simple conic gradient (defaults to starting from top, center position)
 * const grad1: ConicGradient = {
 *   kind: "conic",
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // With starting angle
 * const grad2: ConicGradient = {
 *   kind: "conic",
 *   fromAngle: { value: 45, unit: "deg" },
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // At specific position
 * const grad3: ConicGradient = {
 *   kind: "conic",
 *   fromAngle: { value: 0, unit: "deg" },
 *   position: { horizontal: "left", vertical: "top" },
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // With color interpolation
 * const grad4: ConicGradient = {
 *   kind: "conic",
 *   fromAngle: { value: 90, unit: "deg" },
 *   position: { horizontal: "center", vertical: "center" },
 *   colorSpace: "oklch",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "deg" } },
 *     { color: "yellow", position: { value: 120, unit: "deg" } },
 *     { color: "blue", position: { value: 240, unit: "deg" } }
 *   ],
 *   repeating: false
 * };
 *
 * // Repeating conic gradient
 * const grad5: ConicGradient = {
 *   kind: "conic",
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue", position: { value: 45, unit: "deg" } }
 *   ],
 *   repeating: true
 * };
 * ```
 *
 * @public
 */
export const conicGradientSchema = z.object({
	kind: z.literal("conic"),
	fromAngle: angleSchema.optional().describe("starting angle (default: 0deg from top)"),
	position: position2DSchema.optional().describe("gradient center position (default: center)"),
	colorSpace: Keyword.colorInterpolationKeywordsSchema
		.optional()
		.describe("color interpolation method (e.g., oklch, srgb)"),
	colorStops: colorStopListSchema.describe("array of color stops (min 2)"),
	repeating: z.boolean().describe("whether this is a repeating gradient"),
});

/**
 * TypeScript type for conic gradient.
 *
 * @public
 */
export type ConicGradient = z.infer<typeof conicGradientSchema>;
