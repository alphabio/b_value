// b_path:: src/generate/visual/mix-blend-mode.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { MixBlendMode } from "@/core/types";
import { mixBlendModeSchema } from "@/core/types/visual";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS mix-blend-mode property from IR.
 *
 * Outputs blend mode keyword value.
 *
 * @param blendMode - MixBlendMode IR
 * @returns CSS string like "screen" or "overlay"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode}
 *
 * @example
 * ```typescript
 * import { generate } from "@/generate/visual/mix-blend-mode";
 *
 * const css = generate({ kind: "mix-blend-mode", mode: "screen" });
 * // "screen"
 * ```
 *
 * @public
 */
export function generate(blendMode: MixBlendMode): GenerateResult {
	// Validate IR with Zod schema
	const validation = mixBlendModeSchema.safeParse(blendMode);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	return generateOk(blendMode.mode);
}

// Legacy export for backward compatibility
export const generateMixBlendMode = generate;
