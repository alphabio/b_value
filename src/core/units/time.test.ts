import { describe, expect, it } from "vitest";
import { TIME_UNITS, timeUnitSchema } from "./time";

describe("time units", () => {
	it("exports time units array", () => {
		expect(TIME_UNITS).toEqual(["s", "ms"]);
	});

	it("validates 's' unit", () => {
		const result = timeUnitSchema.safeParse("s");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("s");
		}
	});

	it("validates 'ms' unit", () => {
		const result = timeUnitSchema.safeParse("ms");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("ms");
		}
	});

	it("rejects invalid unit", () => {
		const result = timeUnitSchema.safeParse("sec");
		expect(result.success).toBe(false);
	});

	it("rejects empty string", () => {
		const result = timeUnitSchema.safeParse("");
		expect(result.success).toBe(false);
	});
});
