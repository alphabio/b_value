// b_path:: src/generate/clip-path/url.ts

import { type GenerateResult, generateErr } from "@/core/result";
import type { Url } from "@/core/types/url";
import { urlToCss } from "@/utils/generate/url";

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
 * const css = Generate.ClipPath.Url.generate({
 *   kind: "url",
 *   value: "#clip-shape"
 * });
 * // "url(#clip-shape)"
 * ```
 *
 * @public
 */
export function generate(value: Url): GenerateResult {
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return urlToCss(value);
}
