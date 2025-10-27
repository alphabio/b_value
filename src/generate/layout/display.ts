// b_path:: src/generate/layout/display.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { Display } from "@/core/types";
import { displaySchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS display property from IR.
 *
 * Outputs display keyword value.
 *
 * @param display - Display IR
 * @returns CSS string like "flex" or "none"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/display";
 *
 * const css = toCss({ kind: "display", value: "flex" });
 * // "flex"
 * ```
 *
 * @public
 */
export function generate(display: Display): GenerateResult {
	// Validate IR with Zod schema
	const validation = displaySchema.safeParse(display);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(display.value);
}
