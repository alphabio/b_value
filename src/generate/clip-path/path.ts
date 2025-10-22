// b_path:: src/generate/clip-path/path.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS for path() function.
 *
 * Outputs the path data string, optionally prefixed with fill-rule.
 *
 * @param value - ClipPathPath IR
 * @returns CSS path() function string
 *
 * @example
 * ```typescript
 * const css = toCss({
 *   kind: "clip-path-path",
 *   pathData: "M 10,10 L 90,10 L 50,90 Z"
 * });
 * // "path('M 10,10 L 90,10 L 50,90 Z')"
 * ```
 *
 * @example
 * With fill-rule:
 * ```typescript
 * const css = toCss({
 *   kind: "clip-path-path",
 *   fillRule: "evenodd",
 *   pathData: "M 10,10 L 90,10 Z"
 * });
 * // "path(evenodd, 'M 10,10 L 90,10 Z')"
 * ```
 *
 * @public
 */
export function generate(value: Type.ClipPathPath): GenerateResult {
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const pathDataEscaped = value.pathData.replace(/'/g, "\\'");

	if (value.fillRule) {
		return generateOk(`path(${value.fillRule}, '${pathDataEscaped}')`);
	}

	return generateOk(`path('${pathDataEscaped}')`);
}
