// b_path:: src/generate/typography/text-align.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { TextAlign } from "@/core/types";

/**
 * Generate CSS text-align property from IR.
 *
 * Outputs alignment keyword.
 *
 * @param textAlign - TextAlign IR
 * @returns CSS string like "center", "left", or "justify"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-align}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/text-align";
 *
 * const css = toCss({ kind: "text-align", value: "center" });
 * // "center"
 * ```
 *
 * @public
 */
export function generate(textAlign: TextAlign): GenerateResult {
	if (textAlign === undefined || textAlign === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return generateOk(textAlign.value);
}
