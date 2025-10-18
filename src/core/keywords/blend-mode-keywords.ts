// b_path:: src/core/keywords/blend-mode-keywords.ts
import { z } from "zod";

/**
 * CSS blend mode keywords.
 *
 * Blend modes describe how colors should appear when elements overlap.
 * Each mode defines a different way to combine the top and bottom colors.
 *
 * Used in:
 * - `background-blend-mode` - Blending between background layers
 * - `mix-blend-mode` - Blending an element with its backdrop
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode}
 *
 * @example
 * ```typescript
 * import { blendModeKeywordsSchema } from "../keywords/blend-mode-keywords";
 *
 * const keyword = blendModeKeywordsSchema.parse("multiply"); // "multiply"
 * ```
 *
 * @public
 */
export const blendModeKeywordsSchema = z
	.union([
		z.literal("normal").describe("top color, regardless of bottom color"),
		z.literal("multiply").describe("result of multiplying top and bottom colors"),
		z.literal("screen").describe("result of inverting colors, multiplying, and inverting"),
		z.literal("overlay").describe("multiply if bottom darker, screen if bottom lighter"),
		z.literal("darken").describe("darkest values of each color channel"),
		z.literal("lighten").describe("lightest values of each color channel"),
		z.literal("color-dodge").describe("dividing bottom color by inverse of top color"),
		z.literal("color-burn").describe("inverting bottom, dividing by top, inverting result"),
		z.literal("hard-light").describe("multiply if top darker, screen if top lighter"),
		z.literal("soft-light").describe("similar to hard-light but softer"),
		z.literal("difference").describe("subtracting darker color from lighter"),
		z.literal("exclusion").describe("similar to difference but with less contrast"),
		z.literal("hue").describe("hue of top color, saturation and luminosity of bottom"),
		z.literal("saturation").describe("saturation of top color, hue and luminosity of bottom"),
		z.literal("color").describe("hue and saturation of top, luminosity of bottom"),
		z.literal("luminosity").describe("luminosity of top, hue and saturation of bottom"),
	])
	.describe(
		"Blend modes describe how colors should appear when elements overlap. " +
			"Used in background-blend-mode and mix-blend-mode properties.",
	);

/**
 * Array of all blend mode keyword values.
 *
 * @example
 * ```typescript
 * import { BLEND_MODE_KEYWORDS } from "../keywords/blend-mode-keywords";
 *
 * console.log(BLEND_MODE_KEYWORDS);
 * // ["normal", "multiply", "screen", "overlay", "darken", "lighten", ...]
 * ```
 *
 * @public
 */
export const BLEND_MODE_KEYWORDS = blendModeKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for blend mode keywords.
 *
 * @public
 */
export type BlendModeKeyword = z.infer<typeof blendModeKeywordsSchema>;

/**
 * Metadata for blend mode keyword options.
 *
 * Provides value and description for each blend mode keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { blendModeKeywordOptions } from "../keywords/blend-mode-keywords";
 *
 * blendModeKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const blendModeKeywordOptions = blendModeKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for blend mode keyword options metadata.
 *
 * @public
 */
export type BlendModeKeywordOptions = typeof blendModeKeywordOptions;
