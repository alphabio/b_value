// b_path:: src/generate/visual/background-blend-mode.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { BackgroundBlendMode } from "@/core/types";
import { backgroundBlendModeSchema } from "@/core/types/visual";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS background-blend-mode property from IR.
 *
 * Outputs blend mode keyword value.
 *
 * @param blendMode - BackgroundBlendMode IR
 * @returns CSS string like "multiply" or "screen"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode}
 *
 * @example
 * ```typescript
 * import { generate } from "@/generate/visual/background-blend-mode";
 *
 * const css = generate({ kind: "background-blend-mode", mode: "multiply" });
 * // "multiply"
 * ```
 *
 * @public
 */
export function generate(blendMode: BackgroundBlendMode): GenerateResult {
	// Validate IR with Zod schema
	const validation = backgroundBlendModeSchema.safeParse(blendMode);

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
export const generateBackgroundBlendMode = generate;
