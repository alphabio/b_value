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
		const radiusOptimized = generateOptimizedBorderRadius(value.borderRadius);
		radiusCss = ` round ${radiusOptimized}`;
	}

	return `xywh(${xywhCss}${radiusCss})`;
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

	if (tl === tr && tr === br && br === bl) {
		return tl;
	}

	if (tl === br && tr === bl) {
		return `${tl} ${tr}`;
	}

	if (tr === bl) {
		return `${tl} ${tr} ${br}`;
	}

	return `${tl} ${tr} ${br} ${bl}`;
}
