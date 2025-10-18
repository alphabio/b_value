// b_path:: src/core/units/angle.ts
import { z } from "zod";

export const angleUnitSchema = z
	.union([
		z.literal("deg").describe("degrees - one full circle is 360deg"),
		z.literal("grad").describe("gradians - one full circle is 400grad"),
		z.literal("rad").describe("radians - one full circle is 2π radians (≈6.2832rad)"),
		z.literal("turn").describe("turns - one full circle is 1turn"),
	])
	.describe(
		"Angle units specify rotation or direction." +
			"Used in transforms, gradients, and other CSS properties requiring angular measurements.",
	);

export const ANGLE_UNITS = angleUnitSchema.options.map((option) => option.value);

export type AngleUnit = z.infer<typeof angleUnitSchema>;

export const angleUnitOptions = angleUnitSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));
export type AngleUnitOptions = typeof angleUnitOptions;
