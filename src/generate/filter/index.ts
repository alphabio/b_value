// b_path:: src/generate/filter/index.ts
import type { FilterFunction } from "@/core/types/filter";
import * as Blur from "./blur";
import * as Brightness from "./brightness";
import * as Contrast from "./contrast";
import * as DropShadow from "./drop-shadow";
import * as Grayscale from "./grayscale";
import * as HueRotate from "./hue-rotate";
import * as Invert from "./invert";
import * as Opacity from "./opacity";
import * as Saturate from "./saturate";
import * as Sepia from "./sepia";
import * as Url from "./url";

/**
 * Generate CSS from a FilterFunction IR value.
 *
 * Converts any filter function format back to its CSS string representation.
 * Uses the discriminated union `kind` field to dispatch to the appropriate generator.
 *
 * @param filter - The filter IR to convert
 * @returns CSS filter function string
 *
 * @example
 * ```typescript
 * import { Filter } from "@/generate/filter";
 *
 * // Blur filter
 * const blur = Filter.toCss({ kind: "blur", radius: { value: 5, unit: "px" } });
 * // => "blur(5px)"
 *
 * // Brightness filter
 * const brightness = Filter.toCss({ kind: "brightness", value: 1.5 });
 * // => "brightness(1.5)"
 *
 * // Drop shadow filter
 * const shadow = Filter.toCss({
 *   kind: "drop-shadow",
 *   offsetX: { value: 2, unit: "px" },
 *   offsetY: { value: 2, unit: "px" },
 *   blurRadius: { value: 4, unit: "px" },
 *   color: { kind: "named", name: "black" }
 * });
 * // => "drop-shadow(2px 2px 4px black)"
 *
 * // URL filter
 * const url = Filter.toCss({ kind: "url", url: "#filter-id" });
 * // => "url(#filter-id)"
 * ```
 *
 * @public
 */
export function toCss(filter: FilterFunction): string {
	switch (filter.kind) {
		case "blur":
			return Blur.toCss(filter);
		case "brightness":
			return Brightness.toCss(filter);
		case "contrast":
			return Contrast.toCss(filter);
		case "drop-shadow":
			return DropShadow.toCss(filter);
		case "grayscale":
			return Grayscale.toCss(filter);
		case "hue-rotate":
			return HueRotate.toCss(filter);
		case "invert":
			return Invert.toCss(filter);
		case "opacity":
			return Opacity.toCss(filter);
		case "saturate":
			return Saturate.toCss(filter);
		case "sepia":
			return Sepia.toCss(filter);
		case "url":
			return Url.toCss(filter);
	}
}

/**
 * Filter generation utilities and individual generators.
 *
 * Provides both a master generator that handles all filter types
 * and individual generators for specific filter functions.
 *
 * @example
 * ```typescript
 * import { Filter } from "@/generate/filter";
 *
 * // Use master generator (handles any filter type)
 * const css = Filter.toCss({ kind: "blur", radius: { value: 5, unit: "px" } });
 *
 * // Use specific generator
 * const blur = Filter.blur.toCss({ kind: "blur", radius: { value: 5, unit: "px" } });
 * const brightness = Filter.brightness.toCss({ kind: "brightness", value: 1.5 });
 * ```
 *
 * @public
 */
export const Filter = {
	toCss,
	blur: Blur,
	brightness: Brightness,
	contrast: Contrast,
	dropShadow: DropShadow,
	grayscale: Grayscale,
	hueRotate: HueRotate,
	invert: Invert,
	opacity: Opacity,
	saturate: Saturate,
	sepia: Sepia,
	url: Url,
};
