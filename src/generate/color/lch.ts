// b_path:: src/generate/color/lch.ts
import type { LCHColor } from "@/core/types/color";

/**
 * Generate CSS from a LCH color value.
 *
 * Converts a LCHColor IR back to its CSS string representation.
 * Uses modern space-separated syntax without units.
 *
 * @param color - The LCH color to convert
 * @returns CSS LCH color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/lch";
 *
 * // Opaque color
 * const css1 = toCss({ kind: "lch", l: 50, c: 50, h: 180 });
 * // => "lch(50 50 180)"
 *
 * // With alpha
 * const css2 = toCss({ kind: "lch", l: 50, c: 50, h: 180, alpha: 0.5 });
 * // => "lch(50 50 180 / 0.5)"
 *
 * // Full opacity (alpha = 1)
 * const css3 = toCss({ kind: "lch", l: 50, c: 50, h: 180, alpha: 1 });
 * // => "lch(50 50 180)"
 * ```
 *
 * @public
 */
export function toCss(color: LCHColor): string {
	const { l, c, h, alpha } = color;

	// Format LCH values (lightness, chroma, hue as numbers)
	const lchPart = `${l} ${c} ${h}`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha < 1) {
		return `lch(${lchPart} / ${alpha})`;
	}

	return `lch(${lchPart})`;
}
