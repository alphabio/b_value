// b_path:: src/core/types/color-stop.ts
import { z } from "zod";
import * as Keyword from "../keywords";
import { lengthPercentageSchema } from "./length-percentage";

/**
 * CSS color stop value.
 *
 * A color stop consists of a color value and an optional position.
 * Used in CSS gradients and other color-based properties.
 *
 * Per CSS spec: <color-stop> = <color> [ <length-percentage> ]?
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient}
 *
 * @example
 * ```typescript
 * import { colorStopSchema } from "@/core/types/color-stop";
 *
 * // Color only
 * const stop1: ColorStop = { color: "red" };
 *
 * // Color with percentage position
 * const stop2: ColorStop = {
 *   color: "blue",
 *   position: { value: 50, unit: "%" }
 * };
 *
 * // Color with length position
 * const stop3: ColorStop = {
 *   color: "rgba(255, 0, 0, 0.5)",
 *   position: { value: 10, unit: "px" }
 * };
 * ```
 *
 * @public
 */
export const colorStopSchema = z.object({
	color: Keyword.colorValueKeywordsSchema.describe("color value for the stop"),
	position: lengthPercentageSchema.optional().describe("optional position of the color stop"),
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
 *   { color: "red" },
 *   { color: "yellow", position: { value: 50, unit: "%" } },
 *   { color: "blue" }
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
