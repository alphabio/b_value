// b_path:: src/generate/layout/cursor.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type { Cursor } from "@/core/types";
import { cursorSchema } from "@/core/types/layout";
import { zodErrorToIssues } from "@/utils/generate";

/**
 * Generate CSS cursor property from IR.
 *
 * Outputs cursor keyword value.
 *
 * @param cursor - Cursor IR
 * @returns CSS string like "pointer" or "text"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/layout/cursor";
 *
 * const css = toCss({ kind: "cursor", value: "pointer" });
 * // "pointer"
 * ```
 *
 * @public
 */
export function generate(cursor: Cursor): GenerateResult {
	// Validate IR with Zod schema
	const validation = cursorSchema.safeParse(cursor);

	if (!validation.success) {
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	return generateOk(cursor.value);
}
