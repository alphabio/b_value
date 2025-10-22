// b_path:: src/generate/layout/position.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { PositionProperty } from "@/core/types";

/**
 * Generate CSS position property from IR.
 *
 * Outputs position keyword value.
 *
 * @param position - PositionProperty IR
 * @returns CSS string like "absolute" or "sticky"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/position";
 *
 * const css = toCss({ kind: "position-property", value: "absolute" });
 * // "absolute"
 * ```
 *
 * @public
 */
export function generate(position: PositionProperty): GenerateResult {
	if (position === undefined || position === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(position.value);
}
