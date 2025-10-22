// b_path:: src/generate/typography/font-family.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { FontFamily } from "@/core/types";

/**
 * Generate CSS font-family property from IR.
 *
 * Outputs comma-separated list of font families.
 *
 * @param fontFamily - FontFamily IR
 * @returns CSS string like "Arial, sans-serif"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-family}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/font-family";
 *
 * const css = toCss({ kind: "font-family", families: ["Arial", "sans-serif"] });
 * // "Arial, sans-serif"
 * ```
 *
 * @public
 */
export function generate(fontFamily: FontFamily): GenerateResult {
	if (fontFamily === undefined || fontFamily === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return fontFamily.families
		.map((family) => {
			// Quote families with spaces
			if (family.includes(" ")) {
				return generateOk(`"${family}"`);
			}
			return generateOk(family);
		})
		.join(", ");
}
