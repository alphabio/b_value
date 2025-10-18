// b_path:: src/core/types/color-stop.ts
import { z } from "zod";
import { angleSchema } from "./angle";
import { colorSchema } from "./color";
import { lengthPercentageSchema } from "./length-percentage";

/**
 * CSS color stop value.
 *
 * A color stop consists of a color value and an optional position.
 * Used in CSS gradients and other color-based properties.
 *
 * Per CSS spec:
 * - For linear/radial gradients: <color-stop> = <color> [ <length-percentage> ]?
 * - For conic gradients: <color-stop> = <color> [ <angle> | <percentage> ]?
 *
 * This type supports both length-percentage and angle units to accommodate all gradient types.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient}
 *
 * @example
 * ```typescript
 * import { colorStopSchema } from "@/core/types/color-stop";
 *
 * // Color only
 * const stop1: ColorStop = {
 *   color: { kind: "named", name: "red" }
 * };
 *
 * // Color with percentage position (all gradient types)
 * const stop2: ColorStop = {
 *   color: { kind: "named", name: "blue" },
 *   position: { value: 50, unit: "%" }
 * };
 *
 * // Color with length position (linear/radial gradients)
 * const stop3: ColorStop = {
 *   color: { kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 },
 *   position: { value: 10, unit: "px" }
 * };
 *
 * // Color with angle position (conic gradients)
 * const stop4: ColorStop = {
 *   color: { kind: "named", name: "green" },
 *   position: { value: 45, unit: "deg" }
 * };
 * ```
 *
 * @public
 */
export const colorStopSchema = z.object({
	color: colorSchema.describe("color value for the stop"),
	position: z
		.union([lengthPercentageSchema, angleSchema])
		.optional()
		.describe(
			"optional position of the color stop (length-percentage for linear/radial, angle or percentage for conic)",
		),
});

/**
 * TypeScript type for color stop.
 * @public
 */
export type ColorStop = z.infer<typeof colorStopSchema>;

/**
 * CSS color stop list.
 *
 * An array of color stops used in gradients and other multi-stop color properties.
 * Must contain at least 2 color stops for valid gradients.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient}
 *
 * @example
 * ```typescript
 * import { colorStopListSchema } from "@/core/types/color-stop";
 *
 * const stops: ColorStopList = [
 *   { color: { kind: "named", name: "red" } },
 *   { color: { kind: "named", name: "yellow" }, position: { value: 50, unit: "%" } },
 *   { color: { kind: "named", name: "blue" } }
 * ];
 * ```
 *
 * @public
 */
export const colorStopListSchema = z
	.array(colorStopSchema)
	.min(2, "Color stop list must contain at least 2 stops")
	.describe("array of color stops for gradients and multi-stop color properties");

/**
 * TypeScript type for color stop list.
 * @public
 */
export type ColorStopList = z.infer<typeof colorStopListSchema>;
