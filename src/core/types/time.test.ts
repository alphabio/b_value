// b_path:: src/core/types/time.test.ts

import { describe, expect, it } from "vitest";
import { type Time, timeSchema } from "./time";

describe("timeSchema", () => {
	it("validates seconds", () => {
		const result = timeSchema.safeParse({ value: 1, unit: "s" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe(1);
			expect(result.data.unit).toBe("s");
		}
	});

	it("validates milliseconds", () => {
		const result = timeSchema.safeParse({ value: 500, unit: "ms" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe(500);
			expect(result.data.unit).toBe("ms");
		}
	});

	it("validates decimal values", () => {
		const result = timeSchema.safeParse({ value: 0.5, unit: "s" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe(0.5);
		}
	});

	it("validates zero", () => {
		const result = timeSchema.safeParse({ value: 0, unit: "s" });
		expect(result.success).toBe(true);
	});

	it("rejects missing value", () => {
		const result = timeSchema.safeParse({ unit: "s" });
		expect(result.success).toBe(false);
	});

	it("rejects missing unit", () => {
		const result = timeSchema.safeParse({ value: 1 });
		expect(result.success).toBe(false);
	});

	it("rejects invalid unit", () => {
		const result = timeSchema.safeParse({ value: 1, unit: "px" });
		expect(result.success).toBe(false);
	});
});

describe("Time type", () => {
	it("accepts valid time in seconds", () => {
		const time: Time = { value: 2, unit: "s" };
		expect(time.value).toBe(2);
		expect(time.unit).toBe("s");
	});

	it("accepts valid time in milliseconds", () => {
		const time: Time = { value: 1000, unit: "ms" };
		expect(time.value).toBe(1000);
		expect(time.unit).toBe("ms");
	});
});
