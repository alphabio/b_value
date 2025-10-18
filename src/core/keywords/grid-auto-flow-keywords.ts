// b_path:: src/core/keywords/grid-auto-flow-keywords.ts
import { z } from "zod";

/**
 * CSS `grid-auto-flow` property keyword values.
 *
 * The grid-auto-flow property controls how auto-placed items get inserted into the grid.
 * It determines whether to place items by filling rows or columns, and whether to use
 * dense packing to fill holes.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow}
 *
 * @example
 * ```typescript
 * import { gridAutoFlowKeywordsSchema } from "../keywords/grid-auto-flow-keywords";
 *
 * const keyword = gridAutoFlowKeywordsSchema.parse("row");
 * ```
 *
 * @public
 */
export const gridAutoFlowKeywordsSchema = z
	.union([
		z.literal("row").describe("auto-placed items fill rows"),
		z.literal("column").describe("auto-placed items fill columns"),
		z.literal("dense").describe("use dense packing algorithm to fill holes"),
		z.literal("row dense").describe("auto-placed items fill rows with dense packing"),
		z.literal("column dense").describe("auto-placed items fill columns with dense packing"),
	])
	.describe("CSS grid-auto-flow property keyword values");

/**
 * Array of all grid-auto-flow keyword values.
 *
 * @public
 */
export const GRID_AUTO_FLOW_KEYWORDS = gridAutoFlowKeywordsSchema.options.map((option) => option.value);

/**
 * TypeScript type for grid-auto-flow keywords.
 *
 * @public
 */
export type GridAutoFlowKeyword = z.infer<typeof gridAutoFlowKeywordsSchema>;

/**
 * Metadata for grid-auto-flow keyword options.
 *
 * @public
 */
export const gridAutoFlowKeywordOptions = gridAutoFlowKeywordsSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for grid-auto-flow keyword options metadata.
 *
 * @public
 */
export type GridAutoFlowKeywordOptions = typeof gridAutoFlowKeywordOptions;
