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
			expect(result.value.colorStops[0]?.color).toEqual({ kind: "named", name: "red" });
			expect(result.value.colorStops[1]?.color).toEqual({ kind: "named", name: "blue" });
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
			expect(result.value.colorStops[1]?.color).toEqual({ kind: "named", name: "yellow" });
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

	it("should parse radial gradient with explicit circle radius", () => {
		const css = "radial-gradient(100px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "circle-explicit",
				radius: { value: 100, unit: "px" },
			});
		}
	});

	it("should parse radial gradient with explicit ellipse radii", () => {
		const css = "radial-gradient(50% 100px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "ellipse-explicit",
				radiusX: { value: 50, unit: "%" },
				radiusY: { value: 100, unit: "px" },
			});
		}
	});

	it("should parse radial gradient with color interpolation method", () => {
		const css = "radial-gradient(in srgb, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorSpace).toBe("srgb");
		}
	});

	it("should parse radial gradient with oklch color space", () => {
		const css = "radial-gradient(in oklch, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorSpace).toBe("oklch");
		}
	});

	it("should parse radial gradient with display-p3 color space", () => {
		const css = "radial-gradient(in display-p3, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorSpace).toBe("display-p3");
		}
	});

	it("should parse radial gradient with shape and color space", () => {
		const css = "radial-gradient(circle in srgb, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.shape).toBe("circle");
			expect(result.value.colorSpace).toBe("srgb");
		}
	});

	it("should handle comma after color space", () => {
		const css = "radial-gradient(in srgb, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorSpace).toBe("srgb");
			expect(result.value.colorStops).toHaveLength(2);
		}
	});

	it("should handle size with single dimension value", () => {
		const css = "radial-gradient(50px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "circle-explicit",
				radius: { value: 50, unit: "px" },
			});
		}
	});

	it("should handle size with percentage value", () => {
		const css = "radial-gradient(75%, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "circle-explicit",
				radius: { value: 75, unit: "%" },
			});
		}
	});

	it("should handle ellipse with two length values", () => {
		const css = "radial-gradient(100px 50px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "ellipse-explicit",
				radiusX: { value: 100, unit: "px" },
				radiusY: { value: 50, unit: "px" },
			});
		}
	});

	it("should handle position with length values", () => {
		const css = "radial-gradient(at 10px 20px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: { value: 10, unit: "px" },
				vertical: { value: 20, unit: "px" },
			});
		}
	});

	it("should handle position with mixed keyword and length", () => {
		const css = "radial-gradient(at left 20px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position?.horizontal).toBe("left");
		}
	});

	it("should handle position with single value", () => {
		const css = "radial-gradient(at 50%, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toBeDefined();
		}
	});

	// Error path tests
	it("should return error for empty gradient", () => {
		const css = "radial-gradient()";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("at least 2 color stops");
		}
	});

	it("should return error for missing function", () => {
		const css = "not a function";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(false);
	});

	it("should return error for wrong function name", () => {
		const css = "linear-gradient(red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(false);
	});

	it("should handle shape without size", () => {
		const css = "radial-gradient(ellipse, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.shape).toBe("ellipse");
			expect(result.value.size).toBeUndefined();
		}
	});

	it("should handle size closest-side", () => {
		const css = "radial-gradient(closest-side, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "keyword",
				value: "closest-side",
			});
		}
	});

	it("should handle size farthest-side", () => {
		const css = "radial-gradient(farthest-side, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "keyword",
				value: "farthest-side",
			});
		}
	});

	it("should handle size closest-corner", () => {
		const css = "radial-gradient(closest-corner, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "keyword",
				value: "closest-corner",
			});
		}
	});

	it("should handle circle with explicit size", () => {
		const css = "radial-gradient(circle 200px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.shape).toBe("circle");
			expect(result.value.size).toEqual({
				kind: "circle-explicit",
				radius: { value: 200, unit: "px" },
			});
		}
	});

	it("should handle ellipse with explicit size", () => {
		const css = "radial-gradient(ellipse 100px 200px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.shape).toBe("ellipse");
			expect(result.value.size).toEqual({
				kind: "ellipse-explicit",
				radiusX: { value: 100, unit: "px" },
				radiusY: { value: 200, unit: "px" },
			});
		}
	});

	it("should handle position right bottom", () => {
		const css = "radial-gradient(at right bottom, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: "right",
				vertical: "bottom",
			});
		}
	});

	it("should handle position with percentage values", () => {
		const css = "radial-gradient(at 25% 75%, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: { value: 25, unit: "%" },
				vertical: { value: 75, unit: "%" },
			});
		}
	});

	it("should handle position with top keyword", () => {
		const css = "radial-gradient(at top, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: "center",
				vertical: "top",
			});
		}
	});

	it("should handle position with bottom keyword", () => {
		const css = "radial-gradient(at bottom, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.position).toEqual({
				horizontal: "center",
				vertical: "bottom",
			});
		}
	});

	it("should handle explicit size with ellipse two dimensions", () => {
		const css = "radial-gradient(120px 80px, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "ellipse-explicit",
				radiusX: { value: 120, unit: "px" },
				radiusY: { value: 80, unit: "px" },
			});
		}
	});

	it("should handle explicit size with percentages for ellipse", () => {
		const css = "radial-gradient(60% 40%, red, blue)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.size).toEqual({
				kind: "ellipse-explicit",
				radiusX: { value: 60, unit: "%" },
				radiusY: { value: 40, unit: "%" },
			});
		}
	});

	it("should handle color stops with px positions", () => {
		const css = "radial-gradient(red 10px, blue 50px)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops[0]?.position).toEqual({
				value: 10,
				unit: "px",
			});
			expect(result.value.colorStops[1]?.position).toEqual({
				value: 50,
				unit: "px",
			});
		}
	});

	it("should handle color stops with em positions", () => {
		const css = "radial-gradient(red 1em, blue 2em)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops[0]?.position).toEqual({
				value: 1,
				unit: "em",
			});
		}
	});

	it("should handle rgb colors", () => {
		const css = "radial-gradient(rgb(255, 0, 0), rgb(0, 0, 255))";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops).toHaveLength(2);
		}
	});

	it("should handle hex colors", () => {
		const css = "radial-gradient(#ff0000, #0000ff)";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops[0]?.color).toEqual({ kind: "hex", value: "#FF0000" });
			expect(result.value.colorStops[1]?.color).toEqual({ kind: "hex", value: "#0000FF" });
		}
	});

	it("should handle mixed color formats", () => {
		const css = "radial-gradient(red, #00ff00, rgb(0, 0, 255))";
		const result = RadialParser.parse(css);

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.colorStops).toHaveLength(3);
		}
	});
});
