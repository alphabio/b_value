// b_path:: src/generate/layout/box-sizing.ts
import type { BoxSizing } from "@/core/types";

/**
 * Generate CSS box-sizing property from IR.
 *
 * Outputs box-sizing keyword.
 *
 * @param boxSizing - BoxSizing IR
 * @returns CSS string like "border-box" or "content-box"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/box-sizing";
 *
 * const css = toCss({ kind: "box-sizing", value: "border-box" });
 * // "border-box"
 * ```
 *
 * @public
 */
export function toCss(boxSizing: BoxSizing): string {
	return boxSizing.value;
}
