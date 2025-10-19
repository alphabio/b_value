// b_path:: src/generate/layout/visibility.ts
import type { Visibility } from "@/core/types";

/**
 * Generate CSS visibility property from IR.
 *
 * Outputs visibility keyword value.
 *
 * @param visibility - Visibility IR
 * @returns CSS string like "visible" or "hidden"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/visibility";
 *
 * const css = toCss({ kind: "visibility", value: "hidden" });
 * // "hidden"
 * ```
 *
 * @public
 */
export function toCss(visibility: Visibility): string {
	return visibility.value;
}
