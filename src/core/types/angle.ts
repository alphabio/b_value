// b_path:: src/core/types/angle.ts
import { z } from "zod";
import * as Unit from "../units";

/**
 * CSS `<angle>` dimension.
 *
 * An angle is a rotation measurement consisting of a number and an angle unit.
 * Used in transforms, gradients, and other CSS properties requiring angular measurements.
 *
 * Per CSS Values & Units Module Level 4 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/angle}
 * @see {@link https://www.w3.org/TR/css-values-4/#angles}
 *
 * @example
 * ```typescript
 * import { angleSchema } from "@/core/types/angle";
 *
 * const rotation: Angle = { value: 45, unit: "deg" };
 * const fullCircle: Angle = { value: 360, unit: "deg" };
 * const radians: Angle = { value: 1.57, unit: "rad" };
 * ```
 *
 * @public
 */
export const angleSchema = z.object({
	value: z.number(),
	unit: Unit.angleUnitSchema,
});

/**
 * TypeScript type for `<angle>` dimension.
 *
 * @public
 */
export type Angle = z.infer<typeof angleSchema>;
