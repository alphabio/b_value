// b_path:: src/generate/typography/line-height.ts
import type { LineHeight } from "@/core/types";
import * as GenUtils from "@/utils/generate";

/**
 * Generate CSS line-height property from IR.
 *
 * Outputs unitless number, length-percentage, or keyword.
 *
 * @param lineHeight - LineHeight IR
 * @returns CSS string like "1.5", "20px", or "normal"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/line-height}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/typography/line-height";
 *
 * const css = toCss({ kind: "line-height", value: 1.5 });
 * // "1.5"
 * ```
 *
 * @public
 */
export function toCss(lineHeight: LineHeight): string {
	const { value } = lineHeight;

	if (typeof value === "string") {
		return value;
	}

	if (typeof value === "number") {
		return String(value);
	}

	return GenUtils.lengthPercentageToCss(value);
}
