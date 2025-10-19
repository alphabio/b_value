// b_path:: src/parse/text/color.ts
import { err, type Result } from "@/core/result";
import type { Color } from "@/core/types/color";
import * as ColorParsers from "../color";

/**
 * Parse text-decoration-color value.
 *
 * Parses CSS text-decoration-color values that set the color of text decorations
 * (underline, overline, line-through). Supports all CSS color formats.
 *
 * @param css - CSS string containing text-decoration-color value
 * @returns Result containing Color IR, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Text.Color.parse("red");
 * if (result.ok) {
 *   console.log(result.value); // { kind: "named", name: "red" }
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color | MDN: text-decoration-color}
 */
export function parse(css: string): Result<Color, string> {
	// Try hex color
	const hexResult = ColorParsers.Hex.parse(css);
	if (hexResult.ok) return hexResult;

	// Try named color
	const namedResult = ColorParsers.Named.parse(css);
	if (namedResult.ok) return namedResult;

	// Try RGB
	const rgbResult = ColorParsers.Rgb.parse(css);
	if (rgbResult.ok) return rgbResult;

	// Try HSL
	const hslResult = ColorParsers.Hsl.parse(css);
	if (hslResult.ok) return hslResult;

	// Try HWB
	const hwbResult = ColorParsers.Hwb.parse(css);
	if (hwbResult.ok) return hwbResult;

	// Try LAB
	const labResult = ColorParsers.Lab.parse(css);
	if (labResult.ok) return labResult;

	// Try LCH
	const lchResult = ColorParsers.Lch.parse(css);
	if (lchResult.ok) return lchResult;

	// Try OKLab
	const oklabResult = ColorParsers.Oklab.parse(css);
	if (oklabResult.ok) return oklabResult;

	// Try OKLCH
	const oklchResult = ColorParsers.Oklch.parse(css);
	if (oklchResult.ok) return oklchResult;

	// Try system color
	const systemResult = ColorParsers.System.parse(css);
	if (systemResult.ok) return systemResult;

	// Try special color
	const specialResult = ColorParsers.Special.parse(css);
	if (specialResult.ok) return specialResult;

	return err(`Invalid text-decoration-color: "${css}"`);
}
