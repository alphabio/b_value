// b_path:: src/core/types/box-model.ts
import { z } from "zod";
import { lengthPercentageAutoSchema, lengthPercentageSchema } from "./length-percentage";

/**
 * Side specification for multi-side operations.
 * Optional - when omitted, applies to all sides.
 *
 * @public
 */
export const boxSidesSchema = z.array(z.enum(["top", "right", "bottom", "left"])).optional();

/**
 * Unified margin specification.
 *
 * NOT a CSS spec type - this is a convenience type for
 * applying margins to one or more sides programmatically.
 *
 * @example
 * ```typescript
 * // All sides
 * { value: 10, unit: "px" }
 *
 * // Specific sides
 * { sides: ["top", "bottom"], value: 20, unit: "px" }
 * ```
 *
 * @public
 */
export const unifiedMarginSchema = z.object({
	sides: boxSidesSchema,
	value: lengthPercentageAutoSchema,
});

/**
 * Unified padding specification.
 *
 * NOT a CSS spec type - this is a convenience type for
 * applying padding to one or more sides programmatically.
 *
 * @example
 * ```typescript
 * // All sides
 * { value: 10, unit: "px" }
 *
 * // Specific sides
 * { sides: ["left", "right"], value: 15, unit: "px" }
 * ```
 *
 * @public
 */
export const unifiedPaddingSchema = z.object({
	sides: boxSidesSchema,
	value: lengthPercentageSchema,
});

export type BoxSides = z.infer<typeof boxSidesSchema>;
export type UnifiedMargin = z.infer<typeof unifiedMarginSchema>;
export type UnifiedPadding = z.infer<typeof unifiedPaddingSchema>;
