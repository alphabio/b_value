// b_path:: src/generate/background/position-y.ts

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
 * const css = Generate.Background.PositionY.toCss("top");
 * console.log(css); // "top"
 * ```
 *
 * @example
 * Percentage:
 * ```typescript
 * const css = Generate.Background.PositionY.toCss({ value: 50, unit: "%" });
 * console.log(css); // "50%"
 * ```
 *
 * @example
 * Length:
 * ```typescript
 * const css = Generate.Background.PositionY.toCss({ value: 20, unit: "px" });
 * console.log(css); // "20px"
 * ```
 */
export function toCss(value: PositionValue): string {
	if (typeof value === "string") {
		return value;
	}
	return `${value.value}${value.unit}`;
}
