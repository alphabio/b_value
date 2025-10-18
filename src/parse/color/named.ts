// b_path:: src/parse/color/named.ts

import { BASIC_NAMED_COLOR_KEYWORDS, EXTENDED_NAMED_COLOR_KEYWORDS } from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";
import type { NamedColor } from "@/core/types/color";

/**
 * Set of all valid CSS named colors.
 * Includes both basic (22) and extended (126) color keywords.
 */
const ALL_NAMED_COLORS = new Set<string>([...BASIC_NAMED_COLOR_KEYWORDS, ...EXTENDED_NAMED_COLOR_KEYWORDS]);

/**
 * Parse a CSS named color value.
 *
 * Accepts any valid CSS color keyword name (case-insensitive).
 * Includes basic colors (red, blue, etc.) and extended X11/SVG colors.
 *
 * @param input - The color name to parse (e.g., "red", "cornflowerblue")
 * @returns Result containing the parsed NamedColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/named";
 *
 * // Basic color
 * const color1 = parse("red");
 * // => { ok: true, value: { kind: "named", name: "red" } }
 *
 * // Extended color
 * const color2 = parse("cornflowerblue");
 * // => { ok: true, value: { kind: "named", name: "cornflowerblue" } }
 *
 * // Case-insensitive
 * const color3 = parse("BLUE");
 * // => { ok: true, value: { kind: "named", name: "blue" } }
 *
 * // Invalid color
 * const invalid = parse("notacolor");
 * // => { ok: false, error: "Unknown color name: notacolor" }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<NamedColor, string> {
	const lower = input.toLowerCase();

	if (ALL_NAMED_COLORS.has(lower)) {
		return ok({ kind: "named", name: lower });
	}

	return err(`Unknown color name: ${input}`);
}
