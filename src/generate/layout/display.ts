// b_path:: src/generate/layout/display.ts
import type { Display } from "@/core/types";

/**
 * Generate CSS display property from IR.
 *
 * Outputs display keyword value.
 *
 * @param display - Display IR
 * @returns CSS string like "flex" or "none"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/display";
 *
 * const css = toCss({ kind: "display", value: "flex" });
 * // "flex"
 * ```
 *
 * @public
 */
export function toCss(display: Display): string {
	return display.value;
}
