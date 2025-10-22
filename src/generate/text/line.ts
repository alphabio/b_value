// b_path:: src/generate/text/line.ts
import type * as Keyword from "@/core/keywords";
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

/**
 * Generate CSS text-decoration-line string from keyword.
 *
 * @param keyword - TextDecorationLineKeyword value
 * @returns CSS text-decoration-line string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Text.Line.generate("underline");
 * console.log(css); // "underline"
 * ```
 */
export function generate(keyword: Keyword.TextDecorationLineKeyword): GenerateResult {
	if (keyword === undefined || keyword === null) {
		return generateErr("invalid-ir", "Keyword.TextDecorationLineKeyword must not be null or undefined");
	}
	if (typeof keyword !== "string") {
		return generateErr("invalid-ir", `Expected string, got ${typeof keyword}`);
	}
	return generateOk(keyword);
}
