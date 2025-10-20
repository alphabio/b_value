// b_path:: src/generate/clip-path/rect.ts
import type * as Type from "@/core/types";
import * as GenerateUtils from "@/utils/generate";

/**
 * Generate CSS for rect() function.
 *
 * Always outputs all 4 values for clarity (top right bottom left).
 * Does not optimize to shorter forms.
 *
 * @param value - ClipPathRect IR
 * @returns CSS rect() function string
 *
 * @example
 * ```typescript
 * const css = toCss({
 *   kind: "clip-path-rect",
 *   top: { value: 10, unit: "px" },
 *   right: "auto",
 *   bottom: { value: 20, unit: "px" },
 *   left: "auto"
 * });
 * // "rect(10px auto 20px auto)"
 * ```
 *
 * @public
 */
export function toCss(value: Type.ClipPathRect): string {
	// Generate TRBL CSS (always 4 values)
	const top = value.top === "auto" ? "auto" : GenerateUtils.lengthPercentageToCss(value.top);
	const right = value.right === "auto" ? "auto" : GenerateUtils.lengthPercentageToCss(value.right);
	const bottom = value.bottom === "auto" ? "auto" : GenerateUtils.lengthPercentageToCss(value.bottom);
	const left = value.left === "auto" ? "auto" : GenerateUtils.lengthPercentageToCss(value.left);

	const trblCss = `${top} ${right} ${bottom} ${left}`;

	// Generate optional border-radius
	let radiusCss = "";
	if (value.borderRadius) {
		radiusCss = ` round ${GenerateUtils.borderRadiusToCss(value.borderRadius)}`;
	}

	return `rect(${trblCss}${radiusCss})`;
}
