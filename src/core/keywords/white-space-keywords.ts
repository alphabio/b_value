// b_path:: src/core/keywords/white-space-keywords.ts
import { z } from "zod";

/**
 * CSS white-space keyword values.
 *
 * The white-space property sets how white space inside an element is handled.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/white-space}
 *
 * @example
 * ```typescript
 * import { whiteSpaceKeywordsSchema } from "../keywords/white-space-keywords";
 *
 * const keyword = whiteSpaceKeywordsSchema.parse("nowrap");
 * ```
 *
 * @public
 */
export const whiteSpaceKeywordsSchema = z
	.union([
		z.literal("normal").describe("sequences of whitespace collapsed, newlines ignored"),
		z.literal("nowrap").describe("collapses whitespace, prevents wrapping"),
		z.literal("pre").describe("preserves whitespace and newlines, no wrapping"),
		z.literal("pre-wrap").describe("preserves whitespace and newlines, wraps normally"),
		z.literal("pre-line").describe("collapses whitespace, preserves newlines, wraps normally"),
		z.literal("break-spaces").describe("like pre-wrap but preserves sequences of spaces"),
	])
	.describe("CSS white-space property keyword values");

/**
 * Array of all white-space keyword values.
 *
 * @public
 */
export const WHITE_SPACE_KEYWORDS = whiteSpaceKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for white-space keywords.
 *
 * @public
 */
export type WhiteSpaceKeyword = z.infer<typeof whiteSpaceKeywordsSchema>;

/**
 * Metadata for white-space keyword options.
 *
 * @public
 */
export const whiteSpaceKeywordsMetadata = {
	normal: {
		value: "normal" as const,
		description: "Sequences of whitespace collapsed, newlines ignored",
	},
	nowrap: {
		value: "nowrap" as const,
		description: "Collapses whitespace, prevents wrapping",
	},
	pre: {
		value: "pre" as const,
		description: "Preserves whitespace and newlines, no wrapping",
	},
	"pre-wrap": {
		value: "pre-wrap" as const,
		description: "Preserves whitespace and newlines, wraps normally",
	},
	"pre-line": {
		value: "pre-line" as const,
		description: "Collapses whitespace, preserves newlines, wraps normally",
	},
	"break-spaces": {
		value: "break-spaces" as const,
		description: "Like pre-wrap but preserves sequences of spaces",
	},
} as const;
