// b_path:: src/core/types/angle.test.ts

import { describe, expect, it } from "vitest";
import { type Angle, angleSchema } from "./angle";

describe("angleSchema", () => {
	it("validates degrees", () => {
		const result = angleSchema.safeParse({ value: 45, unit: "deg" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe(45);
			expect(result.data.unit).toBe("deg");
		}
	});

	it("validates radians", () => {
		const result = angleSchema.safeParse({ value: 1.57, unit: "rad" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe(1.57);
			expect(result.data.unit).toBe("rad");
		}
	});

	it("validates gradians", () => {
		const result = angleSchema.safeParse({ value: 100, unit: "grad" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.unit).toBe("grad");
		}
	});

	it("validates turns", () => {
		const result = angleSchema.safeParse({ value: 0.5, unit: "turn" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.unit).toBe("turn");
		}
	});

	it("validates negative values", () => {
		const result = angleSchema.safeParse({ value: -45, unit: "deg" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe(-45);
		}
	});

	it("validates zero", () => {
		const result = angleSchema.safeParse({ value: 0, unit: "deg" });
		expect(result.success).toBe(true);
	});

	it("rejects missing value", () => {
		const result = angleSchema.safeParse({ unit: "deg" });
		expect(result.success).toBe(false);
	});

	it("rejects missing unit", () => {
		const result = angleSchema.safeParse({ value: 45 });
		expect(result.success).toBe(false);
	});

	it("rejects invalid unit", () => {
		const result = angleSchema.safeParse({ value: 45, unit: "px" });
		expect(result.success).toBe(false);
	});
});

describe("Angle type", () => {
	it("accepts valid angle in degrees", () => {
		const angle: Angle = { value: 90, unit: "deg" };
		expect(angle.value).toBe(90);
		expect(angle.unit).toBe("deg");
	});

	it("accepts valid angle in radians", () => {
		const angle: Angle = { value: 3.14, unit: "rad" };
		expect(angle.value).toBe(3.14);
		expect(angle.unit).toBe("rad");
	});
});
