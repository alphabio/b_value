// b_path:: src/generate/clip-path/url.ts

import type { Url } from "@/core/types/url";

/**
 * Generate CSS url() for clip-path property.
 *
 * Converts Url IR to CSS url() function string.
 *
 * @param value - Url IR value
 * @returns CSS string like "url(#clip-shape)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path}
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.ClipPath.Url.toCss({
 *   kind: "url",
 *   value: "#clip-shape"
 * });
 * // "url(#clip-shape)"
 * ```
 *
 * @public
 */
export function toCss(value: Url): string {
	return `url(${value.value})`;
}
