// b_path:: src/generate/color/lab.ts
import type { LABColor } from "@/core/types/color";

/**
 * Generate CSS from a LAB color value.
 *
 * Converts a LABColor IR back to its CSS string representation.
 * Uses modern space-separated syntax.
 *
 * @param color - The LAB color to convert
 * @returns CSS LAB color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/lab";
 *
 * // Opaque color
 * const css1 = toCss({ kind: "lab", l: 50, a: -20, b: 30 });
 * // => "lab(50 -20 30)"
 *
 * // With alpha
 * const css2 = toCss({ kind: "lab", l: 50, a: -20, b: 30, alpha: 0.5 });
 * // => "lab(50 -20 30 / 0.5)"
 *
 * // Full opacity (alpha = 1)
 * const css3 = toCss({ kind: "lab", l: 50, a: -20, b: 30, alpha: 1 });
 * // => "lab(50 -20 30)"
 * ```
 *
 * @public
 */
export function toCss(color: LABColor): string {
	const { l, a, b, alpha } = color;

	// Format LAB values (lightness, a, b as numbers)
	const labPart = `${l} ${a} ${b}`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha < 1) {
		return `lab(${labPart} / ${alpha})`;
	}

	return `lab(${labPart})`;
}
