// b_path:: src/generate/layout/clear.generate.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
export function generate(clear: Clear): GenerateResult {
	if (clear === undefined || clear === null) {
		return generateErr("invalid-ir", "Clear must not be null or undefined");
	}
	if (typeof clear !== "string") {
		return generateErr("invalid-ir", `Expected string, got ${typeof clear}`);
	}
	return generateOk(clear);
}
