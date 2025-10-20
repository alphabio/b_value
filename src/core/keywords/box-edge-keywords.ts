// b_path:: src/core/keywords/box-edge-keywords.ts
import { z } from "zod";
import { visualBoxKeywords } from "./geometry-box";

/**
 * CSS box edge keywords.
 *
 * Box edge keywords define reference boxes for positioning, clipping, and layout.
 * Used in properties like clip-path, shape-outside, background-clip, and background-origin.
 *
 * Note: For spec-compliant visual-box, shape-box, and geometry-box hierarchies,
 * see geometry-box.ts which follows the CSS specification exactly.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-edge}
 *
 * @example
 * ```typescript
 * import { boxEdgeKeywordsSchema } from "@/core/keywords/box-edge-keywords";
 *
 * const keyword = boxEdgeKeywordsSchema.parse("border-box"); // "border-box"
 * ```
 *
 * @public
 */
export const boxEdgeKeywordsSchema = z
	.union([
		// Visual box (content, padding, border)
		z
			.literal("content-box")
			.describe("outer edge of the box's content area"),
		z.literal("padding-box").describe("outer edge of the padding of the box"),
		z.literal("border-box").describe("outer edge of the border of the box"),

		// Layout box (includes margin)
		z
			.literal("margin-box")
			.describe("outer edge of the margin of the box"),

		// SVG-specific boxes
		z
			.literal("fill-box")
			.describe("object bounding box in SVG"),
		z.literal("stroke-box").describe("stroke bounding box in SVG"),
		z.literal("view-box").describe("nearest SVG viewport element's origin box"),
	])
	.describe(
		"Box edge keywords define reference boxes for positioning, clipping, and layout. " +
			"Used in properties like clip-path, shape-outside, background-clip, and background-origin.",
	);

/**
 * Array of all box edge keyword values.
 *
 * @example
 * ```typescript
 * import { BOX_EDGE_KEYWORDS } from "@/core/keywords/box-edge-keywords";
 *
 * console.log(BOX_EDGE_KEYWORDS);
 * // ["content-box", "padding-box", "border-box", "margin-box", "fill-box", "stroke-box", "view-box"]
 * ```
 *
 * @public
 */
export const BOX_EDGE_KEYWORDS = boxEdgeKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for box edge keywords.
 *
 * @public
 */
export type BoxEdgeKeyword = z.infer<typeof boxEdgeKeywordsSchema>;

/**
 * Metadata for box edge keyword options.
 *
 * Provides value and description for each box edge keyword,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { boxEdgeKeywordOptions } from "@/core/keywords/box-edge-keywords";
 *
 * boxEdgeKeywordOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const boxEdgeKeywordOptions = boxEdgeKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for box edge keyword options metadata.
 *
 * @public
 */
export type BoxEdgeKeywordOptions = typeof boxEdgeKeywordOptions;

/**
 * CSS background-clip keywords.
 *
 * Extends visual box keywords with the 'text' keyword which is specific to background-clip.
 * The 'text' keyword clips the background to the foreground text (WebKit prefixed in practice).
 *
 * Uses visual box keywords from geometry-box.ts for spec compliance.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip}
 *
 * @example
 * ```typescript
 * import { backgroundClipKeywordsSchema } from "@/core/keywords/box-edge-keywords";
 *
 * const keyword = backgroundClipKeywordsSchema.parse("text"); // "text"
 * ```
 *
 * @public
 */
export const backgroundClipKeywordsSchema = z
	.enum([...visualBoxKeywords, "text"] as const)
	.describe("Background-clip keywords: visual box keywords plus 'text' for clipping to foreground text.");

/**
 * Array of background-clip keyword values.
 *
 * @public
 */
export const BACKGROUND_CLIP_KEYWORDS = ["content-box", "padding-box", "border-box", "text"] as const;

/**
 * TypeScript type for background-clip keywords.
 *
 * @public
 */
export type BackgroundClipKeyword = z.infer<typeof backgroundClipKeywordsSchema>;
