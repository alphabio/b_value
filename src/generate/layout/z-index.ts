// b_path:: src/generate/layout/z-index.ts
import { type GenerateResult, generateOk } from "@/core/result";
import type { ZIndex } from "@/core/types";

/**
 * Generate CSS z-index property from IR.
 *
 * Outputs integer value or "auto" keyword.
 *
 * @param zIndex - ZIndex IR
 * @returns GenerateResult containing CSS string like "10", "-5", or "auto"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/z-index}
 *
 * @example
 * ```typescript
 * import { generate } from "@/generate/layout/z-index";
 *
 * const result = generate({ kind: "z-index", value: 10 });
 * // { ok: true, value: "10", issues: [] }
 * ```
 *
 * @example
 * ```typescript
 * const result = generate({ kind: "z-index", value: "auto" });
 * // { ok: true, value: "auto", issues: [] }
 * ```
 *
 * @public
 */
export function generate(zIndex: ZIndex): GenerateResult {
	return generateOk(String(zIndex.value));
}
