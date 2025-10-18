// b_path:: src/generate/color/oklab.ts
import type { OKLabColor } from "@/core/types/color";

/**
 * Generate CSS from an OKLab color value.
 *
 * Converts an OKLabColor IR back to its CSS string representation.
 * Uses modern space-separated syntax.
 *
 * @param color - The OKLab color to convert
 * @returns CSS OKLab color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/oklab";
 *
 * // Opaque color
 * const css1 = toCss({ kind: "oklab", l: 0.5, a: -0.2, b: 0.3 });
 * // => "oklab(0.5 -0.2 0.3)"
 *
 * // With alpha
 * const css2 = toCss({ kind: "oklab", l: 0.5, a: -0.2, b: 0.3, alpha: 0.5 });
 * // => "oklab(0.5 -0.2 0.3 / 0.5)"
 *
 * // Full opacity (alpha = 1)
 * const css3 = toCss({ kind: "oklab", l: 0.5, a: -0.2, b: 0.3, alpha: 1 });
 * // => "oklab(0.5 -0.2 0.3)"
 * ```
 *
 * @public
 */
export function toCss(color: OKLabColor): string {
	const { l, a, b, alpha } = color;

	// Format OKLab values (lightness, a, b as numbers)
	const oklabPart = `${l} ${a} ${b}`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha < 1) {
		return `oklab(${oklabPart} / ${alpha})`;
	}

	return `oklab(${oklabPart})`;
}
