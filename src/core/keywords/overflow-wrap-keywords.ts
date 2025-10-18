// b_path:: src/core/keywords/overflow-wrap-keywords.ts
import { z } from "zod";

/**
 * CSS overflow-wrap keyword values.
 *
 * The overflow-wrap property applies to inline elements, setting whether the browser
 * should insert line breaks within an otherwise unbreakable string to prevent text
 * from overflowing its line box.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap}
 *
 * @example
 * ```typescript
 * import { overflowWrapKeywordsSchema } from "@/core/keywords/overflow-wrap-keywords";
 *
 * const keyword = overflowWrapKeywordsSchema.parse("break-word");
 * ```
 *
 * @public
 */
export const overflowWrapKeywordsSchema = z
	.union([
		z.literal("normal").describe("lines break only at normal break points"),
		z.literal("anywhere").describe("breaks at any character if no acceptable break point"),
		z.literal("break-word").describe("like anywhere but affects min-content size"),
	])
	.describe("CSS overflow-wrap property keyword values");

/**
 * Array of all overflow-wrap keyword values.
 *
 * @public
 */
export const OVERFLOW_WRAP_KEYWORDS = overflowWrapKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for overflow-wrap keywords.
 *
 * @public
 */
export type OverflowWrapKeyword = z.infer<typeof overflowWrapKeywordsSchema>;

/**
 * Metadata for overflow-wrap keyword options.
 *
 * @public
 */
export const overflowWrapKeywordsMetadata = {
	normal: {
		value: "normal" as const,
		description: "Lines break only at normal break points",
	},
	anywhere: {
		value: "anywhere" as const,
		description: "Breaks at any character if no acceptable break point",
	},
	"break-word": {
		value: "break-word" as const,
		description: "Like anywhere but affects min-content size",
	},
} as const;
