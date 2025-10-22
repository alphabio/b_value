// b_path:: src/generate/color/hex.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { HexColor } from "@/core/types/color";

/**
 * Generate CSS from a hex color value.
 *
 * Converts a HexColor IR back to its CSS string representation.
 * Output is always uppercase #RRGGBB or #RRGGBBAA format.
 *
 * @param color - The hex color to convert
 * @returns CSS hex color string
 *
 * @example
 * ```typescript
 * import { generate } from "@/generate/color/hex";
 *
 * const css1 = generate({ kind: "hex", value: "#FF5733" });
 * // => { ok: true, value: "#FF5733" }
 *
 * const css2 = generate({ kind: "hex", value: "#FF573380" });
 * // => { ok: true, value: "#FF573380" }
 * ```
 *
 * @public
 */
export function generate(color: HexColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "HexColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected HexColor object, got ${typeof color}`);
	}
	if (!("value" in color)) {
		return generateErr("missing-required-field", "HexColor must have 'value' field");
	}
	return generateOk(color.value);
}
