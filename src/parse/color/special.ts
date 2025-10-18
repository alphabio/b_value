// b_path:: src/parse/color/special.ts

import { SPECIAL_COLOR_KEYWORDS } from "@/core/keywords/color-keywords";
import { err, ok, type Result } from "@/core/result";
import type { SpecialColor } from "@/core/types/color";

/**
 * Parse a CSS special color keyword.
 *
 * Special color keywords have unique behavior:
 * - `transparent`: Fully transparent color (rgba(0, 0, 0, 0))
 * - `currentcolor`: Uses the current value of the color property
 *
 * These values are case-insensitive.
 *
 * @param input - The special color keyword to parse
 * @returns Result containing the parsed SpecialColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/special";
 *
 * const color1 = parse("transparent");
 * // => { ok: true, value: { kind: "special", keyword: "transparent" } }
 *
 * const color2 = parse("CurrentColor"); // case-insensitive
 * // => { ok: true, value: { kind: "special", keyword: "currentcolor" } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<SpecialColor, string> {
	const trimmed = input.trim();

	// Special color keywords are case-insensitive in CSS
	const lowerInput = trimmed.toLowerCase();

	// Check if it's a valid special color keyword
	if (SPECIAL_COLOR_KEYWORDS.includes(lowerInput as (typeof SPECIAL_COLOR_KEYWORDS)[number])) {
		return ok({
			kind: "special",
			keyword: lowerInput as "transparent" | "currentcolor",
		});
	}

	return err(`Invalid special color keyword: ${trimmed}`);
}
