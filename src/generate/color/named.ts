// b_path:: src/generate/color/named.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { NamedColor } from "@/core/types/color";

/**
 * Generate CSS from a named color value.
 *
 * Converts a NamedColor IR back to its CSS string representation.
 * Output is always lowercase color name.
 *
 * @param color - The named color to convert
 * @returns CSS color name string
 *
 * @example
 * ```typescript
 * import { generate } from "@/generate/color/named";
 *
 * const css1 = generate({ kind: "named", name: "red" });
 * // => { ok: true, value: "red" }
 *
 * const css2 = generate({ kind: "named", name: "cornflowerblue" });
 * // => { ok: true, value: "cornflowerblue" }
 * ```
 *
 * @public
 */
export function generate(color: NamedColor): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "NamedColor must not be null or undefined");
	}
	if (typeof color !== "object") {
		return generateErr("invalid-ir", `Expected NamedColor object, got ${typeof color}`);
	}
	if (!("name" in color)) {
		return generateErr("missing-required-field", "NamedColor must have 'name' field");
	}
	return generateOk(color.name);
}
