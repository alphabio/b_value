// b_path:: src/generate/color/system.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { SystemColor } from "@/core/types/color";

/**
 * Generate CSS from a system color value.
 *
 * Converts a SystemColor IR back to its CSS string representation.
 * System color keywords are output as-is with their original casing.
 *
 * @param color - The system color to convert
 * @returns CSS system color keyword string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color/system";
 *
 * const css1 = toCss({ kind: "system", keyword: "ButtonText" });
 * // => "ButtonText"
 *
 * const css2 = toCss({ kind: "system", keyword: "Canvas" });
 * // => "Canvas"
 * ```
 *
 * @public
 */
export function generate(color: SystemColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "SystemColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected SystemColor object, got ${typeof color}`);
	}
	if (!("keyword" in color)) {
		return generateErr("missing-required-field", "SystemColor must have 'keyword' field");
	}
	return generateOk(color.keyword);
}
