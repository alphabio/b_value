// b_path:: src/core/types/gradient/linear.ts
import { z } from "zod";
import * as Keyword from "../../keywords";
import * as Type from "..";
import { gradientDirectionSchema } from "./direction";

/**
 * CSS linear gradient value.
 *
 * A linear gradient transitions colors progressively along a straight line.
 * The gradient can have an optional direction (angle or side/corner keyword),
 * optional color interpolation method, and must have at least 2 color stops.
 *
 * Per CSS Images Module Level 3 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient}
 * @see {@link https://www.w3.org/TR/css-images-3/#linear-gradients}
 *
 * @example
 * ```typescript
 * import { linearGradientSchema } from "../gradient/linear";
 *
 * // Simple gradient (defaults to top to bottom)
 * const grad1: LinearGradient = {
 *   kind: "linear",
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // With angle direction
 * const grad2: LinearGradient = {
 *   kind: "linear",
 *   direction: { kind: "angle", value: { value: 45, unit: "deg" } },
 *   colorStops: [
 *     { color: "red" },
 *     { color: "blue" }
 *   ],
 *   repeating: false
 * };
 *
 * // With color interpolation
 * const grad3: LinearGradient = {
 *   kind: "linear",
 *   direction: { kind: "to-side", value: "right" },
 *   colorSpace: "oklch",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "%" } },
 *     { color: "blue", position: { value: 100, unit: "%" } }
 *   ],
 *   repeating: false
 * };
 *
 * // Repeating gradient
 * const grad4: LinearGradient = {
 *   kind: "linear",
 *   direction: { kind: "angle", value: { value: 45, unit: "deg" } },
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
export const linearGradientSchema = z.object({
	kind: z.literal("linear"),
	direction: gradientDirectionSchema.optional().describe("gradient direction (default: to bottom)"),
	colorSpace: Keyword.colorInterpolationKeywordsSchema
		.optional()
		.describe("color interpolation method (e.g., oklch, srgb)"),
	colorStops: Type.colorStopListSchema.describe("array of color stops (min 2)"),
	repeating: z.boolean().describe("whether this is a repeating gradient"),
});

/**
 * TypeScript type for linear gradient.
 *
 * @public
 */
export type LinearGradient = z.infer<typeof linearGradientSchema>;
