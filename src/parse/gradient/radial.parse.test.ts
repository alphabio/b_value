// b_path:: src/parse/gradient/radial.parse.test.ts

import { describe, expect, it } from "vitest";
import * as RadialParser from "./radial";

describe("Radial Gradient Parser", () => {
	it("should parse simple radial gradient", () => {
		const css = "radial-gradient(red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("radial");
			expect(result.value.repeating).toBe(false);
			expect(result.value.colorStops).toHaveLength(2);
			expect(result.value.colorStops[0]?.color).toBe("red");
			expect(result.value.colorStops[1]?.color).toBe("blue");
		}
	});

	it("should parse radial gradient with shape", () => {
		const css = "radial-gradient(circle, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.shape).toBe("circle");
		}
	});

	it("should parse radial gradient with size keyword", () => {
		const css = "radial-gradient(circle closest-side, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "keyword",
				value: "closest-side",
			});
		}
	});

	it("should parse radial gradient with position", () => {
		const css = "radial-gradient(at center, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: "center",
				vertical: "center",
			});
		}
	});

	it("should parse radial gradient with color stops having positions", () => {
		const css = "radial-gradient(red 0%, blue 100%)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops[0]?.position).toEqual({
				value: 0,
				unit: "%",
			});
			expect(result.value.colorStops[1]?.position).toEqual({
				value: 100,
				unit: "%",
			});
		}
	});

	it("should parse repeating radial gradient", () => {
		const css = "repeating-radial-gradient(red, blue 20px)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.repeating).toBe(true);
		}
	});

	it("should parse complex radial gradient", () => {
		const css = "radial-gradient(ellipse farthest-corner at 30% 30%, red 0%, blue 100%)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.shape).toBe("ellipse");
			expect(result.value.size).toEqual({
				kind: "keyword",
				value: "farthest-corner",
			});
			expect(result.value.position).toEqual({
				horizontal: { value: 30, unit: "%" },
				vertical: { value: 30, unit: "%" },
			});
		}
	});

	it("should parse radial gradient with multiple color stops", () => {
		const css = "radial-gradient(red, yellow 30%, green 60%, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops).toHaveLength(4);
			expect(result.value.colorStops[1]?.color).toBe("yellow");
			expect(result.value.colorStops[1]?.position).toEqual({
				value: 30,
				unit: "%",
			});
		}
	});

	it("should return error for invalid gradient syntax", () => {
		const css = "not-a-gradient";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(false);
	});

	it("should return error for gradient with insufficient color stops", () => {
		const css = "radial-gradient(red)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("at least 2 color stops");
		}
	});
});
