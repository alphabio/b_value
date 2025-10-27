// b_path:: src/generate/layout/position.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { PositionProperty } from "@/core/types";
import { positionPropertySchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS position property from IR.
 *
 * Outputs position keyword value.
 *
 * @param position - PositionProperty IR
 * @returns CSS string like "absolute" or "sticky"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/position";
 *
 * const css = toCss({ kind: "position-property", value: "absolute" });
 * // "absolute"
 * ```
 *
 * @public
 */
export function generate(position: PositionProperty): GenerateResult {
	// Validate IR with Zod schema
	const validation = positionPropertySchema.safeParse(position);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(position.value);
}
