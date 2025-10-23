// b_path:: src/core/types/gradient/radial-shape.test.ts

import { describe, expect, it } from "vitest";
import { type RadialGradientShape, radialGradientShapeSchema } from "./radial-shape";

describe("radialGradientShapeSchema", () => {
	it("validates circle", () => {
		const result = radialGradientShapeSchema.safeParse("circle");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("circle");
		}
	});

	it("validates ellipse", () => {
		const result = radialGradientShapeSchema.safeParse("ellipse");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("ellipse");
		}
	});

	it("rejects invalid value", () => {
		const result = radialGradientShapeSchema.safeParse("square");
		expect(result.success).toBe(false);
	});

	it("rejects non-string value", () => {
		const result = radialGradientShapeSchema.safeParse(123);
		expect(result.success).toBe(false);
	});
});

describe("RadialGradientShape type", () => {
	it("accepts circle", () => {
		const shape: RadialGradientShape = "circle";
		expect(shape).toBe("circle");
	});

	it("accepts ellipse", () => {
		const shape: RadialGradientShape = "ellipse";
		expect(shape).toBe("ellipse");
	});
});
