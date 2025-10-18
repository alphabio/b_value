// b_path:: src/generate/color/system.ts
import type { SystemColor } from "@/core/types/color";

/**
 * Generate CSS from a system color value.
 *
 * Converts a SystemColor IR back to its CSS string representation.
 * System color keywords are output as-is with their original casing.
 *
 * @param color - The system color to convert
 * @returns CSS system color keyword string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/system";
 *
 * const css1 = toCss({ kind: "system", keyword: "ButtonText" });
 * // => "ButtonText"
 *
 * const css2 = toCss({ kind: "system", keyword: "Canvas" });
 * // => "Canvas"
 * ```
 *
 * @public
 */
export function toCss(color: SystemColor): string {
	return color.keyword;
}
