// b_path:: src/generate/text/thickness.ts
import type { TextDecorationThicknessValue } from "../../parse/text/thickness";

/**
 * Generate CSS text-decoration-thickness string from value.
 *
 * @param value - TextDecorationThicknessValue (keyword or length-percentage)
 * @returns CSS text-decoration-thickness string
 *
 * @public
 *
 * @example
 * Keyword:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Text.Thickness.toCss("auto");
 * console.log(css); // "auto"
 * ```
 *
 * @example
 * Length value:
 * ```typescript
 * const css = Generate.Text.Thickness.toCss({ value: 2, unit: "px" });
 * console.log(css); // "2px"
 * ```
 */
export function toCss(value: TextDecorationThicknessValue): string {
	if (typeof value === "string") {
		return value;
	}
	return `${value.value}${value.unit}`;
}
