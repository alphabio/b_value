// b_path:: src/generate/color/hex.ts
import type { HexColor } from "@/core/types/color";

/**
 * Generate CSS from a hex color value.
 *
 * Converts a HexColor IR back to its CSS string representation.
 * Output is always uppercase #RRGGBB or #RRGGBBAA format.
 *
 * @param color - The hex color to convert
 * @returns CSS hex color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/hex";
 *
 * const css1 = toCss({ kind: "hex", value: "#FF5733" });
 * // => "#FF5733"
 *
 * const css2 = toCss({ kind: "hex", value: "#FF573380" });
 * // => "#FF573380"
 * ```
 *
 * @public
 */
export function toCss(color: HexColor): string {
	return color.value;
}
