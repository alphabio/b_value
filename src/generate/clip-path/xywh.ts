// b_path:: src/generate/clip-path/xywh.ts
import type * as Type from "@/core/types";
import * as GenerateUtils from "@/utils/generate";

/**
 * Generate CSS for xywh() function.
 *
 * Always outputs all 4 values (x, y, width, height).
 *
 * @param value - ClipPathXywh IR
 * @returns CSS xywh() function string
 *
 * @example
 * ```typescript
 * const css = toCss({
 *   kind: "clip-path-xywh",
 *   x: { value: 10, unit: "px" },
 *   y: { value: 20, unit: "px" },
 *   width: { value: 100, unit: "px" },
 *   height: { value: 50, unit: "px" }
 * });
 * // "xywh(10px 20px 100px 50px)"
 * ```
 *
 * @public
 */
export function toCss(value: Type.ClipPathXywh): string {
	const x = GenerateUtils.lengthPercentageToCss(value.x);
	const y = GenerateUtils.lengthPercentageToCss(value.y);
	const width = GenerateUtils.lengthPercentageToCss(value.width);
	const height = GenerateUtils.lengthPercentageToCss(value.height);

	const xywhCss = `${x} ${y} ${width} ${height}`;

	// Generate optional border-radius
	let radiusCss = "";
	if (value.borderRadius) {
		radiusCss = ` round ${GenerateUtils.borderRadiusToCss(value.borderRadius)}`;
	}

	return `xywh(${xywhCss}${radiusCss})`;
}
