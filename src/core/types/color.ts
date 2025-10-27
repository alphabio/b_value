// b_path:: src/core/types/color.ts
import { z } from "zod";

/**
 * CSS hex color value.
 *
 * Represents a color in hexadecimal notation: #RGB, #RRGGBB, #RGBA, or #RRGGBBAA.
 * Values are always normalized to uppercase #RRGGBB or #RRGGBBAA format.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color}
 *
 * @example
 * ```typescript
 * import type { HexColor } from "@/core/types/color";
 *
 * const color1: HexColor = { kind: "hex", value: "#FF5733" };
 * const color2: HexColor = { kind: "hex", value: "#FF573380" }; // with alpha
 * ```
 *
 * @public
 */
export const hexColorSchema = z.object({
	kind: z.literal("hex"),
	value: z.string().regex(/^#[0-9A-F]{6}([0-9A-F]{2})?$/), // #RRGGBB or #RRGGBBAA (uppercase)
});

/**
 * TypeScript type for hex color.
 * @public
 */
export type HexColor = z.infer<typeof hexColorSchema>;

/**
 * CSS named color value.
 *
 * Represents a color using a CSS color keyword name.
 * Includes basic colors (red, blue, etc.) and extended X11/SVG colors.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/named-color}
 *
 * @example
 * ```typescript
 * import type { NamedColor } from "@/core/types/color";
 *
 * const color1: NamedColor = { kind: "named", name: "red" };
 * const color2: NamedColor = { kind: "named", name: "cornflowerblue" };
 * ```
 *
 * @public
 */
export const namedColorSchema = z.object({
	kind: z.literal("named"),
	name: z.string(), // validated against keyword list at parse time
});

/**
 * TypeScript type for named color.
 * @public
 */
export type NamedColor = z.infer<typeof namedColorSchema>;

/**
 * CSS RGB color value.
 *
 * Represents a color in RGB (Red, Green, Blue) color space.
 * Supports optional alpha channel for transparency.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb}
 *
 * @example
 * ```typescript
 * import type { RGBColor } from "@/core/types/color";
 *
 * // Opaque color
 * const color1: RGBColor = { kind: "rgb", r: 255, g: 87, b: 51 };
 *
 * // With alpha
 * const color2: RGBColor = { kind: "rgb", r: 255, g: 87, b: 51, alpha: 0.5 };
 * ```
 *
 * @public
 */
export const rgbColorSchema = z.object({
	kind: z.literal("rgb"),
	r: z.number().min(0).max(255),
	g: z.number().min(0).max(255),
	b: z.number().min(0).max(255),
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for RGB color.
 * @public
 */
export type RGBColor = z.infer<typeof rgbColorSchema>;

/**
 * CSS HSL color value.
 *
 * Represents a color in HSL (Hue, Saturation, Lightness) color space.
 * Hue is normalized to 0-360 degrees. Supports optional alpha channel.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl}
 *
 * @example
 * ```typescript
 * import type { HSLColor } from "@/core/types/color";
 *
 * // Opaque color
 * const color1: HSLColor = { kind: "hsl", h: 120, s: 100, l: 50 };
 *
 * // With alpha
 * const color2: HSLColor = { kind: "hsl", h: 120, s: 100, l: 50, alpha: 0.5 };
 * ```
 *
 * @public
 */
export const hslColorSchema = z.object({
	kind: z.literal("hsl"),
	h: z.number(), // degrees 0-360 (wraps around)
	s: z.number().min(0).max(100), // saturation percentage
	l: z.number().min(0).max(100), // lightness percentage
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for HSL color.
 * @public
 */
export type HSLColor = z.infer<typeof hslColorSchema>;

/**
 * CSS HWB color value.
 *
 * Represents a color in HWB (Hue, Whiteness, Blackness) color space.
 * Hue is normalized to 0-360 degrees. Whiteness and blackness are percentages.
 * Supports optional alpha channel.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb}
 *
 * @example
 * ```typescript
 * import type { HWBColor } from "@/core/types/color";
 *
 * // Opaque color
 * const color1: HWBColor = { kind: "hwb", h: 120, w: 20, b: 30 };
 *
 * // With alpha
 * const color2: HWBColor = { kind: "hwb", h: 120, w: 20, b: 30, alpha: 0.5 };
 * ```
 *
 * @public
 */
export const hwbColorSchema = z.object({
	kind: z.literal("hwb"),
	h: z.number(), // degrees 0-360 (wraps around)
	w: z.number().min(0).max(100), // whiteness percentage
	b: z.number().min(0).max(100), // blackness percentage
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for HWB color.
 * @public
 */
export type HWBColor = z.infer<typeof hwbColorSchema>;

/**
 * CSS LAB color value.
 *
 * Represents a color in CIE LAB (Lightness, a, b) color space.
 * LAB is a perceptual color space where distances correspond to perceived color differences.
 * Supports optional alpha channel.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab}
 *
 * @example
 * ```typescript
 * import type { LABColor } from "@/core/types/color";
 *
 * // Opaque color
 * const color1: LABColor = { kind: "lab", l: 50, a: -20, b: 30 };
 *
 * // With alpha
 * const color2: LABColor = { kind: "lab", l: 50, a: -20, b: 30, alpha: 0.5 };
 * ```
 *
 * @public
 */
export const labColorSchema = z.object({
	kind: z.literal("lab"),
	l: z.number().min(0).max(100), // lightness percentage
	a: z.number().min(-125).max(125), // green-red axis
	b: z.number().min(-125).max(125), // blue-yellow axis
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for LAB color.
 * @public
 */
export type LABColor = z.infer<typeof labColorSchema>;

/**
 * CSS LCH color value.
 *
 * Represents a color in CIE LCH (Lightness, Chroma, Hue) color space.
 * LCH is the cylindrical representation of LAB color space.
 * Hue is normalized to 0-360 degrees. Supports optional alpha channel.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch}
 *
 * @example
 * ```typescript
 * import type { LCHColor } from "@/core/types/color";
 *
 * // Opaque color
 * const color1: LCHColor = { kind: "lch", l: 50, c: 50, h: 180 };
 *
 * // With alpha
 * const color2: LCHColor = { kind: "lch", l: 50, c: 50, h: 180, alpha: 0.5 };
 * ```
 *
 * @public
 */
export const lchColorSchema = z.object({
	kind: z.literal("lch"),
	l: z.number().min(0).max(100), // lightness percentage
	c: z.number().min(0).max(150), // chroma
	h: z.number(), // hue degrees 0-360 (wraps around)
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for LCH color.
 * @public
 */
export type LCHColor = z.infer<typeof lchColorSchema>;

/**
 * CSS OKLab color value.
 *
 * Represents a color in OKLab (Oklab Lightness, a, b) color space.
 * OKLab is a perceptual color space designed for better perceptual uniformity than CIE LAB.
 * Supports optional alpha channel.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklab}
 *
 * @example
 * ```typescript
 * import type { OKLabColor } from "@/core/types/color";
 *
 * // Opaque color
 * const color1: OKLabColor = { kind: "oklab", l: 0.5, a: -0.2, b: 0.3 };
 *
 * // With alpha
 * const color2: OKLabColor = { kind: "oklab", l: 0.5, a: -0.2, b: 0.3, alpha: 0.5 };
 * ```
 *
 * @public
 */
export const oklabColorSchema = z.object({
	kind: z.literal("oklab"),
	l: z.number().min(0).max(1), // lightness 0-1 (or 0-100% at parse time)
	a: z.number().min(-0.4).max(0.4), // green-red axis
	b: z.number().min(-0.4).max(0.4), // blue-yellow axis
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for OKLab color.
 * @public
 */
export type OKLabColor = z.infer<typeof oklabColorSchema>;

/**
 * CSS OKLCH color value.
 *
 * Represents a color in OKLCH (Oklab Lightness, Chroma, Hue) color space.
 * OKLCH is the cylindrical representation of OKLab color space.
 * Hue is normalized to 0-360 degrees. Supports optional alpha channel.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch}
 *
 * @example
 * ```typescript
 * import type { OKLCHColor } from "@/core/types/color";
 *
 * // Opaque color
 * const color1: OKLCHColor = { kind: "oklch", l: 0.5, c: 0.2, h: 180 };
 *
 * // With alpha
 * const color2: OKLCHColor = { kind: "oklch", l: 0.5, c: 0.2, h: 180, alpha: 0.5 };
 * ```
 *
 * @public
 */
export const oklchColorSchema = z.object({
	kind: z.literal("oklch"),
	l: z.number().min(0).max(1), // lightness 0-1 (or 0-100% at parse time)
	c: z.number().min(0).max(0.4), // chroma
	h: z.number(), // hue degrees 0-360 (wraps around)
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for OKLCH color.
 * @public
 */
export type OKLCHColor = z.infer<typeof oklchColorSchema>;

/**
 * CSS system color value.
 *
 * Represents a system color using a CSS system color keyword.
 * System colors integrate with the user's operating system or browser theme.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/#css-system-colors}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/system-color}
 *
 * @example
 * ```typescript
 * import type { SystemColor } from "@/core/types/color";
 *
 * const color1: SystemColor = { kind: "system", keyword: "ButtonText" };
 * const color2: SystemColor = { kind: "system", keyword: "Canvas" };
 * ```
 *
 * @public
 */
export const systemColorSchema = z.object({
	kind: z.literal("system"),
	keyword: z.string(), // validated against system color keyword list at parse time
});

/**
 * TypeScript type for system color.
 * @public
 */
export type SystemColor = z.infer<typeof systemColorSchema>;

/**
 * CSS special color value.
 *
 * Represents special CSS color keywords with unique behavior.
 * - `transparent`: Fully transparent color (rgba(0, 0, 0, 0))
 * - `currentcolor`: Uses the current value of the color property
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
 *
 * @example
 * ```typescript
 * import type { SpecialColor } from "@/core/types/color";
 *
 * const color1: SpecialColor = { kind: "special", keyword: "transparent" };
 * const color2: SpecialColor = { kind: "special", keyword: "currentcolor" };
 * ```
 *
 * @public
 */
export const specialColorSchema = z.object({
	kind: z.literal("special"),
	keyword: z.enum(["transparent", "currentcolor"]),
});

/**
 * TypeScript type for special color.
 * @public
 */
export type SpecialColor = z.infer<typeof specialColorSchema>;

/**
 * CSS color() function with explicit color space.
 *
 * Represents a color in a specific color space with explicit channel values.
 * Supports wide-gamut color spaces like display-p3 and professional spaces.
 *
 * Syntax: color(colorspace c1 c2 c3 [ / alpha ]?)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color}
 *
 * @example
 * ```typescript
 * import type { ColorFunction } from "@/core/types/color";
 *
 * // Display P3 color
 * const color1: ColorFunction = {
 *   kind: "color",
 *   colorSpace: "display-p3",
 *   channels: [0.928, 0.322, 0.203],
 *   alpha: 0.8
 * };
 *
 * // sRGB linear
 * const color2: ColorFunction = {
 *   kind: "color",
 *   colorSpace: "srgb-linear",
 *   channels: [0.5, 0.2, 0.8]
 * };
 * ```
 *
 * @public
 */
export const colorFunctionSchema = z.object({
	kind: z.literal("color"),
	colorSpace: z.enum([
		"srgb",
		"srgb-linear",
		"display-p3",
		"a98-rgb",
		"prophoto-rgb",
		"rec2020",
		"xyz",
		"xyz-d50",
		"xyz-d65",
	]),
	channels: z.tuple([z.number(), z.number(), z.number()]),
	alpha: z.number().min(0).max(1).optional(),
});

/**
 * TypeScript type for color() function.
 * @public
 */
export type ColorFunction = z.infer<typeof colorFunctionSchema>;

/**
 * CSS color value.
 *
 * Discriminated union of all supported CSS color formats.
 * Supports hex, named, RGB, HSL, HWB, LAB, LCH, OKLab, OKLCH, system, special, and color() function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
 *
 * @example
 * ```typescript
 * import type { Color } from "@/core/types/color";
 *
 * const hex: Color = { kind: "hex", value: "#FF5733" };
 * const named: Color = { kind: "named", name: "red" };
 * const rgb: Color = { kind: "rgb", r: 255, g: 87, b: 51 };
 * const hsl: Color = { kind: "hsl", h: 120, s: 100, l: 50 };
 * const hwb: Color = { kind: "hwb", h: 120, w: 20, b: 30 };
 * const lab: Color = { kind: "lab", l: 50, a: -20, b: 30 };
 * const lch: Color = { kind: "lch", l: 50, c: 50, h: 180 };
 * const oklab: Color = { kind: "oklab", l: 0.5, a: -0.2, b: 0.3 };
 * const oklch: Color = { kind: "oklch", l: 0.5, c: 0.2, h: 180 };
 * const system: Color = { kind: "system", keyword: "ButtonText" };
 * const special: Color = { kind: "special", keyword: "transparent" };
 * const colorFn: Color = { kind: "color", colorSpace: "display-p3", channels: [0.928, 0.322, 0.203] };
 * ```
 *
 * @public
 */
export const colorSchema = z.union([
	hexColorSchema,
	namedColorSchema,
	rgbColorSchema,
	hslColorSchema,
	hwbColorSchema,
	labColorSchema,
	lchColorSchema,
	oklabColorSchema,
	oklchColorSchema,
	systemColorSchema,
	specialColorSchema,
	colorFunctionSchema,
]);

/**
 * TypeScript type for color value.
 *
 *
 * @public
 */
export type Color = z.infer<typeof colorSchema>;

/**
 * Type guard helper for narrowing Color discriminated union.
 *
 * @example
 * ```typescript
 * const parsed = Parse.Color.parse("color(display-p3 1 0.5 0)");
 * if (parsed.ok && isColorKind(parsed.value, "color")) {
 *   // TypeScript knows parsed.value is ColorFunction
 *   console.log(parsed.value.colorSpace); // no need for manual kind check
 * }
 * ```
 *
 * @public
 */
export function isColorKind<K extends Color["kind"]>(color: Color, kind: K): color is Extract<Color, { kind: K }> {
	return color.kind === kind;
}

/**
 * Assertion function that narrows Color to ColorFunction.
 * Throws if the color is not a color() function.
 *
 * @example
 * ```typescript
 * const parsed = Parse.Color.parse("color(display-p3 1 0.5 0)");
 * if (parsed.ok) {
 *   assertColorFunction(parsed.value);
 *   // TypeScript now knows parsed.value is ColorFunction
 *   console.log(parsed.value.colorSpace); // works!
 * }
 * ```
 *
 * @public
 */
export function assertColorFunction(color: Color): asserts color is ColorFunction {
	if (color.kind !== "color") {
		throw new TypeError(`Expected color() function, got ${color.kind}`);
	}
}
