// b_path:: src/core/keywords/auto-keyword.ts
import { z } from "zod";

/**
 * CSS `auto` keyword.
 *
 * The `auto` keyword is used across many CSS properties to indicate
 * automatic calculation or default behavior. Context determines exact meaning.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/auto}
 *
 * @example
 * ```typescript
 * import { autoKeywordSchema } from "@/core/keywords/auto-keyword";
 *
 * // Parse and validate
 * const keyword = autoKeywordSchema.parse("auto"); // "auto"
 *
 * // Use in property values
 * const width = "auto";
 * ```
 *
 * @public
 */
export const autoKeywordSchema = z.literal("auto").describe("automatic calculation or default behavior");

/**
 * TypeScript type for the `auto` keyword.
 *
 * @public
 */
export type AutoKeyword = z.infer<typeof autoKeywordSchema>;

/**
 * Constant for the `auto` keyword value.
 *
 * @example
 * ```typescript
 * import { AUTO_KEYWORD } from "@/core/keywords/auto-keyword";
 *
 * if (value === AUTO_KEYWORD) {
 *   // Handle auto value
 * }
 * ```
 *
 * @public
 */
export const AUTO_KEYWORD = "auto" as const;

/**
 * Metadata for the `auto` keyword.
 *
 * Provides description for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { autoKeywordMetadata } from "@/core/keywords/auto-keyword";
 *
 * // Display in UI
 * <Option value="auto" description={autoKeywordMetadata.description} />
 * ```
 *
 * @public
 */
export const autoKeywordMetadata = {
	value: "auto",
	description: "automatic calculation or default behavior",
} as const;

/**
 * Type for auto keyword metadata.
 *
 * @public
 */
export type AutoKeywordMetadata = typeof autoKeywordMetadata;
