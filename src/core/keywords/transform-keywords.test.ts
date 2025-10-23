// b_path:: src/core/keywords/transform-keywords.test.ts

import { describe, expect, it } from "vitest";
import { isTransformFunctionName, TRANSFORM_FUNCTION_NAMES, type TransformFunctionName } from "./transform-keywords";

describe("TRANSFORM_FUNCTION_NAMES", () => {
	it("contains translate functions", () => {
		expect(TRANSFORM_FUNCTION_NAMES).toContain("translate");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("translatex");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("translatey");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("translatez");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("translate3d");
	});

	it("contains rotate functions", () => {
		expect(TRANSFORM_FUNCTION_NAMES).toContain("rotate");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("rotatex");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("rotatey");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("rotatez");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("rotate3d");
	});

	it("contains scale functions", () => {
		expect(TRANSFORM_FUNCTION_NAMES).toContain("scale");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("scalex");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("scaley");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("scalez");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("scale3d");
	});

	it("contains skew functions", () => {
		expect(TRANSFORM_FUNCTION_NAMES).toContain("skew");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("skewx");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("skewy");
	});

	it("contains matrix and perspective", () => {
		expect(TRANSFORM_FUNCTION_NAMES).toContain("matrix");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("matrix3d");
		expect(TRANSFORM_FUNCTION_NAMES).toContain("perspective");
	});

	it("has correct total count", () => {
		expect(TRANSFORM_FUNCTION_NAMES).toHaveLength(21);
	});
});

describe("isTransformFunctionName", () => {
	it("validates translate", () => {
		expect(isTransformFunctionName("translate")).toBe(true);
	});

	it("validates translateX case-insensitive", () => {
		expect(isTransformFunctionName("translateX")).toBe(true);
		expect(isTransformFunctionName("TRANSLATEX")).toBe(true);
	});

	it("validates rotate", () => {
		expect(isTransformFunctionName("rotate")).toBe(true);
	});

	it("validates scale", () => {
		expect(isTransformFunctionName("scale")).toBe(true);
	});

	it("validates matrix3d", () => {
		expect(isTransformFunctionName("matrix3d")).toBe(true);
	});

	it("rejects invalid function name", () => {
		expect(isTransformFunctionName("invalid")).toBe(false);
	});

	it("rejects empty string", () => {
		expect(isTransformFunctionName("")).toBe(false);
	});
});

describe("TransformFunctionName type", () => {
	it("accepts valid function names", () => {
		const name: TransformFunctionName = "translate";
		expect(name).toBe("translate");
	});
});
