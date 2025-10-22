// b_path:: src/generate/background/size.ts
import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
 * const css = Generate.Background.Size.generate("cover");
 * console.log(css); // "cover"
 * ```
 *
 * @example
 * Length value:
 * ```typescript
 * const css = Generate.Background.Size.generate({ value: 100, unit: "px" });
 * console.log(css); // "100px"
 * ```
 */
export function generate(value: BackgroundSizeValue): GenerateResult {
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "BackgroundSizeValue must not be null or undefined");
	}
	if (typeof value === "string") {
		return generateOk(value);
	}
	if (typeof value !== "object") {
		return generateErr("invalid-ir", `Expected string or object, got ${typeof value}`);
	}
	if (!("value" in value) || !("unit" in value)) {
		return generateErr("missing-required-field", "Length-percentage must have 'value' and 'unit' fields");
	}
	return generateOk(`${value.value}${value.unit}`);
}
