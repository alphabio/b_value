// b_path:: src/core/keywords/color-interpolation-keywords.ts
import { z } from "zod";

/**
 * Rectangular color space keywords for color interpolation.
 *
 * Rectangular (Cartesian) color spaces use perpendicular axes
 * for each color channel. Used for color interpolation in gradients,
 * animations, and color-mix() function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method}
 * @public
 */
export const rectangularColorSpaceKeywordsSchema = z
	.union([
		z.literal("srgb").describe("sRGB color space"),
		z.literal("srgb-linear").describe("linear sRGB color space"),
		z.literal("display-p3").describe("Display P3 color space"),
		z.literal("display-p3-linear").describe("linear Display P3 color space"),
		z.literal("a98-rgb").describe("Adobe RGB (1998) color space"),
		z.literal("prophoto-rgb").describe("ProPhoto RGB color space"),
		z.literal("rec2020").describe("Rec. 2020 color space"),
		z.literal("lab").describe("CIE LAB color space"),
		z.literal("oklab").describe("OKLab color space"),
		z.literal("xyz").describe("CIE XYZ color space"),
		z.literal("xyz-d50").describe("CIE XYZ color space with D50 white point"),
		z.literal("xyz-d65").describe("CIE XYZ color space with D65 white point"),
	])
	.describe("Rectangular color spaces for color interpolation");

/**
 * Polar color space keywords for color interpolation.
 *
 * Polar (cylindrical) color spaces use hue as a circular component
 * and other attributes as radial distances. Used for color interpolation
 * in gradients, animations, and color-mix() function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method}
 * @public
 */
export const polarColorSpaceKeywordsSchema = z
	.union([
		z.literal("hsl").describe("HSL color space"),
		z.literal("hwb").describe("HWB color space"),
		z.literal("lch").describe("CIE LCH color space"),
		z.literal("oklch").describe("OKLCh color space"),
	])
	.describe("Polar color spaces for color interpolation");

/**
 * Hue interpolation method keywords for polar color spaces.
 *
 * When using polar color spaces, hue can be interpolated in different ways
 * around the color wheel. These keywords control that interpolation.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/hue-interpolation-method}
 * @public
 */
export const hueInterpolationMethodKeywordsSchema = z
	.union([
		z.literal("shorter").describe("shorter hue interpolation (default)"),
		z.literal("longer").describe("longer hue interpolation"),
		z.literal("increasing").describe("increasing hue interpolation"),
		z.literal("decreasing").describe("decreasing hue interpolation"),
	])
	.describe("Hue interpolation methods for polar color spaces");

/**
 * CSS color interpolation keywords.
 *
 * Color interpolation methods specify how colors are interpolated
 * in gradients, animations, and the color-mix() function.
 *
 * Includes:
 * - Rectangular color spaces (sRGB, Display P3, LAB, etc.)
 * - Polar color spaces (HSL, HWB, LCH, OKLCH)
 * - Hue interpolation methods (shorter, longer, increasing, decreasing)
 *
 * Used in:
 * - CSS gradients with `in` keyword
 * - color-mix() function
 * - CSS animations and transitions
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method}
 *
 * @example
 * ```typescript
 * import { colorInterpolationKeywordsSchema } from "@/core/keywords/color-interpolation-keywords";
 *
 * const keyword = colorInterpolationKeywordsSchema.parse("oklch"); // "oklch"
 * ```
 *
 * @public
 */
export const colorInterpolationKeywordsSchema = z
	.union([
		// Rectangular color spaces
		z
			.literal("srgb")
			.describe("sRGB color space"),
		z.literal("srgb-linear").describe("linear sRGB color space"),
		z.literal("display-p3").describe("Display P3 color space"),
		z.literal("display-p3-linear").describe("linear Display P3 color space"),
		z.literal("a98-rgb").describe("Adobe RGB (1998) color space"),
		z.literal("prophoto-rgb").describe("ProPhoto RGB color space"),
		z.literal("rec2020").describe("Rec. 2020 color space"),
		z.literal("lab").describe("CIE LAB color space"),
		z.literal("oklab").describe("OKLab color space"),
		z.literal("xyz").describe("CIE XYZ color space"),
		z.literal("xyz-d50").describe("CIE XYZ color space with D50 white point"),
		z.literal("xyz-d65").describe("CIE XYZ color space with D65 white point"),

		// Polar color spaces
		z
			.literal("hsl")
			.describe("HSL color space"),
		z.literal("hwb").describe("HWB color space"),
		z.literal("lch").describe("CIE LCH color space"),
		z.literal("oklch").describe("OKLCh color space"),

		// Hue interpolation methods
		z
			.literal("shorter")
			.describe("shorter hue interpolation (default)"),
		z.literal("longer").describe("longer hue interpolation"),
		z.literal("increasing").describe("increasing hue interpolation"),
		z.literal("decreasing").describe("decreasing hue interpolation"),
	])
	.describe(
		"Color interpolation methods specify how colors are interpolated in gradients and animations. " +
			"Can use rectangular or polar color spaces with optional hue interpolation.",
	);

/**
 * Array of all color interpolation keyword values.
 *
 * @example
 * ```typescript
 * import { COLOR_INTERPOLATION_KEYWORDS } from "@/core/keywords/color-interpolation-keywords";
 *
 * console.log(COLOR_INTERPOLATION_KEYWORDS);
 * // ["srgb", "srgb-linear", "display-p3", "hsl", "hwb", "shorter", ...]
 * ```
 *
 * @public
 */
export const COLOR_INTERPOLATION_KEYWORDS = colorInterpolationKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for color interpolation keywords.
 *
 * @public
 */
export type ColorInterpolationKeyword = z.infer<typeof colorInterpolationKeywordsSchema>;

/**
 * Metadata for color interpolation keyword options.
 *
 * Provides value and description for each keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { colorInterpolationKeywordOptions } from "@/core/keywords/color-interpolation-keywords";
 *
 * colorInterpolationKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const colorInterpolationKeywordOptions = colorInterpolationKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for color interpolation keyword options metadata.
 *
 * @public
 */
export type ColorInterpolationKeywordOptions = typeof colorInterpolationKeywordOptions;
