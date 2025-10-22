// b_path:: src/generate/typography/font-style.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FontStyle } from "@/core/types";

/**
 * Generate CSS font-style property from IR.
 *
 * Outputs keyword value.
 *
 * @param fontStyle - FontStyle IR
 * @returns CSS string like "normal", "italic", or "oblique"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-style}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/font-style";
 *
 * const css = toCss({ kind: "font-style", value: "italic" });
 * // "italic"
 * ```
 *
 * @public
 */
export function generate(fontStyle: FontStyle): GenerateResult {
	if (fontStyle === undefined || fontStyle === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(fontStyle.value);
}
