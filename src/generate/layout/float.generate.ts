// b_path:: src/generate/layout/float.generate.ts

import type { Float } from "../../parse/layout/float";

/**
 * Generate CSS float value.
 *
 * @param float - Float IR value
 * @returns CSS float string
 *
 * @example
 * toCss("left")  // "left"
 * toCss("right") // "right"
 */
export function toCss(float: Float): string {
	return float;
}
