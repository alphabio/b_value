import { describe, expect, it } from "vitest";
import { ANGLE_UNITS, angleUnitSchema } from "./angle";

describe("angle units", () => {
	it("exports angle units array", () => {
		expect(ANGLE_UNITS).toEqual(["deg", "grad", "rad", "turn"]);
	});

	it("validates 'deg' unit", () => {
		const result = angleUnitSchema.safeParse("deg");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("deg");
		}
	});

	it("validates 'grad' unit", () => {
		const result = angleUnitSchema.safeParse("grad");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("grad");
		}
	});

	it("validates 'rad' unit", () => {
		const result = angleUnitSchema.safeParse("rad");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("rad");
		}
	});

	it("validates 'turn' unit", () => {
		const result = angleUnitSchema.safeParse("turn");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("turn");
		}
	});

	it("rejects invalid unit", () => {
		const result = angleUnitSchema.safeParse("degree");
		expect(result.success).toBe(false);
	});

	it("rejects empty string", () => {
		const result = angleUnitSchema.safeParse("");
		expect(result.success).toBe(false);
	});
});
