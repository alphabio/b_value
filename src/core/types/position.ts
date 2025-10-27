// b_path:: src/core/types/position.ts
import { z } from "zod";
import * as Keyword from "../keywords";
import { lengthPercentageSchema, lengthSchema } from "./length-percentage";

/**
 * CSS position value (single axis).
 *
 * A position value that can be used on a single axis (horizontal or vertical).
 * Used as a building block for 2D position values.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position_value}
 *
 * @example
 * ```typescript
 * import { positionValueSchema } from "@/core/types/position";
 *
 * // Keyword
 * const pos1: PositionValue = "center";
 *
 * // Length
 * const pos2: PositionValue = { value: 100, unit: "px" };
 *
 * // Percentage
 * const pos3: PositionValue = { value: 50, unit: "%" };
 * ```
 *
 * @public
 */
export const positionValueSchema = z.union([Keyword.positionKeywordsSchema, lengthPercentageSchema], {
	error: (issue) =>
		issue.code === "invalid_union"
			? { message: "Expected left | center | right | top | bottom | <length-percentage>" }
			: { message: "Invalid position value" },
});

/**
 * TypeScript type for position value.
 * @public
 */
export type PositionValue = z.infer<typeof positionValueSchema>;

/**
 * CSS 2D position value.
 *
 * A position value that specifies both horizontal and vertical positions.
 * Used in properties like transform-origin, perspective-origin, object-position.
 *
 * Per CSS spec: <position> = [ [ left | center | right | top | bottom | <length-percentage> ] |
 *                            [ left | center | right ] && [ top | center | bottom ] |
 *                            [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ] |
 *                            [ [ center | [ left | right ] <length-percentage>? ] &&
 *                              [ center | [ top | bottom ] <length-percentage>? ] ] ]
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position_value}
 *
 * @example
 * ```typescript
 * import { position2DSchema } from "@/core/types/position";
 *
 * // Keywords
 * const pos1: Position2D = { horizontal: "center", vertical: "center" };
 * const pos2: Position2D = { horizontal: "left", vertical: "top" };
 *
 * // Mixed keywords and values
 * const pos3: Position2D = {
 *   horizontal: { value: 25, unit: "%" },
 *   vertical: "center"
 * };
 *
 * // Both values
 * const pos4: Position2D = {
 *   horizontal: { value: 100, unit: "px" },
 *   vertical: { value: 50, unit: "%" }
 * };
 * ```
 *
 * @public
 */
export const position2DSchema = z.object({
	horizontal: positionValueSchema.describe("horizontal position"),
	vertical: positionValueSchema.describe("vertical position"),
});

/**
 * TypeScript type for 2D position.
 * @public
 */
export type Position2D = z.infer<typeof position2DSchema>;

/**
 * CSS 3D position value.
 *
 * A position value that specifies position in 3D space with x, y, and z coordinates.
 * Used in properties like transform-origin in 3D contexts.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin}
 *
 * @example
 * ```typescript
 * import { position3DSchema } from "@/core/types/position";
 *
 * const pos: Position3D = {
 *   x: { value: 100, unit: "px" },
 *   y: { value: 50, unit: "%" },
 *   z: { value: 10, unit: "px" }
 * };
 * ```
 *
 * @public
 */
export const position3DSchema = z.object({
	x: positionValueSchema.describe("x-axis position"),
	y: positionValueSchema.describe("y-axis position"),
	z: lengthSchema.describe("z-axis position (depth)"),
});

/**
 * TypeScript type for 3D position.
 * @public
 */
export type Position3D = z.infer<typeof position3DSchema>;

/**
 * CSS position list.
 *
 * An array of position values used in properties that accept multiple positions.
 * Common in animation keyframes and multi-position properties.
 *
 * @example
 * ```typescript
 * import { positionListSchema } from "@/core/types/position";
 *
 * const positions: PositionList = [
 *   { horizontal: "left", vertical: "top" },
 *   { horizontal: { value: 50, unit: "%" }, vertical: { value: 50, unit: "%" } },
 *   { horizontal: "right", vertical: "bottom" }
 * ];
 * ```
 *
 * @public
 */
export const positionListSchema = z
	.array(position2DSchema)
	.min(1, "Position list must contain at least 1 position")
	.describe("array of 2D positions for multi-position CSS properties");

/**
 * TypeScript type for position list.
 * @public
 */
export type PositionList = z.infer<typeof positionListSchema>;

/**
 * Common position presets.
 *
 * Predefined positions for common use cases in CSS layout and positioning.
 *
 * @example
 * ```typescript
 * import { COMMON_POSITIONS } from "@/core/types/position";
 *
 * const centerPos = COMMON_POSITIONS.center; // { horizontal: "center", vertical: "center" }
 * const topLeftPos = COMMON_POSITIONS.topLeft; // { horizontal: "left", vertical: "top" }
 * ```
 *
 * @public
 */
export const COMMON_POSITIONS = {
	center: { horizontal: "center" as const, vertical: "center" as const },
	topLeft: { horizontal: "left" as const, vertical: "top" as const },
	topCenter: { horizontal: "center" as const, vertical: "top" as const },
	topRight: { horizontal: "right" as const, vertical: "top" as const },
	middleLeft: { horizontal: "left" as const, vertical: "center" as const },
	middleRight: { horizontal: "right" as const, vertical: "center" as const },
	bottomLeft: { horizontal: "left" as const, vertical: "bottom" as const },
	bottomCenter: { horizontal: "center" as const, vertical: "bottom" as const },
	bottomRight: { horizontal: "right" as const, vertical: "bottom" as const },
} as const;

/**
 * Type for common position presets.
 * @public
 */
export type CommonPositions = typeof COMMON_POSITIONS;
