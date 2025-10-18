// b_path:: src/core/keywords/color-value-keywords.ts
import { z } from "zod";

/**
 * CSS hex color pattern.
 *
 * Matches 3, 4, 6, or 8 digit hex colors with # prefix.
 * Supports alpha channel (4 and 8 digit formats).
 *
 * @example
 * ```typescript
 * "#f00"      // 3-digit
 * "#ff0000"   // 6-digit
 * "#f00f"     // 4-digit with alpha
 * "#ff0000ff" // 8-digit with alpha
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color}
 * @public
 */
export const hexColorKeywordsSchema = z
	.string()
	.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/)
	.describe("CSS hex color");

/**
 * CSS rgb() or rgba() function pattern.
 *
 * Simplified pattern for rgb() and rgba() functions.
 * Supports both legacy comma syntax and modern space syntax.
 *
 * @example
 * ```typescript
 * "rgb(255, 0, 0)"          // Legacy comma syntax
 * "rgba(255, 0, 0, 0.5)"    // Legacy with alpha
 * "rgb(255 0 0)"            // Modern space syntax
 * "rgb(255 0 0 / 0.5)"      // Modern with alpha
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb}
 * @public
 */
export const rgbColorKeywordsSchema = z
	.string()
	.regex(/^rgba?\(\s*\d+\s*(?:,\s*\d+\s*,\s*\d+|[\s]+\d+[\s]+\d+)\s*(?:[,/]\s*[\d.]+\s*)?\)$/)
	.describe("CSS rgb() or rgba() function");

/**
 * CSS hsl() or hsla() function pattern.
 *
 * Simplified pattern for hsl() and hsla() functions.
 * Supports both legacy comma syntax and modern space syntax.
 *
 * @example
 * ```typescript
 * "hsl(0, 100%, 50%)"       // Legacy comma syntax
 * "hsla(0, 100%, 50%, 0.5)" // Legacy with alpha
 * "hsl(0 100% 50%)"         // Modern space syntax
 * "hsl(0 100% 50% / 0.5)"   // Modern with alpha
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl}
 * @public
 */
export const hslColorKeywordsSchema = z
	.string()
	.regex(/^hsla?\(\s*\d+\s*(?:,\s*\d+%\s*,\s*\d+%|[\s]+\d+%[\s]+\d+%)\s*(?:[,/]\s*[\d.]+\s*)?\)$/)
	.describe("CSS hsl() or hsla() function");

/**
 * All CSS named colors (special + basic + extended = ~148 colors).
 *
 * Complete set of named colors supported in CSS Color Module Level 4.
 * Colors are case-insensitive in CSS - normalize to lowercase before validation.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/#named-colors}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/named-color}
 * @public
 */
export const namedColorKeywordsSchema = z
	.union([
		z.literal("transparent"),
		z.literal("currentcolor"),
		z.literal("black"),
		z.literal("white"),
		z.literal("red"),
		z.literal("green"),
		z.literal("blue"),
		z.literal("yellow"),
		z.literal("orange"),
		z.literal("purple"),
		z.literal("pink"),
		z.literal("brown"),
		z.literal("gray"),
		z.literal("grey"),
		z.literal("silver"),
		z.literal("gold"),
		z.literal("navy"),
		z.literal("teal"),
		z.literal("lime"),
		z.literal("aqua"),
		z.literal("fuchsia"),
		z.literal("maroon"),
		z.literal("olive"),
		z.literal("cyan"),
		z.literal("aliceblue"),
		z.literal("antiquewhite"),
		z.literal("aquamarine"),
		z.literal("azure"),
		z.literal("beige"),
		z.literal("bisque"),
		z.literal("blanchedalmond"),
		z.literal("blueviolet"),
		z.literal("burlywood"),
		z.literal("cadetblue"),
		z.literal("chartreuse"),
		z.literal("chocolate"),
		z.literal("coral"),
		z.literal("cornflowerblue"),
		z.literal("cornsilk"),
		z.literal("crimson"),
		z.literal("darkblue"),
		z.literal("darkcyan"),
		z.literal("darkgoldenrod"),
		z.literal("darkgray"),
		z.literal("darkgrey"),
		z.literal("darkgreen"),
		z.literal("darkkhaki"),
		z.literal("darkmagenta"),
		z.literal("darkolivegreen"),
		z.literal("darkorange"),
		z.literal("darkorchid"),
		z.literal("darkred"),
		z.literal("darksalmon"),
		z.literal("darkseagreen"),
		z.literal("darkslateblue"),
		z.literal("darkslategray"),
		z.literal("darkslategrey"),
		z.literal("darkturquoise"),
		z.literal("darkviolet"),
		z.literal("deeppink"),
		z.literal("deepskyblue"),
		z.literal("dimgray"),
		z.literal("dimgrey"),
		z.literal("dodgerblue"),
		z.literal("firebrick"),
		z.literal("floralwhite"),
		z.literal("forestgreen"),
		z.literal("gainsboro"),
		z.literal("ghostwhite"),
		z.literal("goldenrod"),
		z.literal("greenyellow"),
		z.literal("honeydew"),
		z.literal("hotpink"),
		z.literal("indianred"),
		z.literal("indigo"),
		z.literal("ivory"),
		z.literal("khaki"),
		z.literal("lavender"),
		z.literal("lavenderblush"),
		z.literal("lawngreen"),
		z.literal("lemonchiffon"),
		z.literal("lightblue"),
		z.literal("lightcoral"),
		z.literal("lightcyan"),
		z.literal("lightgoldenrodyellow"),
		z.literal("lightgray"),
		z.literal("lightgrey"),
		z.literal("lightgreen"),
		z.literal("lightpink"),
		z.literal("lightsalmon"),
		z.literal("lightseagreen"),
		z.literal("lightskyblue"),
		z.literal("lightslategray"),
		z.literal("lightslategrey"),
		z.literal("lightsteelblue"),
		z.literal("lightyellow"),
		z.literal("limegreen"),
		z.literal("linen"),
		z.literal("magenta"),
		z.literal("mediumaquamarine"),
		z.literal("mediumblue"),
		z.literal("mediumorchid"),
		z.literal("mediumpurple"),
		z.literal("mediumseagreen"),
		z.literal("mediumslateblue"),
		z.literal("mediumspringgreen"),
		z.literal("mediumturquoise"),
		z.literal("mediumvioletred"),
		z.literal("midnightblue"),
		z.literal("mintcream"),
		z.literal("mistyrose"),
		z.literal("moccasin"),
		z.literal("navajowhite"),
		z.literal("oldlace"),
		z.literal("olivedrab"),
		z.literal("orangered"),
		z.literal("orchid"),
		z.literal("palegoldenrod"),
		z.literal("palegreen"),
		z.literal("paleturquoise"),
		z.literal("palevioletred"),
		z.literal("papayawhip"),
		z.literal("peachpuff"),
		z.literal("peru"),
		z.literal("plum"),
		z.literal("powderblue"),
		z.literal("rebeccapurple"),
		z.literal("rosybrown"),
		z.literal("royalblue"),
		z.literal("saddlebrown"),
		z.literal("salmon"),
		z.literal("sandybrown"),
		z.literal("seagreen"),
		z.literal("seashell"),
		z.literal("sienna"),
		z.literal("skyblue"),
		z.literal("slateblue"),
		z.literal("slategray"),
		z.literal("slategrey"),
		z.literal("snow"),
		z.literal("springgreen"),
		z.literal("steelblue"),
		z.literal("tan"),
		z.literal("thistle"),
		z.literal("tomato"),
		z.literal("turquoise"),
		z.literal("violet"),
		z.literal("wheat"),
		z.literal("whitesmoke"),
		z.literal("yellowgreen"),
	])
	.describe("CSS named colors");

/**
 * Complete CSS color value.
 *
 * Supports all common CSS color formats:
 * - Named colors (transparent, currentColor, red, etc.)
 * - Hex colors (#RGB, #RRGGBB, with optional alpha)
 * - RGB/RGBA functions
 * - HSL/HSLA functions
 *
 * Note: Modern color spaces (lab, lch, oklab, oklch, color()) are not yet supported.
 *
 * @example
 * ```typescript
 * import { colorValueKeywordsSchema } from "../keywords/color-value-keywords";
 *
 * const color1 = colorValueKeywordsSchema.parse("red");
 * const color2 = colorValueKeywordsSchema.parse("#ff0000");
 * const color3 = colorValueKeywordsSchema.parse("rgb(255, 0, 0)");
 * const color4 = colorValueKeywordsSchema.parse("hsl(0, 100%, 50%)");
 * const color5 = colorValueKeywordsSchema.parse("transparent");
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
 * @public
 */
export const colorValueKeywordsSchema = z
	.union([namedColorKeywordsSchema, hexColorKeywordsSchema, rgbColorKeywordsSchema, hslColorKeywordsSchema])
	.describe("CSS color value");

/**
 * TypeScript types for color values.
 *
 * @public
 */
export type HexColorKeyword = z.infer<typeof hexColorKeywordsSchema>;
export type RgbColorKeyword = z.infer<typeof rgbColorKeywordsSchema>;
export type HslColorKeyword = z.infer<typeof hslColorKeywordsSchema>;
export type NamedColorKeyword = z.infer<typeof namedColorKeywordsSchema>;
export type ColorValueKeyword = z.infer<typeof colorValueKeywordsSchema>;

/**
 * Combined array of all named color keywords.
 *
 * This is a convenience export that combines all color categories.
 *
 * @example
 * ```typescript
 * import { ALL_NAMED_COLOR_KEYWORDS } from "../keywords/color-value-keywords";
 *
 * console.log(ALL_NAMED_COLOR_KEYWORDS.length); // 148
 * ```
 *
 * @public
 */
export const ALL_NAMED_COLOR_KEYWORDS = [
	"transparent",
	"currentcolor",
	"black",
	"white",
	"red",
	"green",
	"blue",
	"yellow",
	"orange",
	"purple",
	"pink",
	"brown",
	"gray",
	"grey",
	"silver",
	"gold",
	"navy",
	"teal",
	"lime",
	"aqua",
	"fuchsia",
	"maroon",
	"olive",
	"cyan",
	"aliceblue",
	"antiquewhite",
	"aquamarine",
	"azure",
	"beige",
	"bisque",
	"blanchedalmond",
	"blueviolet",
	"burlywood",
	"cadetblue",
	"chartreuse",
	"chocolate",
	"coral",
	"cornflowerblue",
	"cornsilk",
	"crimson",
	"darkblue",
	"darkcyan",
	"darkgoldenrod",
	"darkgray",
	"darkgrey",
	"darkgreen",
	"darkkhaki",
	"darkmagenta",
	"darkolivegreen",
	"darkorange",
	"darkorchid",
	"darkred",
	"darksalmon",
	"darkseagreen",
	"darkslateblue",
	"darkslategray",
	"darkslategrey",
	"darkturquoise",
	"darkviolet",
	"deeppink",
	"deepskyblue",
	"dimgray",
	"dimgrey",
	"dodgerblue",
	"firebrick",
	"floralwhite",
	"forestgreen",
	"gainsboro",
	"ghostwhite",
	"goldenrod",
	"greenyellow",
	"honeydew",
	"hotpink",
	"indianred",
	"indigo",
	"ivory",
	"khaki",
	"lavender",
	"lavenderblush",
	"lawngreen",
	"lemonchiffon",
	"lightblue",
	"lightcoral",
	"lightcyan",
	"lightgoldenrodyellow",
	"lightgray",
	"lightgrey",
	"lightgreen",
	"lightpink",
	"lightsalmon",
	"lightseagreen",
	"lightskyblue",
	"lightslategray",
	"lightslategrey",
	"lightsteelblue",
	"lightyellow",
	"limegreen",
	"linen",
	"magenta",
	"mediumaquamarine",
	"mediumblue",
	"mediumorchid",
	"mediumpurple",
	"mediumseagreen",
	"mediumslateblue",
	"mediumspringgreen",
	"mediumturquoise",
	"mediumvioletred",
	"midnightblue",
	"mintcream",
	"mistyrose",
	"moccasin",
	"navajowhite",
	"oldlace",
	"olivedrab",
	"orangered",
	"orchid",
	"palegoldenrod",
	"palegreen",
	"paleturquoise",
	"palevioletred",
	"papayawhip",
	"peachpuff",
	"peru",
	"plum",
	"powderblue",
	"rebeccapurple",
	"rosybrown",
	"royalblue",
	"saddlebrown",
	"salmon",
	"sandybrown",
	"seagreen",
	"seashell",
	"sienna",
	"skyblue",
	"slateblue",
	"slategray",
	"slategrey",
	"snow",
	"springgreen",
	"steelblue",
	"tan",
	"thistle",
	"tomato",
	"turquoise",
	"violet",
	"wheat",
	"whitesmoke",
	"yellowgreen",
] as const;

/**
 * Metadata for color values.
 *
 * @public
 */
export const colorKeywordsMetadata = {
	totalNamedColors: ALL_NAMED_COLOR_KEYWORDS.length,
	hexPattern: "#RGB, #RRGGBB, #RGBA, #RRGGBBAA",
	rgbPattern: "rgb(r, g, b) or rgba(r, g, b, a)",
	hslPattern: "hsl(h, s%, l%) or hsla(h, s%, l%, a)",
} as const;

/**
 * Type for color keywords metadata.
 *
 * @public
 */
export type ColorKeywordsMetadata = typeof colorKeywordsMetadata;
