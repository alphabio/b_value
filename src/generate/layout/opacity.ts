// b_path:: src/generate/layout/opacity.ts

import { type GenerateResult, generateErr } from "@/core/result";
import type { Opacity } from "@/core/types";

/**
 * Generate CSS opacity property from IR.
 *
 * Outputs opacity value as a number (0-1).
 *
 * @param opacity - Opacity IR
 * @returns CSS string like "0.5" or "1"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/opacity}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/opacity";
 *
 * const css = toCss({ kind: "opacity", value: 0.5 });
 * // "0.5"
 * ```
 *
 * @public
 */
export function generate(opacity: Opacity): GenerateResult {
	if (opacity === undefined || opacity === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return opacity.value.toString();
}
