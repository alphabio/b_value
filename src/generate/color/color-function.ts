// b_path:: src/generate/color/color-function.ts
import type * as Type from "@/core/types";

/**
 * Convert color() IR to CSS string.
 *
 * @param value - ColorFunction IR
 * @returns CSS color() function string
 *
 * @example
 * ```typescript
 * toCss({
 *   kind: "color",
 *   colorSpace: "display-p3",
 *   channels: [0.928, 0.322, 0.203],
 *   alpha: 0.8
 * });
 * // "color(display-p3 0.928 0.322 0.203 / 0.8)"
 * ```
 *
 * @public
 */
export function toCss(value: Type.ColorFunction): string {
	const parts: string[] = ["color(", value.colorSpace];

	// Add channels
	for (const channel of value.channels) {
		parts.push(" ");
		parts.push(channel.toFixed(6).replace(/\.?0+$/, "") || "0");
	}

	// Add alpha if present
	if (value.alpha !== undefined) {
		parts.push(" / ");
		parts.push(value.alpha.toFixed(6).replace(/\.?0+$/, "") || "0");
	}

	parts.push(")");
	return parts.join("");
}
