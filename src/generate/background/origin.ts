// b_path:: src/generate/background/origin.ts
import type * as Keyword from "@/core/keywords";
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

/**
 * Generate CSS background-origin string from keyword.
 *
 * @param keyword - VisualBoxKeyword value
 * @returns CSS background-origin string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Origin.generate("content-box");
 * console.log(css); // "content-box"
 * ```
 */
export function generate(keyword: Keyword.VisualBoxKeyword): GenerateResult {
	if (keyword === undefined || keyword === null) {
		return generateErr("invalid-ir", "Keyword must not be null or undefined");
	}
	if (typeof keyword !== "string") {
		return generateErr("invalid-ir", `Expected string keyword, got ${typeof keyword}`);
	}
	return generateOk(keyword);
}
