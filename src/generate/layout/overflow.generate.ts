// b_path:: src/generate/layout/overflow.generate.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
export function generate(overflow: Overflow): GenerateResult {
	if (overflow === undefined || overflow === null) {
		return generateErr("invalid-ir", "Overflow must not be null or undefined");
	}
	if (typeof overflow !== "string") {
		return generateErr("invalid-ir", `Expected string, got ${typeof overflow}`);
	}
	return generateOk(overflow);
}
