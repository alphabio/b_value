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

/**
 * Generate border-radius CSS in shortest form.
 *
 * Converts 4-corner border-radius values to shortest CSS representation:
 * - All equal → 1 value
 * - Diagonals same → 2 values
 * - Top-right/bottom-left same → 3 values
 * - All different → 4 values
 *
 * Used by clip-path shapes (inset, rect, xywh) for 'round' clause.
 *
 * @param radius - Border radius with 4 corner values
 * @returns CSS border-radius string in shortest form
 *
 * @public
 *
 * @example
 * All corners equal:
 * ```typescript
 * const radius = {
 *   topLeft: { value: 5, unit: "px" },
 *   topRight: { value: 5, unit: "px" },
 *   bottomRight: { value: 5, unit: "px" },
 *   bottomLeft: { value: 5, unit: "px" }
 * };
 * borderRadiusToCss(radius); // "5px"
 * ```
 *
 * @example
 * Diagonals same:
 * ```typescript
 * const radius = {
 *   topLeft: { value: 5, unit: "px" },
 *   topRight: { value: 10, unit: "px" },
 *   bottomRight: { value: 5, unit: "px" },
 *   bottomLeft: { value: 10, unit: "px" }
 * };
 * borderRadiusToCss(radius); // "5px 10px"
 * ```
 */
export function borderRadiusToCss(radius: {
	topLeft: Type.LengthPercentage;
	topRight: Type.LengthPercentage;
	bottomRight: Type.LengthPercentage;
	bottomLeft: Type.LengthPercentage;
}): string {
	const tl = lengthPercentageToCss(radius.topLeft);
	const tr = lengthPercentageToCss(radius.topRight);
	const br = lengthPercentageToCss(radius.bottomRight);
	const bl = lengthPercentageToCss(radius.bottomLeft);

	// Check for optimization opportunities
	if (tl === tr && tr === br && br === bl) {
		// All equal: 1 value
		return tl;
	}

	if (tl === br && tr === bl) {
		// Diagonals same: 2 values
		return `${tl} ${tr}`;
	}

	if (tr === bl) {
		// Top-right/bottom-left same: 3 values
		return `${tl} ${tr} ${br}`;
	}

	// All different: 4 values
	return `${tl} ${tr} ${br} ${bl}`;
}
