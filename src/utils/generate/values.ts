// b_path:: src/utils/generate/values.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS value string from PositionValue IR.
 *
 * Handles both keyword and length/percentage position values.
 * Common pattern used across position and transform generation.
 *
 * @param value - PositionValue IR object
 * @returns CSS value string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { positionValueToCss } from "@/utils/generate/values";
 *
 * console.log(positionValueToCss("center")); // "center"
 * console.log(positionValueToCss({ value: 50, unit: "%" })); // "50%"
 * console.log(positionValueToCss({ value: 100, unit: "px" })); // "100px"
 * ```
 */
export function positionValueToCss(value: Type.PositionValue): string {
	if (typeof value === "string") {
		return value;
	}
	return `${value.value}${value.unit}`;
}

/**
 * Generate CSS value string from Length IR.
 *
 * @param length - Length IR object
 * @returns CSS length string
 *
 * @public
 */
export function lengthToCss(length: Type.Length): string {
	return `${length.value}${length.unit}`;
}

/**
 * Generate CSS value string from LengthPercentage IR.
 *
 * @param lengthPercentage - LengthPercentage IR object
 * @returns CSS length-percentage string
 *
 * @public
 */
export function lengthPercentageToCss(lengthPercentage: Type.LengthPercentage): string {
	return `${lengthPercentage.value}${lengthPercentage.unit}`;
}

/**
 * Generate CSS value string from Angle IR.
 *
 * @param angle - Angle IR object
 * @returns CSS angle string
 *
 * @public
 */
export function angleToCss(angle: Type.Angle): string {
	return `${angle.value}${angle.unit}`;
}

/**
 * Generate CSS value string from number.
 *
 * @param number - Number value
 * @returns CSS number string
 *
 * @public
 */
export function numberToCss(number: number): string {
	return String(number);
}

/**
 * Join an array of CSS value strings with commas and spaces.
 *
 * Common pattern for generating comma-separated CSS values.
 *
 * @param values - Array of CSS value strings
 * @returns Joined CSS string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { joinCssValues } from "@/utils/generate/values";
 *
 * const values = ["red", "blue", "green"];
 * console.log(joinCssValues(values)); // "red, blue, green"
 * ```
 */
export function joinCssValues(values: string[]): string {
	return values.join(", ");
}

/**
 * Join an array of CSS value strings with spaces.
 *
 * Common pattern for generating space-separated CSS values.
 *
 * @param values - Array of CSS value strings
 * @returns Joined CSS string
 *
 * @public
 */
export function joinCssValuesWithSpaces(values: string[]): string {
	return values.join(" ");
}
