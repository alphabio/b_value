// b_path:: src/generate/typography/font-weight.ts
import type { FontWeight } from "@/core/types";

/**
 * Generate CSS font-weight property from IR.
 *
 * Outputs numeric value or keyword.
 *
 * @param fontWeight - FontWeight IR
 * @returns CSS string like "400", "bold", or "normal"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/font-weight";
 *
 * const css = toCss({ kind: "font-weight", value: 400 });
 * // "400"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "font-weight", value: "bold" });
 * // "bold"
 * ```
 *
 * @public
 */
export function toCss(fontWeight: FontWeight): string {
	return String(fontWeight.value);
}
