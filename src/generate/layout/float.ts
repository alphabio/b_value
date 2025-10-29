// b_path:: src/generate/layout/float.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { Float } from "@/core/types";
import { floatSchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate/validation";

/**
 * Generate CSS float value.
 *
 * @param float - Float IR value
 * @returns CSS float string
 *
 * @example
 * toCss({ kind: "float", value: "left" })  // "left"
 * toCss({ kind: "float", value: "right" }) // "right"
 */
export function generate(float: Float): GenerateResult {
	// Validate IR with Zod schema
	const validation = floatSchema.safeParse(float);

	if (!validation.success) {
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	return generateOk(float.value);
}
