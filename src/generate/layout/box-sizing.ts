// b_path:: src/generate/layout/box-sizing.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { BoxSizing } from "@/core/types";
import { boxSizingSchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS box-sizing property from IR.
 *
 * Outputs box-sizing keyword.
 *
 * @param boxSizing - BoxSizing IR
 * @returns CSS string like "border-box" or "content-box"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/box-sizing";
 *
 * const css = toCss({ kind: "box-sizing", value: "border-box" });
 * // "border-box"
 * ```
 *
 * @public
 */
export function generate(boxSizing: BoxSizing): GenerateResult {
	// Validate IR with Zod schema
	const validation = boxSizingSchema.safeParse(boxSizing);

	if (!validation.success) {
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	return generateOk(boxSizing.value);
}
