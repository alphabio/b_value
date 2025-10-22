// b_path:: src/generate/layout/float.generate.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
export function generate(float: Float): GenerateResult {
	if (float === undefined || float === null) {
		return generateErr("invalid-ir", "Float must not be null or undefined");
	}
	if (typeof float !== "string") {
		return generateErr("invalid-ir", `Expected string, got ${typeof float}`);
	}
	return generateOk(float);
}
