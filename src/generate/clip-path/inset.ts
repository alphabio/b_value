// b_path:: src/generate/clip-path/inset.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as GenerateUtils from "@/utils/generate";

/**
 * Generate CSS for inset() function.
 *
 * Optimizes TRBL values to shortest form:
 * - 4 equal values → 1 value
 * - top/bottom same, left/right same → 2 values
 * - etc.
 *
 * @param value - ClipPathInset IR
 * @returns CSS inset() function string
 *
 * @example
 * ```typescript
 * const css = toCss({
 *   kind: "clip-path-inset",
 *   top: { value: 10, unit: "px" },
 *   right: { value: 10, unit: "px" },
 *   bottom: { value: 10, unit: "px" },
 *   left: { value: 10, unit: "px" }
 * });
 * // "inset(10px)"
 * ```
 *
 * @public
 */
export function generate(value: Type.ClipPathInset): GenerateResult {
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	// Generate TRBL CSS (optimized to shortest form)
	const trblCss = generateTRBL({
		top: value.top,
		right: value.right,
		bottom: value.bottom,
		left: value.left,
	});

	// Generate optional border-radius
	let radiusCss = "";
	if (value.borderRadius) {
		radiusCss = ` round ${GenerateUtils.borderRadiusToCss(value.borderRadius)}`;
	}

	return generateOk(`inset(${trblCss}${radiusCss})`);
}

/**
 * Generate TRBL CSS in shortest form.
 *
 * @internal
 */
function generateTRBL(trbl: {
	top: Type.LengthPercentage;
	right: Type.LengthPercentage;
	bottom: Type.LengthPercentage;
	left: Type.LengthPercentage;
}): string {
	const top = GenerateUtils.lengthPercentageToCss(trbl.top);
	const right = GenerateUtils.lengthPercentageToCss(trbl.right);
	const bottom = GenerateUtils.lengthPercentageToCss(trbl.bottom);
	const left = GenerateUtils.lengthPercentageToCss(trbl.left);

	// Check for optimization opportunities
	if (top === right && right === bottom && bottom === left) {
		// All equal: 1 value
		return top;
	}

	if (top === bottom && right === left) {
		// Vertical same, horizontal same: 2 values
		return `${top} ${right}`;
	}

	if (right === left) {
		// Left/right same: 3 values
		return `${top} ${right} ${bottom}`;
	}

	// All different: 4 values
	return `${top} ${right} ${bottom} ${left}`;
}
