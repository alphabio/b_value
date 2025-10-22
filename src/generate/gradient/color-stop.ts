// b_path:: src/generate/gradient/color-stop.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import { generateColor } from "@/utils/generate/color";

/**
 * Generate CSS color stop string from IR.
 *
 * Converts color stop IR into a valid CSS color stop string.
 *
 * @param ir - ColorStop IR object
 * @returns CSS color stop string
 *
 * @public
 *
 * @example
 * ```typescript
 * import * as Gradient from "@/ast/generate/gradient";
 *
 * const css1 = Gradient.ColorStop.generate({
 *   color: { kind: "named", name: "red" }
 * });
 * // Returns: "red"
 *
 * const css2 = Gradient.ColorStop.generate({
 *   color: { kind: "named", name: "blue" },
 *   position: { value: 50, unit: "%" }
 * });
 * // Returns: "blue 50%"
 *
 * const css3 = Gradient.ColorStop.generate({
 *   color: { kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 },
 *   position: { value: 100, unit: "px" }
 * });
 * // Returns: "rgb(255 0 0 / 0.5) 100px"
 * ```
 */
export function generate(ir: Type.ColorStop): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const colorStr = generateColor(ir.color);

	if (ir.position) {
		const { value, unit } = ir.position;
		return generateOk(`${colorStr} ${value}${unit}`);
	}

	return generateOk(colorStr);
}
