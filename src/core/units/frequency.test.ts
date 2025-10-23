import { describe, expect, it } from "vitest";
import { FREQUENCY_UNITS, frequencyUnitSchema } from "./frequency";

describe("frequency units", () => {
	it("exports frequency units array", () => {
		expect(FREQUENCY_UNITS).toEqual(["Hz", "kHz"]);
	});

	it("validates 'Hz' unit", () => {
		const result = frequencyUnitSchema.safeParse("Hz");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("Hz");
		}
	});

	it("validates 'kHz' unit", () => {
		const result = frequencyUnitSchema.safeParse("kHz");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("kHz");
		}
	});

	it("rejects invalid unit", () => {
		const result = frequencyUnitSchema.safeParse("MHz");
		expect(result.success).toBe(false);
	});

	it("rejects empty string", () => {
		const result = frequencyUnitSchema.safeParse("");
		expect(result.success).toBe(false);
	});

	it("is case-sensitive", () => {
		const result = frequencyUnitSchema.safeParse("hz");
		expect(result.success).toBe(false);
	});
});
