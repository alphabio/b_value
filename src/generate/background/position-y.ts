// b_path:: src/generate/background/position-y.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { PositionValue } from "@/core/types";

/**
 * Generate CSS background-position-y string from value.
 *
 * @param value - PositionValue (keyword or length-percentage)
 * @returns CSS background-position-y string
 *
 * @public
 *
 * @example
 * Keyword:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.PositionY.generate("top");
 * console.log(css); // "top"
 * ```
 *
 * @example
 * Percentage:
 * ```typescript
 * const css = Generate.Background.PositionY.generate({ value: 50, unit: "%" });
 * console.log(css); // "50%"
 * ```
 *
 * @example
 * Length:
 * ```typescript
 * const css = Generate.Background.PositionY.generate({ value: 20, unit: "px" });
 * console.log(css); // "20px"
 * ```
 */
export function generate(value: PositionValue): GenerateResult {
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "PositionValue must not be null or undefined");
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
