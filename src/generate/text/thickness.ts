// b_path:: src/generate/text/thickness.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
 * const css = Generate.Text.Thickness.generate("auto");
 * console.log(css); // "auto"
 * ```
 *
 * @example
 * Length value:
 * ```typescript
 * const css = Generate.Text.Thickness.generate({ value: 2, unit: "px" });
 * console.log(css); // "2px"
 * ```
 */
export function generate(value: TextDecorationThicknessValue): GenerateResult {
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	if (typeof value === "string") {
		return generateOk(value);
	}
	return generateOk(`${value.value}${value.unit}`);
}
