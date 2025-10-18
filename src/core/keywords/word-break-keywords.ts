// b_path:: src/core/keywords/word-break-keywords.ts
import { z } from "zod";

/**
 * CSS word-break keyword values.
 *
 * The word-break property sets whether line breaks appear wherever the text would
 * otherwise overflow its content box.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/word-break}
 *
 * @example
 * ```typescript
 * import { wordBreakKeywordsSchema } from "../keywords/word-break-keywords";
 *
 * const keyword = wordBreakKeywordsSchema.parse("break-all");
 * ```
 *
 * @public
 */
export const wordBreakKeywordsSchema = z
	.union([
		z.literal("normal").describe("default line break rules"),
		z.literal("break-all").describe("breaks can be inserted between any characters"),
		z.literal("keep-all").describe("breaks prohibited between CJK characters"),
		z.literal("break-word").describe("like word-break: normal with overflow-wrap: anywhere"),
	])
	.describe("CSS word-break property keyword values");

/**
 * Array of all word-break keyword values.
 *
 * @public
 */
export const WORD_BREAK_KEYWORDS = wordBreakKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for word-break keywords.
 *
 * @public
 */
export type WordBreakKeyword = z.infer<typeof wordBreakKeywordsSchema>;

/**
 * Metadata for word-break keyword options.
 *
 * @public
 */
export const wordBreakKeywordsMetadata = {
	normal: {
		value: "normal" as const,
		description: "Default line break rules",
	},
	"break-all": {
		value: "break-all" as const,
		description: "Breaks can be inserted between any characters",
	},
	"keep-all": {
		value: "keep-all" as const,
		description: "Breaks prohibited between CJK characters",
	},
	"break-word": {
		value: "break-word" as const,
		description: "Like word-break: normal with overflow-wrap: anywhere",
	},
} as const;
