// b_path:: src/generate/filter/url.ts
import type { UrlFilter } from "@/core/types/filter";

/**
 * Generate CSS url() filter function from IR.
 *
 * Outputs URL as-is without quotes for simple URLs and fragments.
 *
 * @param filter - UrlFilter IR
 * @returns CSS string like "url(#filter-id)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/url}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/url";
 *
 * const css = toCss({ kind: "url", url: "#filter-id" });
 * // "url(#filter-id)"
 *
 * const css2 = toCss({ kind: "url", url: "path/to/filter.svg" });
 * // "url(path/to/filter.svg)"
 * ```
 *
 * @public
 */
export function toCss(filter: UrlFilter): string {
	const { url } = filter;
	return `url(${url})`;
}
