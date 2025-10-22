// b_path:: src/generate/background/clip.ts
import type * as Keyword from "@/core/keywords";
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

/**
 * Generate CSS background-clip string from keyword.
 *
 * @param keyword - BackgroundClipKeyword value
 * @returns CSS background-clip string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Clip.generate("padding-box");
 * console.log(css); // "padding-box"
 * ```
 */
export function generate(keyword: Keyword.BackgroundClipKeyword): GenerateResult {
	if (keyword === undefined || keyword === null) {
		return generateErr("invalid-ir", "Keyword must not be null or undefined");
	}
	if (typeof keyword !== "string") {
		return generateErr("invalid-ir", `Expected string keyword, got ${typeof keyword}`);
	}
	return generateOk(keyword);
}
