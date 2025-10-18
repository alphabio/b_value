// b_path:: src/generate/color/special.ts
import type { SpecialColor } from "@/core/types/color";

/**
 * Generate CSS from a special color value.
 *
 * Converts a SpecialColor IR back to its CSS string representation.
 * Special color keywords are output in lowercase.
 *
 * @param color - The special color to convert
 * @returns CSS special color keyword string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/special";
 *
 * const css1 = toCss({ kind: "special", keyword: "transparent" });
 * // => "transparent"
 *
 * const css2 = toCss({ kind: "special", keyword: "currentcolor" });
 * // => "currentcolor"
 * ```
 *
 * @public
 */
export function toCss(color: SpecialColor): string {
	return color.keyword;
}
