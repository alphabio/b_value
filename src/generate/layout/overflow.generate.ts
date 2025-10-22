// b_path:: src/generate/layout/overflow.generate.ts

import type { Overflow } from "../../parse/layout/overflow";

/**
 * Generate CSS overflow value.
 *
 * @param overflow - Overflow IR value
 * @returns CSS overflow string
 *
 * @example
 * toCss("auto")   // "auto"
 * toCss("hidden") // "hidden"
 */
export function toCss(overflow: Overflow): string {
	return overflow;
}
