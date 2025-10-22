// b_path:: src/generate/clip-path/none.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { ClipPathNone } from "@/core/types/clip-path";

/**
 * Generate CSS none keyword for clip-path property.
 *
 * Converts ClipPathNone IR to CSS "none" keyword.
 *
 * @param _value - ClipPathNone IR value (unused)
 * @returns CSS string "none"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path}
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.ClipPath.None.generate({ kind: "clip-path-none" });
 * // "none"
 * ```
 *
 * @public
 */
export function generate(_value: ClipPathNone): GenerateResult {
	if (_value === undefined || _value === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk("none");
}
