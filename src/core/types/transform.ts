// b_path:: src/core/types/transform.ts
import { z } from "zod";
import { angleSchema } from "./angle";
import { lengthPercentageSchema, lengthSchema } from "./length-percentage";

/**
 * CSS transform function types.
 *
 * Transform functions modify the coordinate space of an element's content.
 * Used in the transform property to apply geometric transformations.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform}
 *
 * @example
 * ```typescript
 * import { transformFunctionSchema } from "@/core/types/transform";
 *
 * // Translate
 * const translate: TransformFunction = {
 *   kind: "translate",
 *   x: { value: 100, unit: "px" },
 *   y: { value: 50, unit: "px" }
 * };
 *
 * // Rotate
 * const rotate: TransformFunction = {
 *   kind: "rotate",
 *   angle: { value: 45, unit: "deg" }
 * };
 *
 * // Scale
 * const scale: TransformFunction = {
 *   kind: "scale",
 *   x: 1.5,
 *   y: 2
 * };
 * ```
 *
 * @public
 */

// Note: numberOrPercentageSchema defined for future use in transform values
// const numberOrPercentageSchema = z.union([
//   z.number().describe("numeric value"),
//   percentageSchema.describe("percentage value")
// ]);

/**
 * Translate transform function.
 *
 * Moves an element along the x and/or y-axis.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
 */
export const translateFunctionSchema = z.object({
	kind: z.literal("translate").describe("translate function"),
	x: lengthPercentageSchema.describe("x-axis translation"),
	y: lengthPercentageSchema.optional().describe("y-axis translation"),
});

export type TranslateFunction = z.infer<typeof translateFunctionSchema>;

/**
 * TranslateX transform function.
 *
 * Moves an element along the x-axis only.
 */
export const translateXFunctionSchema = z.object({
	kind: z.literal("translateX").describe("translateX function"),
	x: lengthPercentageSchema.describe("x-axis translation"),
});

export type TranslateXFunction = z.infer<typeof translateXFunctionSchema>;

/**
 * TranslateY transform function.
 *
 * Moves an element along the y-axis only.
 */
export const translateYFunctionSchema = z.object({
	kind: z.literal("translateY").describe("translateY function"),
	y: lengthPercentageSchema.describe("y-axis translation"),
});

export type TranslateYFunction = z.infer<typeof translateYFunctionSchema>;

/**
 * TranslateZ transform function.
 *
 * Moves an element along the z-axis in 3D space.
 */
export const translateZFunctionSchema = z.object({
	kind: z.literal("translateZ").describe("translateZ function"),
	z: lengthSchema.describe("z-axis translation"),
});

export type TranslateZFunction = z.infer<typeof translateZFunctionSchema>;

/**
 * Translate3d transform function.
 *
 * Moves an element in 3D space along x, y, and z axes.
 */
export const translate3dFunctionSchema = z.object({
	kind: z.literal("translate3d").describe("translate3d function"),
	x: lengthPercentageSchema.describe("x-axis translation"),
	y: lengthPercentageSchema.describe("y-axis translation"),
	z: lengthSchema.describe("z-axis translation"),
});

export type Translate3dFunction = z.infer<typeof translate3dFunctionSchema>;

/**
 * Rotate transform function.
 *
 * Rotates an element around a fixed point.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
 */
export const rotateFunctionSchema = z.object({
	kind: z.literal("rotate").describe("rotate function"),
	angle: angleSchema.describe("rotation angle"),
});

export type RotateFunction = z.infer<typeof rotateFunctionSchema>;

/**
 * RotateX transform function.
 *
 * Rotates an element around the x-axis in 3D space.
 */
export const rotateXFunctionSchema = z.object({
	kind: z.literal("rotateX").describe("rotateX function"),
	angle: angleSchema.describe("rotation angle around x-axis"),
});

export type RotateXFunction = z.infer<typeof rotateXFunctionSchema>;

/**
 * RotateY transform function.
 *
 * Rotates an element around the y-axis in 3D space.
 */
export const rotateYFunctionSchema = z.object({
	kind: z.literal("rotateY").describe("rotateY function"),
	angle: angleSchema.describe("rotation angle around y-axis"),
});

export type RotateYFunction = z.infer<typeof rotateYFunctionSchema>;

/**
 * RotateZ transform function.
 *
 * Rotates an element around the z-axis in 3D space.
 */
export const rotateZFunctionSchema = z.object({
	kind: z.literal("rotateZ").describe("rotateZ function"),
	angle: angleSchema.describe("rotation angle around z-axis"),
});

export type RotateZFunction = z.infer<typeof rotateZFunctionSchema>;

/**
 * Rotate3d transform function.
 *
 * Rotates an element in 3D space around a custom axis.
 */
export const rotate3dFunctionSchema = z.object({
	kind: z.literal("rotate3d").describe("rotate3d function"),
	x: z.number().describe("x component of rotation axis vector"),
	y: z.number().describe("y component of rotation axis vector"),
	z: z.number().describe("z component of rotation axis vector"),
	angle: angleSchema.describe("rotation angle"),
});

export type Rotate3dFunction = z.infer<typeof rotate3dFunctionSchema>;

/**
 * Scale transform function.
 *
 * Scales an element up or down in size.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
 */
export const scaleFunctionSchema = z.object({
	kind: z.literal("scale").describe("scale function"),
	x: z.number().min(0).describe("x-axis scale factor"),
	y: z.number().min(0).optional().describe("y-axis scale factor"),
});

export type ScaleFunction = z.infer<typeof scaleFunctionSchema>;

/**
 * ScaleX transform function.
 *
 * Scales an element along the x-axis only.
 */
export const scaleXFunctionSchema = z.object({
	kind: z.literal("scaleX").describe("scaleX function"),
	x: z.number().min(0).describe("x-axis scale factor"),
});

export type ScaleXFunction = z.infer<typeof scaleXFunctionSchema>;

/**
 * ScaleY transform function.
 *
 * Scales an element along the y-axis only.
 */
export const scaleYFunctionSchema = z.object({
	kind: z.literal("scaleY").describe("scaleY function"),
	y: z.number().min(0).describe("y-axis scale factor"),
});

export type ScaleYFunction = z.infer<typeof scaleYFunctionSchema>;

/**
 * ScaleZ transform function.
 *
 * Scales an element along the z-axis in 3D space.
 */
export const scaleZFunctionSchema = z.object({
	kind: z.literal("scaleZ").describe("scaleZ function"),
	z: z.number().min(0).describe("z-axis scale factor"),
});

export type ScaleZFunction = z.infer<typeof scaleZFunctionSchema>;

/**
 * Scale3d transform function.
 *
 * Scales an element in 3D space along x, y, and z axes.
 */
export const scale3dFunctionSchema = z.object({
	kind: z.literal("scale3d").describe("scale3d function"),
	x: z.number().min(0).describe("x-axis scale factor"),
	y: z.number().min(0).describe("y-axis scale factor"),
	z: z.number().min(0).describe("z-axis scale factor"),
});

export type Scale3dFunction = z.infer<typeof scale3dFunctionSchema>;

/**
 * Skew transform function.
 *
 * Skews an element along the x and/or y-axis.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
 */
export const skewFunctionSchema = z.object({
	kind: z.literal("skew").describe("skew function"),
	x: angleSchema.describe("x-axis skew angle"),
	y: angleSchema.optional().describe("y-axis skew angle"),
});

export type SkewFunction = z.infer<typeof skewFunctionSchema>;

/**
 * SkewX transform function.
 *
 * Skews an element along the x-axis only.
 */
export const skewXFunctionSchema = z.object({
	kind: z.literal("skewX").describe("skewX function"),
	x: angleSchema.describe("x-axis skew angle"),
});

export type SkewXFunction = z.infer<typeof skewXFunctionSchema>;

/**
 * SkewY transform function.
 *
 * Skews an element along the y-axis only.
 */
export const skewYFunctionSchema = z.object({
	kind: z.literal("skewY").describe("skewY function"),
	y: angleSchema.describe("y-axis skew angle"),
});

export type SkewYFunction = z.infer<typeof skewYFunctionSchema>;

/**
 * Matrix transform function.
 *
 * Applies a 2D transformation matrix to an element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
 */
export const matrixFunctionSchema = z.object({
	kind: z.literal("matrix").describe("matrix function"),
	a: z.number().describe("matrix value a"),
	b: z.number().describe("matrix value b"),
	c: z.number().describe("matrix value c"),
	d: z.number().describe("matrix value d"),
	e: lengthSchema.describe("matrix value e"),
	f: lengthSchema.describe("matrix value f"),
});

export type MatrixFunction = z.infer<typeof matrixFunctionSchema>;

/**
 * Matrix3d transform function.
 *
 * Applies a 3D transformation matrix to an element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d}
 */
export const matrix3dFunctionSchema = z.object({
	kind: z.literal("matrix3d").describe("matrix3d function"),
	values: z.array(z.number()).length(16).describe("16 matrix values in column-major order"),
});

export type Matrix3dFunction = z.infer<typeof matrix3dFunctionSchema>;

/**
 * Perspective transform function.
 *
 * Gives an element a 3D appearance by defining a perspective point.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective}
 */
export const perspectiveFunctionSchema = z.object({
	kind: z.literal("perspective").describe("perspective function"),
	depth: lengthSchema.describe("perspective depth"),
});

export type PerspectiveFunction = z.infer<typeof perspectiveFunctionSchema>;

/**
 * Union of all transform function types.
 */
export const transformFunctionSchema = z.discriminatedUnion("kind", [
	translateFunctionSchema,
	translateXFunctionSchema,
	translateYFunctionSchema,
	translateZFunctionSchema,
	translate3dFunctionSchema,
	rotateFunctionSchema,
	rotateXFunctionSchema,
	rotateYFunctionSchema,
	rotateZFunctionSchema,
	rotate3dFunctionSchema,
	scaleFunctionSchema,
	scaleXFunctionSchema,
	scaleYFunctionSchema,
	scaleZFunctionSchema,
	scale3dFunctionSchema,
	skewFunctionSchema,
	skewXFunctionSchema,
	skewYFunctionSchema,
	matrixFunctionSchema,
	matrix3dFunctionSchema,
	perspectiveFunctionSchema,
]);

/**
 * TypeScript type for all transform functions.
 * @public
 */
export type TransformFunction = z.infer<typeof transformFunctionSchema>;

/**
 * CSS transform value (list of transform functions).
 *
 * A space-separated list of transform functions that can be applied to an element.
 * Used in the transform CSS property.
 *
 * @example
 * ```typescript
 * import { transformSchema } from "@/core/types/transform";
 *
 * const transform: Transform = [
 *   { kind: "translateX", x: { value: 100, unit: "px" } },
 *   { kind: "rotate", angle: { value: 45, unit: "deg" } },
 *   { kind: "scale", x: 1.5, y: 1.5 }
 * ];
 * ```
 *
 * @public
 */
export const transformSchema = z
	.array(transformFunctionSchema)
	.min(1, "Transform must contain at least one function")
	.describe("array of transform functions for CSS transform property");

export type Transform = z.infer<typeof transformSchema>;
