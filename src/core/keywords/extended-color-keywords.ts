// b_path:: src/core/keywords/extended-color-keywords.ts
import { z } from "zod";

/**
 * CSS extended named colors (~125 colors).
 *
 * Full X11/SVG color set from CSS Color Module Level 4.
 * These are additional named colors beyond the basic set.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/#named-colors}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/named-color}
 * @public
 */
export const extendedNamedColorKeywordsSchema = z
	.union([
		z.literal("aliceblue").describe("Alice blue color (#F0F8FF)"),
		z.literal("antiquewhite").describe("Antique white color (#FAEBD7)"),
		z.literal("aquamarine").describe("Aquamarine color (#7FFFD4)"),
		z.literal("azure").describe("Azure color (#F0FFFF)"),
		z.literal("beige").describe("Beige color (#F5F5DC)"),
		z.literal("bisque").describe("Bisque color (#FFE4C4)"),
		z.literal("blanchedalmond").describe("Blanched almond color (#FFEBCD)"),
		z.literal("blueviolet").describe("Blue violet color (#8A2BE2)"),
		z.literal("burlywood").describe("Burlywood color (#DEB887)"),
		z.literal("cadetblue").describe("Cadet blue color (#5F9EA0)"),
		z.literal("chartreuse").describe("Chartreuse color (#7FFF00)"),
		z.literal("chocolate").describe("Chocolate color (#D2691E)"),
		z.literal("coral").describe("Coral color (#FF7F50)"),
		z.literal("cornflowerblue").describe("Cornflower blue color (#6495ED)"),
		z.literal("cornsilk").describe("Cornsilk color (#FFF8DC)"),
		z.literal("crimson").describe("Crimson color (#DC143C)"),
		z.literal("darkblue").describe("Dark blue color (#00008B)"),
		z.literal("darkcyan").describe("Dark cyan color (#008B8B)"),
		z.literal("darkgoldenrod").describe("Dark goldenrod color (#B8860B)"),
		z.literal("darkgray").describe("Dark gray color (#A9A9A9)"),
		z.literal("darkgrey").describe("Alternative spelling of darkgray"),
		z.literal("darkgreen").describe("Dark green color (#006400)"),
		z.literal("darkkhaki").describe("Dark khaki color (#BDB76B)"),
		z.literal("darkmagenta").describe("Dark magenta color (#8B008B)"),
		z.literal("darkolivegreen").describe("Dark olive green color (#556B2F)"),
		z.literal("darkorange").describe("Dark orange color (#FF8C00)"),
		z.literal("darkorchid").describe("Dark orchid color (#9932CC)"),
		z.literal("darkred").describe("Dark red color (#8B0000)"),
		z.literal("darksalmon").describe("Dark salmon color (#E9967A)"),
		z.literal("darkseagreen").describe("Dark sea green color (#8FBC8F)"),
		z.literal("darkslateblue").describe("Dark slate blue color (#483D8B)"),
		z.literal("darkslategray").describe("Dark slate gray color (#2F4F4F)"),
		z.literal("darkslategrey").describe("Alternative spelling of darkslategray"),
		z.literal("darkturquoise").describe("Dark turquoise color (#00CED1)"),
		z.literal("darkviolet").describe("Dark violet color (#9400D3)"),
		z.literal("deeppink").describe("Deep pink color (#FF1493)"),
		z.literal("deepskyblue").describe("Deep sky blue color (#00BFFF)"),
		z.literal("dimgray").describe("Dim gray color (#696969)"),
		z.literal("dimgrey").describe("Alternative spelling of dimgrey"),
		z.literal("dodgerblue").describe("Dodger blue color (#1E90FF)"),
		z.literal("firebrick").describe("Fire brick color (#B22222)"),
		z.literal("floralwhite").describe("Floral white color (#FFFAF0)"),
		z.literal("forestgreen").describe("Forest green color (#228B22)"),
		z.literal("gainsboro").describe("Gainsboro color (#DCDCDC)"),
		z.literal("ghostwhite").describe("Ghost white color (#F8F8FF)"),
		z.literal("goldenrod").describe("Goldenrod color (#DAA520)"),
		z.literal("greenyellow").describe("Green yellow color (#ADFF2F)"),
		z.literal("honeydew").describe("Honeydew color (#F0FFF0)"),
		z.literal("hotpink").describe("Hot pink color (#FF69B4)"),
		z.literal("indianred").describe("Indian red color (#CD5C5C)"),
		z.literal("indigo").describe("Indigo color (#4B0082)"),
		z.literal("ivory").describe("Ivory color (#FFFFF0)"),
		z.literal("khaki").describe("Khaki color (#F0E68C)"),
		z.literal("lavender").describe("Lavender color (#E6E6FA)"),
		z.literal("lavenderblush").describe("Lavender blush color (#FFF0F5)"),
		z.literal("lawngreen").describe("Lawn green color (#7CFC00)"),
		z.literal("lemonchiffon").describe("Lemon chiffon color (#FFFACD)"),
		z.literal("lightblue").describe("Light blue color (#ADD8E6)"),
		z.literal("lightcoral").describe("Light coral color (#F08080)"),
		z.literal("lightcyan").describe("Light cyan color (#E0FFFF)"),
		z.literal("lightgoldenrodyellow").describe("Light goldenrod yellow color (#FAFAD2)"),
		z.literal("lightgray").describe("Light gray color (#D3D3D3)"),
		z.literal("lightgrey").describe("Alternative spelling of lightgrey"),
		z.literal("lightgreen").describe("Light green color (#90EE90)"),
		z.literal("lightpink").describe("Light pink color (#FFB6C1)"),
		z.literal("lightsalmon").describe("Light salmon color (#FFA07A)"),
		z.literal("lightseagreen").describe("Light sea green color (#20B2AA)"),
		z.literal("lightskyblue").describe("Light sky blue color (#87CEFA)"),
		z.literal("lightslategray").describe("Light slate gray color (#778899)"),
		z.literal("lightslategrey").describe("Alternative spelling of lightslategrey"),
		z.literal("lightsteelblue").describe("Light steel blue color (#B0C4DE)"),
		z.literal("lightyellow").describe("Light yellow color (#FFFFE0)"),
		z.literal("limegreen").describe("Lime green color (#32CD32)"),
		z.literal("linen").describe("Linen color (#FAF0E6)"),
		z.literal("magenta").describe("Magenta color (#FF00FF)"),
		z.literal("mediumaquamarine").describe("Medium aquamarine color (#66CDAA)"),
		z.literal("mediumblue").describe("Medium blue color (#0000CD)"),
		z.literal("mediumorchid").describe("Medium orchid color (#BA55D3)"),
		z.literal("mediumpurple").describe("Medium purple color (#9370DB)"),
		z.literal("mediumseagreen").describe("Medium sea green color (#3CB371)"),
		z.literal("mediumslateblue").describe("Medium slate blue color (#7B68EE)"),
		z.literal("mediumspringgreen").describe("Medium spring green color (#00FA9A)"),
		z.literal("mediumturquoise").describe("Medium turquoise color (#48D1CC)"),
		z.literal("mediumvioletred").describe("Medium violet red color (#C71585)"),
		z.literal("midnightblue").describe("Midnight blue color (#191970)"),
		z.literal("mintcream").describe("Mint cream color (#F5FFFA)"),
		z.literal("mistyrose").describe("Misty rose color (#FFE4E1)"),
		z.literal("moccasin").describe("Moccasin color (#FFE4B5)"),
		z.literal("navajowhite").describe("Navajo white color (#FFDEAD)"),
		z.literal("oldlace").describe("Old lace color (#FDF5E6)"),
		z.literal("olivedrab").describe("Olive drab color (#6B8E23)"),
		z.literal("orangered").describe("Orange red color (#FF4500)"),
		z.literal("orchid").describe("Orchid color (#DA70D6)"),
		z.literal("palegoldenrod").describe("Pale goldenrod color (#EEE8AA)"),
		z.literal("palegreen").describe("Pale green color (#98FB98)"),
		z.literal("paleturquoise").describe("Pale turquoise color (#AFEEEE)"),
		z.literal("palevioletred").describe("Pale violet red color (#DB7093)"),
		z.literal("papayawhip").describe("Papaya whip color (#FFEFD5)"),
		z.literal("peachpuff").describe("Peach puff color (#FFDAB9)"),
		z.literal("peru").describe("Peru color (#CD853F)"),
		z.literal("plum").describe("Plum color (#DDA0DD)"),
		z.literal("powderblue").describe("Powder blue color (#B0E0E6)"),
		z.literal("rebeccapurple").describe("Rebecca purple color (#663399)"),
		z.literal("rosybrown").describe("Rosy brown color (#BC8F8F)"),
		z.literal("royalblue").describe("Royal blue color (#4169E1)"),
		z.literal("saddlebrown").describe("Saddle brown color (#8B4513)"),
		z.literal("salmon").describe("Salmon color (#FA8072)"),
		z.literal("sandybrown").describe("Sandy brown color (#F4A460)"),
		z.literal("seagreen").describe("Sea green color (#2E8B57)"),
		z.literal("seashell").describe("Seashell color (#FFF5EE)"),
		z.literal("sienna").describe("Sienna color (#A0522D)"),
		z.literal("skyblue").describe("Sky blue color (#87CEEB)"),
		z.literal("slateblue").describe("Slate blue color (#6A5ACD)"),
		z.literal("slategray").describe("Slate gray color (#708090)"),
		z.literal("slategrey").describe("Alternative spelling of slategray"),
		z.literal("snow").describe("Snow color (#FFFAFA)"),
		z.literal("springgreen").describe("Spring green color (#00FF7F)"),
		z.literal("steelblue").describe("Steel blue color (#4682B4)"),
		z.literal("tan").describe("Tan color (#D2B48C)"),
		z.literal("thistle").describe("Thistle color (#D8BFD8)"),
		z.literal("tomato").describe("Tomato color (#FF6347)"),
		z.literal("turquoise").describe("Turquoise color (#40E0D0)"),
		z.literal("violet").describe("Violet color (#EE82EE)"),
		z.literal("wheat").describe("Wheat color (#F5DEB3)"),
		z.literal("whitesmoke").describe("White smoke color (#F5F5F5)"),
		z.literal("yellowgreen").describe("Yellow green color (#9ACD32)"),
	])
	.describe("CSS extended named colors");

/**
 * Array of all extended named color keyword values.
 *
 * @example
 * ```typescript
 * import { EXTENDED_NAMED_COLOR_KEYWORDS } from "../keywords/extended-color-keywords";
 *
 * console.log(EXTENDED_NAMED_COLOR_KEYWORDS.length); // 125
 * ```
 *
 * @public
 */
export const EXTENDED_NAMED_COLOR_KEYWORDS = extendedNamedColorKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for extended named color keywords.
 *
 * @public
 */
export type ExtendedNamedColorKeyword = z.infer<typeof extendedNamedColorKeywordsSchema>;

/**
 * Metadata for extended named color keyword options.
 *
 * Provides value and description for each extended named color keyword,
 * useful for Studio UI generation and documentation.
 *
 * @example
 * ```typescript
 * import { extendedNamedColorKeywordOptions } from "../keywords/extended-color-keywords";
 *
 * extendedNamedColorKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const extendedNamedColorKeywordOptions = extendedNamedColorKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for extended named color keyword options metadata.
 *
 * @public
 */
export type ExtendedNamedColorKeywordOptions = typeof extendedNamedColorKeywordOptions;
