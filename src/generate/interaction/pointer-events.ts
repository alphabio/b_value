// b_path:: src/generate/interaction/pointer-events.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { PointerEvents } from "@/core/types";

/**
 * Generate CSS pointer-events property from IR.
 *
 * Outputs keyword value.
 *
 * @param pointerEvents - PointerEvents IR
 * @returns CSS string like "none", "auto", or "visiblePainted"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/interaction/pointer-events";
 *
 * const css = toCss({ kind: "pointer-events", value: "none" });
 * // "none"
 * ```
 *
 * @public
 */
export function generate(pointerEvents: PointerEvents): GenerateResult {
	if (pointerEvents === undefined || pointerEvents === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(pointerEvents.value);
}
