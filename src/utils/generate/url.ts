// b_path:: src/utils/generate/url.ts

import type { Url } from "@/core/types/url";

/**
 * Generate CSS url() function.
 *
 * Shared utility for generating URL references across different CSS properties.
 *
 * @param value - Url IR value
 * @returns CSS string like "url(#id)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/url_function}
 *
 * @example
 * ```typescript
 * import { urlToCss } from "@/utils/generate/url";
 *
 * const css = urlToCss({ kind: "url", value: "#clip-shape" });
 * // "url(#clip-shape)"
 * ```
 *
 * @public
 */
export function urlToCss(value: Url): string {
	return `url(${value.value})`;
}
