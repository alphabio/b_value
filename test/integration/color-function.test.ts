// b_path:: test/integration/color-function.test.ts
// Integration tests for color() function
import { describe, expect, test } from "vitest";
import { Generate, Parse } from "@/index";

describe("Integration: color() function", () => {
	test("display-p3 wide gamut colors", () => {
		const input = "color(display-p3 1 0.5 0)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const result = Generate.Color.generate(parsed.value);

			expect(result.ok).toBe(true);

			if (!result.ok) return;

			expect(result.value).toBe(input);
		}
	});

	test("srgb-linear for correct color math: full", () => {
		const input = "color(srgb-linear 0.5 0.5 0.5)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.kind).toBe("color");
			expect(parsed.value.colorSpace).toBe("srgb-linear");
			const result = Generate.Color.ColorFunction.generate(parsed.value);

			expect(result.ok).toBe(true);

			if (!result.ok) return;

			expect(result.value).toBe(input);
		}
	});

	test("srgb-linear for correct color math", () => {
		const input = "color(srgb-linear 0.5 0.5 0.5)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.colorSpace).toBe("srgb-linear");
			const result = Generate.Color.generate(parsed.value);

			expect(result.ok).toBe(true);

			if (!result.ok) return;

			expect(result.value).toBe(input);
		}
	});

	test("srgb-linear for correct color math", () => {
		const input = "color(srgb-linear 0.5 0.5 0.5)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.colorSpace).toBe("srgb-linear");
			const result = Generate.Color.generate(parsed.value);

			expect(result.ok).toBe(true);

			if (!result.ok) return;

			expect(result.value).toBe(input);
		}
	});

	test("rec2020 for HDR content", () => {
		const input = "color(rec2020 0.42053 0.979780 0.00579)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.colorSpace).toBe("rec2020");
		}
	});

	test("xyz color space for device-independent color", () => {
		const input = "color(xyz 0.472 0.372 0.131)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.colorSpace).toBe("xyz");
			expect(parsed.value.channels).toEqual([0.472, 0.372, 0.131]);
		}
	});

	test("prophoto-rgb for professional photography", () => {
		const input = "color(prophoto-rgb 0.28804 0.711946 0.257850)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.colorSpace).toBe("prophoto-rgb");
		}
	});

	test("transparent display-p3 color", () => {
		const input = "color(display-p3 1 0 0 / 0.5)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.alpha).toBe(0.5);
			const result = Generate.Color.generate(parsed.value);

			expect(result.ok).toBe(true);

			if (!result.ok) return;

			expect(result.value).toBe(input);
		}
	});

	test("fully transparent color", () => {
		const input = "color(srgb 1 0 0 / 0)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.alpha).toBe(0);
		}
	});

	test("high precision color values", () => {
		const input = "color(display-p3 0.928374 0.322847 0.203918)";
		const parsed = Parse.Color.ColorFunction.parse(input);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.value.channels?.[0]).toBeCloseTo(0.928374, 6);
			expect(parsed.value.channels?.[1]).toBeCloseTo(0.322847, 6);
			expect(parsed.value.channels?.[2]).toBeCloseTo(0.203918, 6);
		}
	});
});
