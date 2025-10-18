// b_path:: src/core/types/gradient/radial-shape.ts
import { z } from "zod";

/**
 * CSS radial gradient shape value.
 *
 * Specifies the shape of a radial gradient. Can be either a circle or an ellipse.
 * If omitted in CSS, the shape is inferred from the size specification.
 *
 * Per CSS Images Module Level 3 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient}
 * @see {@link https://www.w3.org/TR/css-images-3/#radial-gradients}
 *
 * @example
 * ```typescript
 * import { radialGradientShapeSchema } from "@/core/types/gradient/radial-shape";
 *
 * const shape1: RadialGradientShape = "circle";
 * const shape2: RadialGradientShape = "ellipse";
 * ```
 *
 * @public
 */
export const radialGradientShapeSchema = z.union([z.literal("circle"), z.literal("ellipse")]);

/**
 * TypeScript type for radial gradient shape.
 *
 * @public
 */
export type RadialGradientShape = z.infer<typeof radialGradientShapeSchema>;
