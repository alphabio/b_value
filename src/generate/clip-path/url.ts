// b_path:: src/generate/clip-path/url.ts

import type { ClipPathUrl } from "@/core/types/clip-path";

/**
 * Generate CSS url() for clip-path property.
 *
 * Converts ClipPathUrl IR to CSS url() function string.
 *
 * @param value - ClipPathUrl IR value
 * @returns CSS string like "url(#clip-shape)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path}
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.ClipPath.Url.toCss({
 *   kind: "clip-path-url",
 *   url: "#clip-shape"
 * });
 * // "url(#clip-shape)"
 * ```
 *
 * @public
 */
export function toCss(value: ClipPathUrl): string {
	return `url(${value.url})`;
}
