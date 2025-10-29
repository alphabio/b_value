// b_path:: src/core/keywords/position-property-keywords.ts
import { z } from "zod";

/**
 * CSS position property keyword values.
 *
 * The position property sets how an element is positioned in a document.
 * The top, right, bottom, and left properties determine the final location
 * of positioned elements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position}
 * @see {@link https://www.w3.org/TR/css-position-3/#position-property}
 *
 * @example
 * ```typescript
 * import { positionPropertyKeywordsSchema } from "@/core/keywords/position-property-keywords";
 *
 * const keyword = positionPropertyKeywordsSchema.parse("absolute");
 * ```
 *
 * @public
 */
export const positionPropertyKeywordsSchema = z.enum(["static", "relative", "absolute", "fixed", "sticky"], {
	error: () => ({
		message: "Expected static | relative | absolute | fixed | sticky",
	}),
});

/**
 * Array of all position property keyword values.
 *
 * @public
 */
export const POSITION_PROPERTY_KEYWORDS = positionPropertyKeywordsSchema.options;

/**
 * TypeScript type for position property keywords.
 *
 * @public
 */
export type PositionPropertyKeyword = z.infer<typeof positionPropertyKeywordsSchema>;

/**
 * Descriptions for position property keywords.
 *
 * @internal
 */
const POSITION_DESCRIPTIONS: Record<PositionPropertyKeyword, string> = {
	static: "positioned according to normal flow (default)",
	relative: "positioned relative to its normal position",
	absolute: "positioned relative to nearest positioned ancestor",
	fixed: "positioned relative to the viewport",
	sticky: "positioned based on scroll position (hybrid of relative and fixed)",
};

/**
 * Metadata for position property keyword options.
 *
 * @public
 */
export const positionPropertyKeywordOptions = POSITION_PROPERTY_KEYWORDS.map((value) => ({
	value,
	description: POSITION_DESCRIPTIONS[value],
}));

/**
 * Type for position property keyword options metadata.
 *
 * @public
 */
export type PositionPropertyKeywordOptions = typeof positionPropertyKeywordOptions;
