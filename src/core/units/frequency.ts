// b_path:: src/core/units/frequency.ts
import { z } from "zod";

export const frequencyUnitSchema = z
	.union(
		[
			z.literal("Hz").describe("hertz - number of occurrences per second (canonical unit)"),
			z.literal("kHz").describe("kilohertz - 1000 hertz"),
		],
		{
			error: (issue) =>
				issue.code === "invalid_union" ? 'Invalid frequency unit. Expected "Hz" or "kHz".' : "Invalid input",
		},
	)
	.describe(
		"Frequency units specify the number of occurrences per second." +
			"Used for sound pitches and other frequency-based CSS properties.",
	);

export const FREQUENCY_UNITS = frequencyUnitSchema.options.map((option) => option.value);

export type FrequencyUnit = z.infer<typeof frequencyUnitSchema>;

export const frequencyUnitOptions = frequencyUnitSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));
export type FrequencyUnitOptions = typeof frequencyUnitOptions;
