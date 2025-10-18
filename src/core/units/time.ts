// b_path:: src/core/units/time.ts
import { z } from "zod";

export const timeUnitSchema = z
	.union([
		z.literal("s").describe("seconds - canonical time unit"),
		z.literal("ms").describe("milliseconds - 1000 milliseconds in a second"),
	])
	.describe(
		"Time units specify duration or delay." + "Used in animations, transitions, and other time-based CSS properties.",
	);

export const TIME_UNITS = timeUnitSchema.options.map((option) => option.value);

export type TimeUnit = z.infer<typeof timeUnitSchema>;

export const timeUnitOptions = timeUnitSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));
export type TimeUnitOptions = typeof timeUnitOptions;
