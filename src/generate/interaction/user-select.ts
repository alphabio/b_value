// b_path:: src/generate/interaction/user-select.ts
import type { UserSelect } from "@/core/types";

/**
 * Generate CSS user-select property from IR.
 *
 * Outputs keyword value.
 *
 * @param userSelect - UserSelect IR
 * @returns CSS string like "none", "auto", or "text"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/interaction/user-select";
 *
 * const css = toCss({ kind: "user-select", value: "none" });
 * // "none"
 * ```
 *
 * @public
 */
export function toCss(userSelect: UserSelect): string {
	return userSelect.value;
}
