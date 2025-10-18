// b_path:: src/parse/color/hex.ts
import { err, ok, type Result } from "@/core/result";
import type { HexColor } from "@/core/types/color";

/**
 * Parse a CSS hex color value.
 *
 * Accepts #RGB, #RRGGBB, #RGBA, or #RRGGBBAA formats.
 * Normalizes short forms to long forms and converts to uppercase.
 *
 * @param input - The hex color string to parse (e.g., "#abc", "#ff5733", "#ff573380")
 * @returns Result containing the parsed HexColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/hex";
 *
 * // Short form
 * const color1 = parse("#abc");
 * // => { ok: true, value: { kind: "hex", value: "#AABBCC" } }
 *
 * // Long form
 * const color2 = parse("#ff5733");
 * // => { ok: true, value: { kind: "hex", value: "#FF5733" } }
 *
 * // With alpha
 * const color3 = parse("#ff573380");
 * // => { ok: true, value: { kind: "hex", value: "#FF573380" } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<HexColor, string> {
	if (!input.startsWith("#")) {
		return err("Hex color must start with #");
	}

	const hex = input.slice(1);

	// #RGB → #RRGGBB
	if (hex.length === 3) {
		if (!/^[0-9A-Fa-f]{3}$/.test(hex)) {
			return err("Invalid hex color format");
		}
		const normalized = hex
			.split("")
			.map((c) => c + c)
			.join("");
		return ok({ kind: "hex", value: `#${normalized.toUpperCase()}` });
	}

	// #RGBA → #RRGGBBAA
	if (hex.length === 4) {
		if (!/^[0-9A-Fa-f]{4}$/.test(hex)) {
			return err("Invalid hex color format");
		}
		const normalized = hex
			.split("")
			.map((c) => c + c)
			.join("");
		return ok({ kind: "hex", value: `#${normalized.toUpperCase()}` });
	}

	// #RRGGBB or #RRGGBBAA
	if (hex.length === 6 || hex.length === 8) {
		if (!/^[0-9A-Fa-f]+$/.test(hex)) {
			return err("Invalid hex color format");
		}
		return ok({ kind: "hex", value: `#${hex.toUpperCase()}` });
	}

	return err("Hex color must be #RGB, #RRGGBB, #RGBA, or #RRGGBBAA");
}
