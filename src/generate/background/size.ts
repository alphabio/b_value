// b_path:: src/generate/background/size.ts
import type { BackgroundSizeValue } from "../../parse/background/size";

/**
 * Generate CSS background-size string from value.
 *
 * @param value - BackgroundSizeValue (keyword, auto, or length-percentage)
 * @returns CSS background-size string
 *
 * @public
 *
 * @example
 * Keyword:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Size.toCss("cover");
 * console.log(css); // "cover"
 * ```
 *
 * @example
 * Length value:
 * ```typescript
 * const css = Generate.Background.Size.toCss({ value: 100, unit: "px" });
 * console.log(css); // "100px"
 * ```
 */
export function toCss(value: BackgroundSizeValue): string {
	if (typeof value === "string") {
		return value;
	}
	return `${value.value}${value.unit}`;
}
