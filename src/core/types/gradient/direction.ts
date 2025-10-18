// b_path:: src/core/types/gradient/direction.ts
import { z } from "zod";
import * as Type from "../../types";

/**
 * CSS gradient direction value.
 *
 * Specifies the direction of a linear gradient. Can be an angle,
 * a side keyword (to top, to right, etc.), or a corner keyword
 * (to top left, to bottom right, etc.).
 *
 * Per CSS Images Module Level 3 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient}
 * @see {@link https://www.w3.org/TR/css-images-3/#linear-gradients}
 *
 * @example
 * ```typescript
 * import { gradientDirectionSchema } from "@/core/types/gradient/direction";
 *
 * // Angle direction
 * const dir1: GradientDirection = {
 *   kind: "angle",
 *   value: { value: 45, unit: "deg" }
 * };
 *
 * // Side direction
 * const dir2: GradientDirection = {
 *   kind: "to-side",
 *   value: "right"
 * };
 *
 * // Corner direction
 * const dir3: GradientDirection = {
 *   kind: "to-corner",
 *   value: "top right"
 * };
 * ```
 *
 * @public
 */
export const gradientDirectionSchema = z.union([
	z.object({
		kind: z.literal("angle"),
		value: Type.angleSchema,
	}),
	z.object({
		kind: z.literal("to-side"),
		value: z.union([z.literal("top"), z.literal("right"), z.literal("bottom"), z.literal("left")]),
	}),
	z.object({
		kind: z.literal("to-corner"),
		value: z.union([
			z.literal("top left"),
			z.literal("top right"),
			z.literal("bottom left"),
			z.literal("bottom right"),
		]),
	}),
]);

/**
 * TypeScript type for gradient direction.
 *
 * @public
 */
export type GradientDirection = z.infer<typeof gradientDirectionSchema>;
