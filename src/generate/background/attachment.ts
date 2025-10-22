// b_path:: src/generate/background/attachment.ts
import type * as Keyword from "@/core/keywords";
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

/**
 * Generate CSS background-attachment string from keyword.
 *
 * @param keyword - BackgroundAttachmentKeyword value
 * @returns CSS background-attachment string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Background.Attachment.generate("fixed");
 * console.log(css); // "fixed"
 * ```
 */
export function generate(keyword: Keyword.BackgroundAttachmentKeyword): GenerateResult {
	if (keyword === undefined || keyword === null) {
		return generateErr("invalid-ir", "Keyword must not be null or undefined");
	}
	if (typeof keyword !== "string") {
		return generateErr("invalid-ir", `Expected string keyword, got ${typeof keyword}`);
	}
	return generateOk(keyword);
}
