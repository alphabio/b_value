// b_path:: src/generate/text/style.ts
import type * as Keyword from "@/core/keywords";
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

/**
 * Generate CSS text-decoration-style string from keyword.
 *
 * @param keyword - TextDecorationStyleKeyword value
 * @returns CSS text-decoration-style string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Text.Style.generate("wavy");
 * console.log(css); // "wavy"
 * ```
 */
export function generate(keyword: Keyword.TextDecorationStyleKeyword): GenerateResult {
	if (keyword === undefined || keyword === null) {
		return generateErr("invalid-ir", "Keyword.TextDecorationStyleKeyword must not be null or undefined");
	}
	if (typeof keyword !== "string") {
		return generateErr("invalid-ir", `Expected string, got ${typeof keyword}`);
	}
	return generateOk(keyword);
}
