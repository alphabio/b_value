// b_path:: src/generate/layout/overflow-y.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { OverflowY } from "@/core/types";
import { overflowYSchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS overflow-y property from IR.
 *
 * Outputs overflow-y keyword value.
 *
 * @param overflowY - OverflowY IR
 * @returns CSS string like "auto" or "scroll"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/overflow-y";
 *
 * const css = toCss({ kind: "overflow-y", value: "auto" });
 * // "auto"
 * ```
 *
 * @public
 */
export function generate(overflowY: OverflowY): GenerateResult {
	// Validate IR with Zod schema
	const validation = overflowYSchema.safeParse(overflowY);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(overflowY.value);
}
