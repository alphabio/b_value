// b_path:: src/core/types/position-layer.ts
import { z } from "zod";
import * as Keyword from "../keywords";
import * as Type from "../types";

/**
 * CSS position value for background positioning.
 *
 * Can be a keyword, length, or percentage.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-position}
 * @public
 */
export const backgroundPositionValueSchema = z.union([Keyword.positionKeywordsSchema, Type.lengthPercentageSchema], {
	error: (issue) =>
		issue.code === "invalid_union"
			? "Invalid background position value. Expected a position keyword (left, right, top, bottom, center) or length-percentage."
			: "Invalid input",
});

/**
 * TypeScript type for background position value.
 * @public
 */
export type BackgroundPositionValue = z.infer<typeof backgroundPositionValueSchema>;

/**
 * CSS background-position layer value.
 *
 * Represents a single layer value for the background-position property.
 * Supports 1-value, 2-value, and 4-value syntax.
 *
 * Per CSS spec, background-position accepts:
 * - Single keyword: `center` | `left` | `right` | `top` | `bottom`
 * - One value: `<length-percentage>` | keyword
 * - Two values: `<length-percentage> <length-percentage>` | keyword combinations
 * - Four values: `<edge> <length-percentage> <edge> <length-percentage>` (edge offsets)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-position}
 *
 * @example
 * ```typescript
 * import { positionLayerSchema } from "@/core/types/position-layer";
 *
 * // Center keyword
 * const layer1: PositionLayer = { kind: "center" };
 *
 * // One value
 * const layer2: PositionLayer = {
 *   kind: "one-value",
 *   value: { value: 50, unit: "%" }
 * };
 *
 * // Two values
 * const layer3: PositionLayer = {
 *   kind: "two-value",
 *   horizontal: "left",
 *   vertical: { value: 20, unit: "px" }
 * };
 *
 * // Four values (edge offsets)
 * const layer4: PositionLayer = {
 *   kind: "four-value",
 *   horizontalEdge: "right",
 *   horizontalOffset: { value: 10, unit: "px" },
 *   verticalEdge: "bottom",
 *   verticalOffset: { value: 20, unit: "px" }
 * };
 * ```
 *
 * @public
 */
export const positionLayerSchema = z.discriminatedUnion("kind", [
	// Center keyword (special case)
	z.object({
		kind: z.literal("center"),
	}),

	// One value: applies to horizontal, vertical is centered (50%)
	z.object({
		kind: z.literal("one-value"),
		value: backgroundPositionValueSchema,
	}),

	// Two values: horizontal vertical
	z.object({
		kind: z.literal("two-value"),
		horizontal: backgroundPositionValueSchema,
		vertical: backgroundPositionValueSchema,
	}),

	// Four values: edge offset pairs
	// Format: <horizontal-edge> <h-offset> <vertical-edge> <v-offset>
	// Example: right 10px bottom 20px
	z.object({
		kind: z.literal("four-value"),
		horizontalEdge: z.literal("left").or(z.literal("right")),
		horizontalOffset: Type.lengthPercentageSchema,
		verticalEdge: z.literal("top").or(z.literal("bottom")),
		verticalOffset: Type.lengthPercentageSchema,
	}),
]);

/**
 * TypeScript type for position layer.
 * @public
 */
export type PositionLayer = z.infer<typeof positionLayerSchema>;

/**
 * CSS position property (reusable across properties).
 *
 * Specifies the position of elements. Used in:
 * - `background-position` - Background image positioning
 * - `object-position` - Replaced element positioning
 * - `transform-origin` - Transform origin positioning
 * - `perspective-origin` - Perspective origin positioning
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position_value}
 *
 * @example
 * ```typescript
 * import { positionSchema, type Position } from "@/core/types/position-layer";
 *
 * // Single layer
 * const pos1: Position = {
 *   layers: [{ kind: "center" }]
 * };
 *
 * // Multiple layers with different syntaxes
 * const pos2: Position = {
 *   layers: [
 *     { kind: "center" },
 *     { kind: "two-value", horizontal: { value: 50, unit: "%" }, vertical: { value: 50, unit: "%" } },
 *     {
 *       kind: "four-value",
 *       horizontalEdge: "right",
 *       horizontalOffset: { value: 10, unit: "px" },
 *       verticalEdge: "bottom",
 *       verticalOffset: { value: 20, unit: "px" }
 *     }
 *   ]
 * };
 * ```
 *
 * @public
 */
export const positionSchema = z.object({
	layers: z.array(positionLayerSchema).min(1),
});

/**
 * TypeScript type for position property.
 * @public
 */
export type Position = z.infer<typeof positionSchema>;
