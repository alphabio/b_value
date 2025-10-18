// b_path:: src/parse/color/system.ts

import { SYSTEM_COLOR_KEYWORDS } from "@/core/keywords/system-color-keywords";
import { err, ok, type Result } from "@/core/result";
import type { SystemColor } from "@/core/types/color";

/**
 * Parse a CSS system color keyword.
 *
 * System colors represent colors from the user's operating system or browser theme.
 * These values are case-insensitive.
 *
 * Supported keywords:
 * - AccentColor, AccentColorText, ActiveText
 * - ButtonBorder, ButtonFace, ButtonText
 * - Canvas, CanvasText
 * - Field, FieldText
 * - GrayText, Highlight, HighlightText
 * - LinkText, Mark, MarkText
 * - SelectedItem, SelectedItemText
 * - VisitedText
 *
 * @param input - The system color keyword to parse
 * @returns Result containing the parsed SystemColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/system";
 *
 * const color1 = parse("ButtonText");
 * // => { ok: true, value: { kind: "system", keyword: "ButtonText" } }
 *
 * const color2 = parse("canvas"); // case-insensitive
 * // => { ok: true, value: { kind: "system", keyword: "Canvas" } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<SystemColor, string> {
	const trimmed = input.trim();

	// System color keywords are case-insensitive in CSS
	const lowerInput = trimmed.toLowerCase();

	// Find matching keyword (case-insensitive comparison)
	const matchedKeyword = SYSTEM_COLOR_KEYWORDS.find((keyword) => keyword.toLowerCase() === lowerInput);

	if (matchedKeyword) {
		return ok({ kind: "system", keyword: matchedKeyword });
	}

	return err(`Invalid system color keyword: ${trimmed}`);
}
