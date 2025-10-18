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
 * CSS color value.
 *
 * Discriminated union of all supported CSS color formats.
 * Currently supports hex, named, RGB, and HSL colors. Will be extended in future sessions
 * to include hwb, lab, lch, oklab, oklch, and color functions.
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
 * ```
 *
 * @public
 */
export const colorSchema = z.union([hexColorSchema, namedColorSchema, rgbColorSchema, hslColorSchema]);

/**
 * TypeScript type for color value.
 * @public
 */
export type Color = z.infer<typeof colorSchema>;
