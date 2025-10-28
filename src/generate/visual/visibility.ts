// b_path:: src/generate/visual/visibility.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { Visibility } from "@/core/types";
import { visibilitySchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS visibility property from IR.
 *
 * Outputs visibility keyword value.
 *
 * @param visibility - Visibility IR
 * @returns CSS string like "visible" or "hidden"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/visibility";
 *
 * const css = toCss({ kind: "visibility", value: "hidden" });
 * // "hidden"
 * ```
 *
 * @public
 */
export function generate(visibility: Visibility): GenerateResult {
	// Validate IR with Zod schema
	const validation = visibilitySchema.safeParse(visibility);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(visibility.value);
}
