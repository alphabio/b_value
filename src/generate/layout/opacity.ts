// b_path:: src/generate/layout/opacity.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { Opacity } from "@/core/types";
import { opacitySchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS opacity property from IR.
 *
 * Outputs opacity value as a number (0-1).
 *
 * @param opacity - Opacity IR
 * @returns CSS string like "0.5" or "1"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/opacity}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/opacity";
 *
 * const css = toCss({ kind: "opacity", value: 0.5 });
 * // "0.5"
 * ```
 *
 * @public
 */
export function generate(opacity: Opacity): GenerateResult {
	// Validate IR with Zod schema
	const validation = opacitySchema.safeParse(opacity);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(opacity.value.toString());
}
