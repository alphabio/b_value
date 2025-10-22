// b_path:: src/generate/color/hsl.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { HSLColor } from "@/core/types/color";

/**
 * Generate CSS from an HSL color value.
 *
 * Converts an HSLColor IR back to its CSS string representation.
 * Uses modern space-separated syntax without units on percentages.
 *
 * @param color - The HSL color to convert
 * @returns CSS HSL color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/hsl";
 *
 * // Opaque color
 * const css1 = toCss({ kind: "hsl", h: 120, s: 100, l: 50 });
 * // => "hsl(120 100% 50%)"
 *
 * // With alpha
 * const css2 = toCss({ kind: "hsl", h: 120, s: 100, l: 50, alpha: 0.5 });
 * // => "hsl(120 100% 50% / 0.5)"
 *
 * // Full opacity (alpha = 1)
 * const css3 = toCss({ kind: "hsl", h: 120, s: 100, l: 50, alpha: 1 });
 * // => "hsl(120 100% 50%)"
 * ```
 *
 * @public
 */
export function generate(color: HSLColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "HSLColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected HSLColor object, got ${typeof color}`);
	}
	if (!("h" in color) || !("s" in color) || !("l" in color)) {
		return generateErr("missing-required-field", "HSLColor must have 'h', 's', 'l' fields");
	}

	const { h, s, l, alpha } = color;

	// Format HSL values (hue as number, saturation and lightness with %)
	const hslPart = `${h} ${s}% ${l}%`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha < 1) {
		return generateOk(`hsl(${hslPart} / ${alpha})`);
	}

	return generateOk(`hsl(${hslPart})`);
}
