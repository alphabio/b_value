// b_path:: src/generate/layout/display.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
export function generate(display: Display): GenerateResult {
	if (display === undefined || display === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(display.value);
}
