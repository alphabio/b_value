// b_path:: src/generate/background/position-x.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { PositionValue } from "@/core/types";

/**
 * Generate CSS background-position-x string from value.
 *
 * @param value - PositionValue (keyword or length-percentage)
 * @returns CSS background-position-x string
 *
 * @public
 *
 * @example
 * Keyword:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.PositionX.generate("center");
 * console.log(css); // "center"
 * ```
 *
 * @example
 * Percentage:
 * ```typescript
 * const css = Generate.Background.PositionX.generate({ value: 25, unit: "%" });
 * console.log(css); // "25%"
 * ```
 *
 * @example
 * Length:
 * ```typescript
 * const css = Generate.Background.PositionX.generate({ value: 10, unit: "px" });
 * console.log(css); // "10px"
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
