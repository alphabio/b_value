// b_path:: src/generate/layout/overflow-y.ts
import type { OverflowY } from "@/core/types";

/**
 * Generate CSS overflow-y property from IR.
 *
 * Outputs overflow-y keyword value.
 *
 * @param overflowY - OverflowY IR
 * @returns CSS string like "auto" or "scroll"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/overflow-y";
 *
 * const css = toCss({ kind: "overflow-y", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function toCss(overflowY: OverflowY): string {
	return overflowY.value;
}
