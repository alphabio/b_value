// b_path:: src/generate/background/position-x.ts

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
 * const css = Generate.Background.PositionX.toCss("center");
 * console.log(css); // "center"
 * ```
 *
 * @example
 * Percentage:
 * ```typescript
 * const css = Generate.Background.PositionX.toCss({ value: 25, unit: "%" });
 * console.log(css); // "25%"
 * ```
 *
 * @example
 * Length:
 * ```typescript
 * const css = Generate.Background.PositionX.toCss({ value: 10, unit: "px" });
 * console.log(css); // "10px"
 * ```
 */
export function toCss(value: PositionValue): string {
	if (typeof value === "string") {
		return value;
	}
	return `${value.value}${value.unit}`;
}
