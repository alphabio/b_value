// b_path:: src/parse/color/index.ts
import type { Result } from "@/core/result";
import type { Color as ColorType } from "@/core/types/color";
import * as Hex from "./hex";
import * as Hsl from "./hsl";
import * as Hwb from "./hwb";
import * as Lab from "./lab";
import * as Lch from "./lch";
import * as Named from "./named";
import * as Oklab from "./oklab";
import * as Oklch from "./oklch";
import * as Rgb from "./rgb";
import * as Special from "./special";
import * as System from "./system";

/**
 * Parse a CSS color value in any supported format.
 *
 * Automatically detects and parses the color format:
 * - Hex: `#RRGGBB`, `#RRGGBBAA`, `#RGB`, `#RGBA`
 * - RGB: `rgb(255 0 0)`, `rgba(255, 0, 0, 0.5)`
 * - HSL: `hsl(120 100% 50%)`, `hsla(120, 100%, 50%, 0.5)`
 * - HWB: `hwb(120 20% 30%)`, `hwb(120 20% 30% / 0.5)`
 * - LAB: `lab(50 -20 30)`, `lab(50% -20 30 / 0.5)`
 * - LCH: `lch(50 50 180)`, `lch(50% 50 180deg / 0.5)`
 * - OKLab: `oklab(0.5 -0.2 0.3)`, `oklab(50% -0.2 0.3 / 0.5)`
 * - OKLCH: `oklch(0.5 0.2 180)`, `oklch(50% 0.2 180deg / 0.5)`
 * - Named: `red`, `cornflowerblue`, `rebeccapurple`
 * - System: `ButtonText`, `Canvas`, `AccentColor`
 * - Special: `transparent`, `currentcolor`
 *
 * @param input - The CSS color string to parse
 * @returns Result containing the parsed Color or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color";
 *
 * // Hex color
 * const hex = parse("#ff5733");
 * // => { ok: true, value: { kind: "hex", value: "#FF5733" } }
 *
 * // RGB color
 * const rgb = parse("rgb(255 87 51)");
 * // => { ok: true, value: { kind: "rgb", r: 255, g: 87, b: 51 } }
 *
 * // Named color
 * const named = parse("red");
 * // => { ok: true, value: { kind: "named", name: "red" } }
 *
 * // With alpha
 * const rgba = parse("rgb(255 0 0 / 0.5)");
 * // => { ok: true, value: { kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<ColorType, string> {
	const trimmed = input.trim();

	// Try hex - starts with #
	if (trimmed.startsWith("#")) {
		return Hex.parse(trimmed);
	}

	// Try function syntax - contains (
	if (trimmed.includes("(")) {
		const lower = trimmed.toLowerCase();

		// Check function name prefix
		if (lower.startsWith("rgb(") || lower.startsWith("rgba(")) {
			return Rgb.parse(trimmed);
		}
		if (lower.startsWith("hsl(") || lower.startsWith("hsla(")) {
			return Hsl.parse(trimmed);
		}
		if (lower.startsWith("hwb(")) {
			return Hwb.parse(trimmed);
		}
		if (lower.startsWith("lab(")) {
			return Lab.parse(trimmed);
		}
		if (lower.startsWith("lch(")) {
			return Lch.parse(trimmed);
		}
		if (lower.startsWith("oklab(")) {
			return Oklab.parse(trimmed);
		}
		if (lower.startsWith("oklch(")) {
			return Oklch.parse(trimmed);
		}
	}

	// Try special keywords - transparent, currentcolor
	const lower = trimmed.toLowerCase();
	if (lower === "transparent" || lower === "currentcolor") {
		return Special.parse(trimmed);
	}

	// Try system color keywords - check if it matches system color pattern
	const systemResult = System.parse(trimmed);
	if (systemResult.ok) {
		return systemResult;
	}

	// Try named colors - fallback
	return Named.parse(trimmed);
}

/**
 * Color parsing utilities and individual parsers.
 *
 * @example
 * ```typescript
 * import { Color } from "@/parse/color";
 *
 * // Use master parser
 * const color = Color.parse("#ff5733");
 *
 * // Use specific parser
 * const rgb = Color.rgb.parse("rgb(255 87 51)");
 * const hex = Color.hex.parse("#ff5733");
 * ```
 *
 * @public
 */
export const Color = {
	parse,
	hex: Hex,
	named: Named,
	rgb: Rgb,
	hsl: Hsl,
	hwb: Hwb,
	lab: Lab,
	lch: Lch,
	oklab: Oklab,
	oklch: Oklch,
	system: System,
	special: Special,
};
