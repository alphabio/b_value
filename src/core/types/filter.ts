// b_path:: src/core/types/filter.ts
import { z } from "zod";
import type { Angle } from "./angle";
import type { Color } from "./color";
import type { Length } from "./length-percentage";

/**
 * CSS blur() filter function.
 *
 * Applies a Gaussian blur to the element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur}
 *
 * @example
 * ```typescript
 * import type { BlurFilter } from "@/core/types/filter";
 *
 * const filter: BlurFilter = { kind: "blur", radius: { value: 5, unit: "px" } };
 * // CSS: blur(5px)
 * ```
 *
 * @public
 */
export const blurFilterSchema = z.object({
	kind: z.literal("blur"),
	radius: z.custom<Length>(),
});

/**
 * TypeScript type for blur filter.
 * @public
 */
export type BlurFilter = z.infer<typeof blurFilterSchema>;

/**
 * CSS brightness() filter function.
 *
 * Applies a linear multiplier to the element, making it appear brighter or darker.
 * Values: number (1 = 100%) or percentage.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness}
 *
 * @example
 * ```typescript
 * import type { BrightnessFilter } from "@/core/types/filter";
 *
 * const filter1: BrightnessFilter = { kind: "brightness", value: 1.5 }; // 150%
 * const filter2: BrightnessFilter = { kind: "brightness", value: 0.5 }; // 50%
 * // CSS: brightness(1.5) or brightness(0.5)
 * ```
 *
 * @public
 */
export const brightnessFilterSchema = z.object({
	kind: z.literal("brightness"),
	value: z.number().nonnegative(), // 0 to infinity, 1 = 100%
});

/**
 * TypeScript type for brightness filter.
 * @public
 */
export type BrightnessFilter = z.infer<typeof brightnessFilterSchema>;

/**
 * CSS contrast() filter function.
 *
 * Adjusts the contrast of the element.
 * Values: number (1 = 100%) or percentage.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/contrast}
 *
 * @example
 * ```typescript
 * import type { ContrastFilter } from "@/core/types/filter";
 *
 * const filter: ContrastFilter = { kind: "contrast", value: 1.2 }; // 120%
 * // CSS: contrast(1.2)
 * ```
 *
 * @public
 */
export const contrastFilterSchema = z.object({
	kind: z.literal("contrast"),
	value: z.number().nonnegative(), // 0 to infinity, 1 = 100%
});

/**
 * TypeScript type for contrast filter.
 * @public
 */
export type ContrastFilter = z.infer<typeof contrastFilterSchema>;

/**
 * CSS grayscale() filter function.
 *
 * Converts the element to grayscale.
 * Values: number (0-1, where 1 = 100%) or percentage (0-100%).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/grayscale}
 *
 * @example
 * ```typescript
 * import type { GrayscaleFilter } from "@/core/types/filter";
 *
 * const filter: GrayscaleFilter = { kind: "grayscale", value: 0.5 }; // 50%
 * // CSS: grayscale(0.5)
 * ```
 *
 * @public
 */
export const grayscaleFilterSchema = z.object({
	kind: z.literal("grayscale"),
	value: z.number().min(0).max(1), // 0 to 1, where 1 = 100%
});

/**
 * TypeScript type for grayscale filter.
 * @public
 */
export type GrayscaleFilter = z.infer<typeof grayscaleFilterSchema>;

/**
 * CSS hue-rotate() filter function.
 *
 * Rotates the hue of the element.
 * Value: angle (deg, grad, rad, turn).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate}
 *
 * @example
 * ```typescript
 * import type { HueRotateFilter } from "@/core/types/filter";
 *
 * const filter: HueRotateFilter = { kind: "hue-rotate", angle: { value: 90, unit: "deg" } };
 * // CSS: hue-rotate(90deg)
 * ```
 *
 * @public
 */
export const hueRotateFilterSchema = z.object({
	kind: z.literal("hue-rotate"),
	angle: z.custom<Angle>(),
});

/**
 * TypeScript type for hue-rotate filter.
 * @public
 */
export type HueRotateFilter = z.infer<typeof hueRotateFilterSchema>;

/**
 * CSS invert() filter function.
 *
 * Inverts the colors of the element.
 * Values: number (0-1, where 1 = 100%) or percentage (0-100%).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert}
 *
 * @example
 * ```typescript
 * import type { InvertFilter } from "@/core/types/filter";
 *
 * const filter: InvertFilter = { kind: "invert", value: 1 }; // 100%
 * // CSS: invert(1)
 * ```
 *
 * @public
 */
export const invertFilterSchema = z.object({
	kind: z.literal("invert"),
	value: z.number().min(0).max(1), // 0 to 1, where 1 = 100%
});

/**
 * TypeScript type for invert filter.
 * @public
 */
export type InvertFilter = z.infer<typeof invertFilterSchema>;

/**
 * CSS opacity() filter function.
 *
 * Applies transparency to the element.
 * Values: number (0-1, where 1 = 100%) or percentage (0-100%).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/opacity}
 *
 * @example
 * ```typescript
 * import type { OpacityFilter } from "@/core/types/filter";
 *
 * const filter: OpacityFilter = { kind: "opacity", value: 0.5 }; // 50%
 * // CSS: opacity(0.5)
 * ```
 *
 * @public
 */
export const opacityFilterSchema = z.object({
	kind: z.literal("opacity"),
	value: z.number().min(0).max(1), // 0 to 1, where 1 = 100%
});

/**
 * TypeScript type for opacity filter.
 * @public
 */
export type OpacityFilter = z.infer<typeof opacityFilterSchema>;

/**
 * CSS saturate() filter function.
 *
 * Adjusts the saturation of the element.
 * Values: number (1 = 100%) or percentage.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate}
 *
 * @example
 * ```typescript
 * import type { SaturateFilter } from "@/core/types/filter";
 *
 * const filter: SaturateFilter = { kind: "saturate", value: 2 }; // 200%
 * // CSS: saturate(2)
 * ```
 *
 * @public
 */
export const saturateFilterSchema = z.object({
	kind: z.literal("saturate"),
	value: z.number().nonnegative(), // 0 to infinity, 1 = 100%
});

/**
 * TypeScript type for saturate filter.
 * @public
 */
export type SaturateFilter = z.infer<typeof saturateFilterSchema>;

/**
 * CSS sepia() filter function.
 *
 * Converts the element to sepia.
 * Values: number (0-1, where 1 = 100%) or percentage (0-100%).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia}
 *
 * @example
 * ```typescript
 * import type { SepiaFilter } from "@/core/types/filter";
 *
 * const filter: SepiaFilter = { kind: "sepia", value: 0.8 }; // 80%
 * // CSS: sepia(0.8)
 * ```
 *
 * @public
 */
export const sepiaFilterSchema = z.object({
	kind: z.literal("sepia"),
	value: z.number().min(0).max(1), // 0 to 1, where 1 = 100%
});

/**
 * TypeScript type for sepia filter.
 * @public
 */
export type SepiaFilter = z.infer<typeof sepiaFilterSchema>;

/**
 * CSS drop-shadow() filter function.
 *
 * Applies a drop shadow effect to the element.
 * Syntax: drop-shadow(offset-x offset-y blur-radius color)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow}
 *
 * @example
 * ```typescript
 * import type { DropShadowFilter } from "@/core/types/filter";
 *
 * const filter: DropShadowFilter = {
 *   kind: "drop-shadow",
 *   offsetX: { value: 2, unit: "px" },
 *   offsetY: { value: 2, unit: "px" },
 *   blurRadius: { value: 4, unit: "px" },
 *   color: { kind: "named", name: "black" }
 * };
 * // CSS: drop-shadow(2px 2px 4px black)
 * ```
 *
 * @public
 */
export const dropShadowFilterSchema = z.object({
	kind: z.literal("drop-shadow"),
	offsetX: z.custom<Length>(),
	offsetY: z.custom<Length>(),
	blurRadius: z.custom<Length>().optional(),
	color: z.custom<Color>().optional(),
});

/**
 * TypeScript type for drop-shadow filter.
 * @public
 */
export type DropShadowFilter = z.infer<typeof dropShadowFilterSchema>;

/**
 * CSS url() filter function.
 *
 * References an SVG filter element by URL.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/url}
 *
 * @example
 * ```typescript
 * import type { UrlFilter } from "@/core/types/filter";
 *
 * const filter: UrlFilter = { kind: "url", url: "#my-filter" };
 * // CSS: url(#my-filter)
 * ```
 *
 * @public
 */
export const urlFilterSchema = z.object({
	kind: z.literal("url"),
	url: z.string(),
});

/**
 * TypeScript type for url filter.
 * @public
 */
export type UrlFilter = z.infer<typeof urlFilterSchema>;

/**
 * Union of all CSS filter function types.
 *
 * Represents any valid CSS filter function with a discriminated union
 * on the `kind` field for type-safe narrowing.
 *
 * @example
 * ```typescript
 * import type { FilterFunction } from "@/core/types/filter";
 *
 * const filter: FilterFunction = { kind: "blur", radius: { value: 5, unit: "px" } };
 *
 * // Type narrowing with discriminated union
 * if (filter.kind === "blur") {
 *   console.log(filter.radius); // TypeScript knows this is BlurFilter
 * }
 * ```
 *
 * @public
 */
export type FilterFunction =
	| BlurFilter
	| BrightnessFilter
	| ContrastFilter
	| GrayscaleFilter
	| HueRotateFilter
	| InvertFilter
	| OpacityFilter
	| SaturateFilter
	| SepiaFilter
	| DropShadowFilter
	| UrlFilter;
