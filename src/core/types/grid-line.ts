// b_path:: src/core/types/grid-line.ts
import { z } from "zod";

/**
 * CSS Grid line value (simple version for Phase 1).
 *
 * Grid line values specify where grid items start and end.
 * This implementation supports:
 * - Integer values (positive, negative, or zero)
 * - The `auto` keyword (browser places item automatically)
 * - Span notation (e.g., `span 2` means span 2 grid tracks)
 *
 * Phase 2 will add support for named grid lines.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Line-based_Placement_with_CSS_Grid}
 *
 * @example
 * ```typescript
 * import { gridLineSchema } from "@/core/types/grid-line";
 *
 * // Integer line number
 * const line1: GridLine = 1;
 * const line2: GridLine = -1; // Last line
 *
 * // Auto keyword
 * const line3: GridLine = "auto";
 *
 * // Span notation
 * const line4: GridLine = { type: "span", value: 2 };
 * ```
 *
 * @public
 */
export const gridLineSchema = z.union([
	z.number().int().describe("integer grid line number (positive, negative, or zero)"),
	z.literal("auto").describe("browser automatically places the item"),
	z
		.object({
			type: z.literal("span"),
			value: z.number().int().positive().describe("number of tracks to span"),
		})
		.describe("span notation (e.g., span 2 means span across 2 tracks)"),
]);

/**
 * TypeScript type for grid line values.
 *
 * @public
 */
export type GridLine = z.infer<typeof gridLineSchema>;

/**
 * Metadata for grid line values.
 *
 * Provides documentation for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { gridLineMetadata } from "@/core/types/grid-line";
 *
 * console.log(gridLineMetadata.description);
 * ```
 *
 * @public
 */
export const gridLineMetadata = {
	description: "Specifies grid line position (integer, auto, or span)",
	syntax: ["<integer>", "auto", "span <integer>"],
	examples: ["1", "-1", "auto", "span 2"],
} as const;

/**
 * Type for grid line metadata.
 *
 * @public
 */
export type GridLineMetadata = typeof gridLineMetadata;
