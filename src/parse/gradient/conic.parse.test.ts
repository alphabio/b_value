// b_path:: src/parse/gradient/conic.parse.test.ts

import { describe, expect, it } from "vitest";
import * as ConicParser from "./conic";

describe("Conic Gradient Parser", () => {
	it("should parse simple conic gradient", () => {
		const css = "conic-gradient(red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("conic");
			expect(result.value.repeating).toBe(false);
			expect(result.value.colorStops).toHaveLength(2);
			expect(result.value.colorStops[0]?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value.colorStops[1]?.color).toEqual({ kind: "named", name: "blue" });
		}
	});

	it("should parse conic gradient with starting angle", () => {
		const css = "conic-gradient(from 45deg, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.fromAngle).toEqual({
				value: 45,
				unit: "deg",
			});
		}
	});

	it("should parse conic gradient with position", () => {
		const css = "conic-gradient(at center, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: "center",
				vertical: "center",
			});
		}
	});

	it("should parse conic gradient with position keywords", () => {
		const css = "conic-gradient(at left top, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: "left",
				vertical: "top",
			});
		}
	});

	it("should parse conic gradient with percentage position", () => {
		const css = "conic-gradient(at 50% 75%, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: { value: 50, unit: "%" },
				vertical: { value: 75, unit: "%" },
			});
		}
	});

	it("should parse conic gradient with both angle and position", () => {
		const css = "conic-gradient(from 90deg at 50% 50%, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.fromAngle).toEqual({
				value: 90,
				unit: "deg",
			});
			expect(result.value.position).toEqual({
				horizontal: { value: 50, unit: "%" },
				vertical: { value: 50, unit: "%" },
			});
		}
	});

	it("should parse conic gradient with turn unit", () => {
		const css = "conic-gradient(from 0.25turn, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.fromAngle).toEqual({
				value: 0.25,
				unit: "turn",
			});
		}
	});

	it("should parse conic gradient with rad unit", () => {
		const css = "conic-gradient(from 1.57rad, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.fromAngle).toEqual({
				value: 1.57,
				unit: "rad",
			});
		}
	});

	it("should parse conic gradient with color stops having angle positions", () => {
		const css = "conic-gradient(red 0deg, blue 180deg)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops[0]?.position).toEqual({
				value: 0,
				unit: "deg",
			});
			expect(result.value.colorStops[1]?.position).toEqual({
				value: 180,
				unit: "deg",
			});
		}
	});

	it("should parse conic gradient with color interpolation", () => {
		const css = "conic-gradient(in oklch, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorSpace).toBe("oklch");
		}
	});

	it("should parse conic gradient with angle and color interpolation", () => {
		const css = "conic-gradient(from 45deg in oklch, red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.fromAngle).toEqual({
				value: 45,
				unit: "deg",
			});
			expect(result.value.colorSpace).toBe("oklch");
		}
	});

	it("should parse repeating conic gradient", () => {
		const css = "repeating-conic-gradient(red, blue 45deg)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.repeating).toBe(true);
		}
	});

	it("should parse complex conic gradient", () => {
		const css = "conic-gradient(from 90deg at 30% 30%, red 0deg, yellow 120deg, blue 240deg)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.fromAngle).toEqual({
				value: 90,
				unit: "deg",
			});
			expect(result.value.position).toEqual({
				horizontal: { value: 30, unit: "%" },
				vertical: { value: 30, unit: "%" },
			});
			expect(result.value.colorStops).toHaveLength(3);
			expect(result.value.colorStops[1]?.color).toEqual({ kind: "named", name: "yellow" });
		}
	});

	it("should handle conic gradient with multiple color stops", () => {
		const css = "conic-gradient(red, orange, yellow, green, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops).toHaveLength(5);
		}
	});

	it("should parse conic gradient with percentage color stop positions", () => {
		const css = "conic-gradient(red 0%, blue 100%)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops[0]?.position).toEqual({
				value: 0,
				unit: "%",
			});
		}
	});

	it("should return error for invalid function name", () => {
		const css = "linear-gradient(red, blue)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("No conic-gradient function found");
		}
	});

	it("should return error for insufficient color stops", () => {
		const css = "conic-gradient(red)";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("at least 2 color stops");
		}
	});

	it("should return error for invalid CSS syntax", () => {
		const css = "not valid css";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(false);
	});

	it("should return error for empty function", () => {
		const css = "conic-gradient()";
		const result = ConicParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("at least 2 color stops");
		}
	});
});
