// b_path:: src/generate/layout/clear.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { Clear } from "@/core/types";
import { clearSchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate/validation";

/**
 * Generate CSS clear value.
 *
 * @param clear - Clear IR value
 * @returns CSS clear string
 *
 * @example
 * toCss({ kind: "clear", value: "both" })  // "both"
 * toCss({ kind: "clear", value: "left" })  // "left"
 */
export function generate(clear: Clear): GenerateResult {
	// Validate IR with Zod schema
	const validation = clearSchema.safeParse(clear);

	if (!validation.success) {
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	return generateOk(clear.value);
}
