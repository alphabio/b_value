// b_path:: src/generate/layout/cursor.ts
import type { Cursor } from "@/core/types";

/**
 * Generate CSS cursor property from IR.
 *
 * Outputs cursor keyword value.
 *
 * @param cursor - Cursor IR
 * @returns CSS string like "pointer" or "text"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/cursor";
 *
 * const css = toCss({ kind: "cursor", value: "pointer" });
 * // "pointer"
 * ```
 *
 * @public
 */
export function toCss(cursor: Cursor): string {
	return cursor.value;
}
