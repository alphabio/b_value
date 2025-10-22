// b_path:: src/generate/color/oklch.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { OKLCHColor } from "@/core/types/color";

/**
 * Generate CSS from an OKLCH color value.
 *
 * Converts an OKLCHColor IR back to its CSS string representation.
 * Uses modern space-separated syntax. Hue is output as a unitless number (degrees implied).
 *
 * @param color - The OKLCH color to convert
 * @returns CSS OKLCH color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/oklch";
 *
 * // Opaque color
 * const css1 = toCss({ kind: "oklch", l: 0.5, c: 0.2, h: 180 });
 * // => "oklch(0.5 0.2 180)"
 *
 * // With alpha
 * const css2 = toCss({ kind: "oklch", l: 0.5, c: 0.2, h: 180, alpha: 0.5 });
 * // => "oklch(0.5 0.2 180 / 0.5)"
 *
 * // Full opacity (alpha = 1)
 * const css3 = toCss({ kind: "oklch", l: 0.5, c: 0.2, h: 180, alpha: 1 });
 * // => "oklch(0.5 0.2 180)"
 * ```
 *
 * @public
 */
export function generate(color: OKLCHColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "OKLCHColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected OKLCHColor object, got ${typeof color}`);
	}
	if (!("l" in color) || !("c" in color) || !("h" in color)) {
		return generateErr("missing-required-field", "OKLCHColor must have 'l', 'c', 'h' fields");
	}

	const { l, c, h, alpha } = color;

	// Format OKLCH values (lightness, chroma, hue as numbers)
	// Hue is output as unitless (degrees implied)
	const oklchPart = `${l} ${c} ${h}`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha < 1) {
		return generateOk(`oklch(${oklchPart} / ${alpha})`);
	}

	return generateOk(`oklch(${oklchPart})`);
}
