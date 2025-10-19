// b_path:: src/parse/filter/index.ts
import type { Result } from "@/core/result";
import { err } from "@/core/result";
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
 * Parse a CSS filter function in any supported format.
 *
 * Automatically detects and parses the filter function type by name:
 * - `blur()` - Gaussian blur with length radius
 * - `brightness()` - Linear brightness multiplier
 * - `contrast()` - Contrast adjustment
 * - `drop-shadow()` - Drop shadow effect with offsets, blur, and color
 * - `grayscale()` - Convert to grayscale
 * - `hue-rotate()` - Rotate hue by angle
 * - `invert()` - Invert colors
 * - `opacity()` - Apply transparency
 * - `saturate()` - Adjust saturation
 * - `sepia()` - Convert to sepia
 * - `url()` - Reference SVG filter
 *
 * @param input - The CSS filter function string to parse
 * @returns Result containing the parsed FilterFunction or error message
 *
 * @example
 * ```typescript
 * import { Filter } from "@/parse/filter";
 *
 * // Blur filter
 * const blur = Filter.parse("blur(5px)");
 * // => { ok: true, value: { kind: "blur", radius: { value: 5, unit: "px" } } }
 *
 * // Brightness filter
 * const brightness = Filter.parse("brightness(1.5)");
 * // => { ok: true, value: { kind: "brightness", value: 1.5 } }
 *
 * // Drop shadow filter
 * const shadow = Filter.parse("drop-shadow(2px 2px 4px black)");
 * // => { ok: true, value: { kind: "drop-shadow", offsetX: ..., offsetY: ..., blurRadius: ..., color: ... } }
 *
 * // URL filter
 * const urlFilter = Filter.parse("url(#filter-id)");
 * // => { ok: true, value: { kind: "url", url: "#filter-id" } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<FilterFunction, string> {
	const trimmed = input.trim().toLowerCase();

	// Detect function name and dispatch to appropriate parser
	if (trimmed.startsWith("blur(")) {
		return Blur.parse(input);
	}
	if (trimmed.startsWith("brightness(")) {
		return Brightness.parse(input);
	}
	if (trimmed.startsWith("contrast(")) {
		return Contrast.parse(input);
	}
	if (trimmed.startsWith("drop-shadow(")) {
		return DropShadow.parse(input);
	}
	if (trimmed.startsWith("grayscale(")) {
		return Grayscale.parse(input);
	}
	if (trimmed.startsWith("hue-rotate(")) {
		return HueRotate.parse(input);
	}
	if (trimmed.startsWith("invert(")) {
		return Invert.parse(input);
	}
	if (trimmed.startsWith("opacity(")) {
		return Opacity.parse(input);
	}
	if (trimmed.startsWith("saturate(")) {
		return Saturate.parse(input);
	}
	if (trimmed.startsWith("sepia(")) {
		return Sepia.parse(input);
	}
	if (trimmed.startsWith("url(")) {
		return Url.parse(input);
	}

	return err(`Unknown filter function: ${input}`);
}

/**
 * Filter parsing utilities and individual parsers.
 *
 * Provides both a master parser that auto-detects filter types
 * and individual parsers for specific filter functions.
 *
 * @example
 * ```typescript
 * import { Filter } from "@/parse/filter";
 *
 * // Use master parser (auto-detects type)
 * const filter = Filter.parse("blur(5px)");
 *
 * // Use specific parser
 * const blur = Filter.blur.parse("blur(5px)");
 * const brightness = Filter.brightness.parse("brightness(1.5)");
 * ```
 *
 * @public
 */
export const Filter = {
	parse,
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
