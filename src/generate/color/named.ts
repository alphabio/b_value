// b_path:: src/generate/color/named.ts
import type { NamedColor } from "@/core/types/color";

/**
 * Generate CSS from a named color value.
 *
 * Converts a NamedColor IR back to its CSS string representation.
 * Output is always lowercase color name.
 *
 * @param color - The named color to convert
 * @returns CSS color name string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/named";
 *
 * const css1 = toCss({ kind: "named", name: "red" });
 * // => "red"
 *
 * const css2 = toCss({ kind: "named", name: "cornflowerblue" });
 * // => "cornflowerblue"
 * ```
 *
 * @public
 */
export function toCss(color: NamedColor): string {
	return color.name;
}
