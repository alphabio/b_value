// b_path:: src/generate/layout/z-index.ts
import type { ZIndex } from "@/core/types";

/**
 * Generate CSS z-index property from IR.
 *
 * Outputs integer value or "auto" keyword.
 *
 * @param zIndex - ZIndex IR
 * @returns CSS string like "10", "-5", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/z-index}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/z-index";
 *
 * const css = toCss({ kind: "z-index", value: 10 });
 * // "10"
 * ```
 *
 * @example
 * ```typescript
 * const css = toCss({ kind: "z-index", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function toCss(zIndex: ZIndex): string {
	return String(zIndex.value);
}
