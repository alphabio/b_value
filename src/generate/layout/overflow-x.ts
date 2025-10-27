// b_path:: src/generate/layout/overflow-x.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { OverflowX } from "@/core/types";
import { overflowXSchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS overflow-x property from IR.
 *
 * Outputs overflow-x keyword value.
 *
 * @param overflowX - OverflowX IR
 * @returns CSS string like "hidden" or "scroll"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/overflow-x";
 *
 * const css = toCss({ kind: "overflow-x", value: "hidden" });
 * // "hidden"
 * ```
 *
 * @public
 */
export function generate(overflowX: OverflowX): GenerateResult {
	// Validate IR with Zod schema
	const validation = overflowXSchema.safeParse(overflowX);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(overflowX.value);
}
