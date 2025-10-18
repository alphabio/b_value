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
 * CSS color value.
 *
 * Discriminated union of all supported CSS color formats.
 * Currently supports hex, named, and RGB colors. Will be extended in future sessions
 * to include hsl, hwb, lab, lch, oklab, oklch, and color functions.
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
 * ```
 *
 * @public
 */
export const colorSchema = z.union([hexColorSchema, namedColorSchema, rgbColorSchema]);

/**
 * TypeScript type for color value.
 * @public
 */
export type Color = z.infer<typeof colorSchema>;
