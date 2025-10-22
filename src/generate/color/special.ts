// b_path:: src/generate/color/special.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { SpecialColor } from "@/core/types/color";

/**
 * Generate CSS from a special color value.
 *
 * Converts a SpecialColor IR back to its CSS string representation.
 * Special color keywords are output in lowercase.
 *
 * @param color - The special color to convert
 * @returns CSS special color keyword string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/special";
 *
 * const css1 = toCss({ kind: "special", keyword: "transparent" });
 * // => "transparent"
 *
 * const css2 = toCss({ kind: "special", keyword: "currentcolor" });
 * // => "currentcolor"
 * ```
 *
 * @public
 */
export function generate(color: SpecialColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "SpecialColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected SpecialColor object, got ${typeof color}`);
	}
	if (!("keyword" in color)) {
		return generateErr("missing-required-field", "SpecialColor must have 'keyword' field");
	}
	return generateOk(color.keyword);
}
