// b_path:: src/generate/layout/cursor.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
export function generate(cursor: Cursor): GenerateResult {
	if (cursor === undefined || cursor === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(cursor.value);
}
