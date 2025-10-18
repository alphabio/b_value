// b_path:: src/generate/gradient/color-stop.ts

import type * as Type from "../../core/types";

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
 * const css1 = Gradient.ColorStop.toCss({ color: "red" });
 * // Returns: "red"
 *
 * const css2 = Gradient.ColorStop.toCss({
 *   color: "blue",
 *   position: { value: 50, unit: "%" }
 * });
 * // Returns: "blue 50%"
 *
 * const css3 = Gradient.ColorStop.toCss({
 *   color: "rgba(255, 0, 0, 0.5)",
 *   position: { value: 100, unit: "px" }
 * });
 * // Returns: "rgba(255, 0, 0, 0.5) 100px"
 * ```
 */
export function toCss(ir: Type.ColorStop): string {
	if (ir.position) {
		const { value, unit } = ir.position;
		return `${ir.color} ${value}${unit}`;
	}

	return ir.color;
}
