// b_path:: src/generate/color/hwb.ts
import type { HWBColor } from "@/core/types/color";

/**
 * Generate CSS string from HWB color object.
 *
 * Always outputs modern space-separated syntax:
 * - `hwb(120 20% 30%)` - without alpha
 * - `hwb(120 20% 30% / 0.5)` - with alpha
 *
 * @param color - The HWB color object
 * @returns CSS HWB color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/hwb";
 *
 * // Basic HWB
 * toCss({ kind: "hwb", h: 120, w: 20, b: 30 });
 * // => "hwb(120 20% 30%)"
 *
 * // With alpha
 * toCss({ kind: "hwb", h: 120, w: 20, b: 30, alpha: 0.5 });
 * // => "hwb(120 20% 30% / 0.5)"
 * ```
 *
 * @public
 */
export function toCss(color: HWBColor): string {
	const { h, w, b, alpha } = color;

	// Format: hwb(H W% B%)
	let result = `hwb(${h} ${w}% ${b}%`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha !== 1) {
		result += ` / ${alpha}`;
	}

	result += ")";
	return result;
}
