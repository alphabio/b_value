// b_path:: src/generate/layout/clear.generate.ts

import type { Clear } from "../../parse/layout/clear";

/**
 * Generate CSS clear value.
 *
 * @param clear - Clear IR value
 * @returns CSS clear string
 *
 * @example
 * toCss("both")  // "both"
 * toCss("left")  // "left"
 */
export function toCss(clear: Clear): string {
	return clear;
}
