// b_path:: src/generate/background/repeat.ts
import type * as Keyword from "@/core/keywords";
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

/**
 * Generate CSS background-repeat string from keyword.
 *
 * @param keyword - RepeatKeyword value
 * @returns CSS background-repeat string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Repeat.generate("repeat-x");
 * console.log(css); // "repeat-x"
 * ```
 */
export function generate(keyword: Keyword.RepeatKeyword): GenerateResult {
	if (keyword === undefined || keyword === null) {
		return generateErr("invalid-ir", "Keyword must not be null or undefined");
	}
	if (typeof keyword !== "string") {
		return generateErr("invalid-ir", `Expected string keyword, got ${typeof keyword}`);
	}
	return generateOk(keyword);
}
