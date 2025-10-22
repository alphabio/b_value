// b_path:: src/generate/color/rgb.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { RGBColor } from "@/core/types/color";

/**
 * Generate CSS from an RGB color value.
 *
 * Converts an RGBColor IR back to its CSS string representation.
 * Uses modern space-separated syntax with slash for alpha.
 *
 * @param color - The RGB color to convert
 * @returns CSS RGB color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/rgb";
 *
 * // Opaque color
 * const css1 = toCss({ kind: "rgb", r: 255, g: 0, b: 0 });
 * // => "rgb(255 0 0)"
 *
 * // With alpha
 * const css2 = toCss({ kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 });
 * // => "rgb(255 0 0 / 0.5)"
 *
 * // Full opacity (alpha = 1)
 * const css3 = toCss({ kind: "rgb", r: 255, g: 0, b: 0, alpha: 1 });
 * // => "rgb(255 0 0)"
 * ```
 *
 * @public
 */
export function generate(color: RGBColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "RGBColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected RGBColor object, got ${typeof color}`);
	}
	if (!("r" in color) || !("g" in color) || !("b" in color)) {
		return generateErr("missing-required-field", "RGBColor must have 'r', 'g', 'b' fields");
	}

	const { r, g, b, alpha } = color;

	// Format RGB values (integers)
	const rgbPart = `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha < 1) {
		return generateOk(`rgb(${rgbPart} / ${alpha})`);
	}

	return generateOk(`rgb(${rgbPart})`);
}
