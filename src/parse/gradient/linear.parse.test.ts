// b_path:: src/parse/gradient/linear.parse.test.ts

import { describe, expect, it } from "vitest";
import * as LinearParser from "./linear";

describe("Linear Gradient Parser", () => {
	it("should parse simple linear gradient", () => {
		const css = "linear-gradient(red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("linear");
			expect(result.value.repeating).toBe(false);
			expect(result.value.colorStops).toHaveLength(2);
			expect(result.value.colorStops[0]?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value.colorStops[1]?.color).toEqual({ kind: "named", name: "blue" });
		}
	});

	it("should parse linear gradient with angle direction", () => {
		const css = "linear-gradient(45deg, red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.direction).toEqual({
				kind: "angle",
				value: { value: 45, unit: "deg" },
			});
		}
	});

	it("should parse linear gradient with to-side direction", () => {
		const css = "linear-gradient(to right, red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.direction).toEqual({
				kind: "to-side",
				value: "right",
			});
		}
	});

	it("should parse linear gradient with to-corner direction", () => {
		const css = "linear-gradient(to top right, red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.direction).toEqual({
				kind: "to-corner",
				value: "top right",
			});
		}
	});

	it("should parse linear gradient with turn unit", () => {
		const css = "linear-gradient(0.25turn, red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.direction).toEqual({
				kind: "angle",
				value: { value: 0.25, unit: "turn" },
			});
		}
	});

	it("should parse linear gradient with rad unit", () => {
		const css = "linear-gradient(1.57rad, red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.direction).toEqual({
				kind: "angle",
				value: { value: 1.57, unit: "rad" },
			});
		}
	});

	it("should parse linear gradient with color stops having positions", () => {
		const css = "linear-gradient(red 0%, blue 100%)";
		const result = LinearParser.parse(css);

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

	it("should parse linear gradient with color interpolation", () => {
		const css = "linear-gradient(in oklch, red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorSpace).toBe("oklch");
		}
	});

	it("should parse linear gradient with direction and color interpolation", () => {
		const css = "linear-gradient(45deg in oklch, red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.direction).toEqual({
				kind: "angle",
				value: { value: 45, unit: "deg" },
			});
			expect(result.value.colorSpace).toBe("oklch");
		}
	});

	it("should parse repeating linear gradient", () => {
		const css = "repeating-linear-gradient(45deg, red, blue 20px)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.repeating).toBe(true);
		}
	});

	it("should parse complex linear gradient", () => {
		const css = "linear-gradient(to bottom right, red 0%, yellow 50%, blue 100%)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.direction).toEqual({
				kind: "to-corner",
				value: "bottom right",
			});
			expect(result.value.colorStops).toHaveLength(3);
			expect(result.value.colorStops[1]?.color).toEqual({ kind: "named", name: "yellow" });
		}
	});

	it("should parse linear gradient with all directions", () => {
		const directions = ["to top", "to right", "to bottom", "to left"];

		for (const dir of directions) {
			const css = `linear-gradient(${dir}, red, blue)`;
			const result = LinearParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.direction?.kind).toBe("to-side");
			}
		}
	});

	it("should parse linear gradient with all corners", () => {
		const corners = ["to top left", "to top right", "to bottom left", "to bottom right"];

		for (const corner of corners) {
			const css = `linear-gradient(${corner}, red, blue)`;
			const result = LinearParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.direction?.kind).toBe("to-corner");
			}
		}
	});

	it("should handle linear gradient with multiple color stops", () => {
		const css = "linear-gradient(red, orange, yellow, green, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops).toHaveLength(5);
		}
	});

	it("should return error for invalid function name", () => {
		const css = "radial-gradient(red, blue)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("No linear-gradient function found");
		}
	});

	it("should return error for insufficient color stops", () => {
		const css = "linear-gradient(red)";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("at least 2 color stops");
		}
	});

	it("should return error for invalid CSS syntax", () => {
		const css = "not valid css";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(false);
	});

	it("should return error for empty function", () => {
		const css = "linear-gradient()";
		const result = LinearParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("at least 2 color stops");
		}
	});
});
