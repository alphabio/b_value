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
 * import { blendModeKeywordsSchema } from "@/core/keywords/blend-mode-keywords";
 *
 * const keyword = blendModeKeywordsSchema.parse("multiply"); // "multiply"
 * ```
 *
 * @public
 */
export const blendModeKeywordsSchema = z.enum(
	[
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity",
	],
	{
		error: () => ({
			message:
				"Expected normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity",
		}),
	},
);

/**
 * Array of all blend mode keyword values.
 *
 * @example
 * ```typescript
 * import { BLEND_MODE_KEYWORDS } from "@/core/keywords/blend-mode-keywords";
 *
 * console.log(BLEND_MODE_KEYWORDS);
 * // ["normal", "multiply", "screen", "overlay", "darken", "lighten", ...]
 * ```
 *
 * @public
 */
export const BLEND_MODE_KEYWORDS = blendModeKeywordsSchema.options;

/**
 * TypeScript type for blend mode keywords.
 *
 * @public
 */
export type BlendModeKeyword = z.infer<typeof blendModeKeywordsSchema>;

/**
 * Descriptions for blend mode keywords.
 *
 * @internal
 */
const BLEND_MODE_DESCRIPTIONS: Record<BlendModeKeyword, string> = {
	normal: "top color, regardless of bottom color",
	multiply: "result of multiplying top and bottom colors",
	screen: "result of inverting colors, multiplying, and inverting",
	overlay: "multiply if bottom darker, screen if bottom lighter",
	darken: "darkest values of each color channel",
	lighten: "lightest values of each color channel",
	"color-dodge": "dividing bottom color by inverse of top color",
	"color-burn": "inverting bottom, dividing by top, inverting result",
	"hard-light": "multiply if top darker, screen if top lighter",
	"soft-light": "similar to hard-light but softer",
	difference: "subtracting darker color from lighter",
	exclusion: "similar to difference but with less contrast",
	hue: "hue of top color, saturation and luminosity of bottom",
	saturation: "saturation of top color, hue and luminosity of bottom",
	color: "hue and saturation of top, luminosity of bottom",
	luminosity: "luminosity of top, hue and saturation of bottom",
};

/**
 * Metadata for blend mode keyword options.
 *
 * Provides value and description for each blend mode keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { blendModeKeywordOptions } from "@/core/keywords/blend-mode-keywords";
 *
 * blendModeKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const blendModeKeywordOptions = BLEND_MODE_KEYWORDS.map((value) => ({
	value,
	description: BLEND_MODE_DESCRIPTIONS[value],
}));

/**
 * Type for blend mode keyword options metadata.
 *
 * @public
 */
export type BlendModeKeywordOptions = typeof blendModeKeywordOptions;
