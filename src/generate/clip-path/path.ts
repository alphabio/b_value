// b_path:: src/generate/clip-path/path.ts
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
export function toCss(value: Type.ClipPathPath): string {
	const pathDataEscaped = value.pathData.replace(/'/g, "\\'");

	if (value.fillRule) {
		return `path(${value.fillRule}, '${pathDataEscaped}')`;
	}

	return `path('${pathDataEscaped}')`;
}
