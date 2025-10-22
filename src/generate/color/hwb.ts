// b_path:: src/generate/color/hwb.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { HWBColor } from "@/core/types/color";

/**
 * Generate CSS string from HWB color object.
 *
 * Always outputs modern space-separated syntax:
 * - `hwb(120 20% 30%)` - without alpha
 * - `hwb(120 20% 30% / 0.5)` - with alpha
 *
 * @param color - The HWB color object
 * @returns CSS HWB color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/hwb";
 *
 * // Basic HWB
 * toCss({ kind: "hwb", h: 120, w: 20, b: 30 });
 * // => "hwb(120 20% 30%)"
 *
 * // With alpha
 * toCss({ kind: "hwb", h: 120, w: 20, b: 30, alpha: 0.5 });
 * // => "hwb(120 20% 30% / 0.5)"
 * ```
 *
 * @public
 */
export function generate(color: HWBColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "HWBColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected HWBColor object, got ${typeof color}`);
	}
	if (!("h" in color) || !("w" in color) || !("b" in color)) {
		return generateErr("missing-required-field", "HWBColor must have 'h', 'w', 'b' fields");
	}

	const { h, w, b, alpha } = color;

	// Format: hwb(H W% B%)
	let result = `hwb(${h} ${w}% ${b}%`;

	// Add alpha if present and not fully opaque
	if (alpha !== undefined && alpha !== 1) {
		result += ` / ${alpha}`;
	}

	result += ")";
	return generateOk(result);
}
