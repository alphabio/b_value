// b_path:: src/generate/clip-path/inset.ts
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
export function toCss(value: Type.ClipPathInset): string {
	// Generate TRBL CSS (optimized to shortest form)
	const trblCss = generateOptimizedTRBL({
		top: value.top,
		right: value.right,
		bottom: value.bottom,
		left: value.left,
	});

	// Generate optional border-radius
	let radiusCss = "";
	if (value.borderRadius) {
		const radiusOptimized = generateOptimizedBorderRadius(value.borderRadius);
		radiusCss = ` round ${radiusOptimized}`;
	}

	return `inset(${trblCss}${radiusCss})`;
}

/**
 * Generate optimized TRBL CSS (shortest form).
 *
 * @internal
 */
function generateOptimizedTRBL(trbl: {
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

/**
 * Generate optimized border-radius CSS (shortest form).
 *
 * @internal
 */
function generateOptimizedBorderRadius(radius: Type.InsetBorderRadius): string {
	const tl = GenerateUtils.lengthPercentageToCss(radius.topLeft);
	const tr = GenerateUtils.lengthPercentageToCss(radius.topRight);
	const br = GenerateUtils.lengthPercentageToCss(radius.bottomRight);
	const bl = GenerateUtils.lengthPercentageToCss(radius.bottomLeft);

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
