// b_path:: test/integration/color-gradient.test.ts
import { describe, expect, test } from "vitest";
import * as ConicGenerate from "@/generate/gradient/conic";
import * as LinearGenerate from "@/generate/gradient/linear";
import * as RadialGenerate from "@/generate/gradient/radial";
import * as ConicParse from "@/parse/gradient/conic";
import * as LinearParse from "@/parse/gradient/linear";
import * as RadialParse from "@/parse/gradient/radial";

describe("Color-Gradient Integration", () => {
	describe("Linear gradients with multiple color formats", () => {
		test("hex and rgb colors", () => {
			const input = "linear-gradient(#ff0000, rgb(0 255 0))";
			const result = LinearParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "hex",
					value: "#FF0000",
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "rgb",
					r: 0,
					g: 255,
					b: 0,
				});

				// Round-trip
				const css = LinearGenerate.generate(result.value);
				expect(css).toBe("linear-gradient(#FF0000, rgb(0 255 0))");
			}
		});

		test("named and hsl colors", () => {
			const input = "linear-gradient(red, hsl(120 100% 50%))";
			const result = LinearParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "named",
					name: "red",
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "hsl",
					h: 120,
					s: 100,
					l: 50,
				});

				// Round-trip
				const css = LinearGenerate.generate(result.value);
				expect(css).toBe("linear-gradient(red, hsl(120 100% 50%))");
			}
		});

		test("oklch and lab colors", () => {
			const input = "linear-gradient(oklch(0.5 0.2 180), lab(50 -20 30))";
			const result = LinearParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
				});

				// Round-trip
				const css = LinearGenerate.generate(result.value);
				expect(css).toBe("linear-gradient(oklch(0.5 0.2 180), lab(50 -20 30))");
			}
		});

		test("transparent and currentcolor", () => {
			const input = "linear-gradient(transparent, currentcolor)";
			const result = LinearParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "special",
					keyword: "transparent",
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "special",
					keyword: "currentcolor",
				});

				// Round-trip
				const css = LinearGenerate.generate(result.value);
				expect(css).toBe("linear-gradient(transparent, currentcolor)");
			}
		});

		test("hwb and lch colors with positions", () => {
			const input = "linear-gradient(hwb(120 20% 30%) 0%, lch(50 50 180) 100%)";
			const result = LinearParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "hwb",
					h: 120,
					w: 20,
					b: 30,
				});
				expect(result.value.colorStops[0]?.position).toEqual({
					value: 0,
					unit: "%",
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "lch",
					l: 50,
					c: 50,
					h: 180,
				});
				expect(result.value.colorStops[1]?.position).toEqual({
					value: 100,
					unit: "%",
				});

				// Round-trip
				const css = LinearGenerate.generate(result.value);
				expect(css).toBe("linear-gradient(hwb(120 20% 30%) 0%, lch(50 50 180) 100%)");
			}
		});
	});

	describe("Radial gradients with multiple color formats", () => {
		test("rgb and hex colors", () => {
			const input = "radial-gradient(circle, rgb(255 0 0), #0000ff)";
			const result = RadialParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "rgb",
					r: 255,
					g: 0,
					b: 0,
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "hex",
					value: "#0000FF",
				});

				// Round-trip
				const css = RadialGenerate.generate(result.value);
				expect(css).toBe("radial-gradient(circle, rgb(255 0 0), #0000FF)");
			}
		});

		test("oklab and hsl colors", () => {
			const input = "radial-gradient(oklab(0.5 -0.2 0.3), hsl(240 100% 50%))";
			const result = RadialParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "oklab",
					l: 0.5,
					a: -0.2,
					b: 0.3,
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "hsl",
					h: 240,
					s: 100,
					l: 50,
				});

				// Round-trip
				const css = RadialGenerate.generate(result.value);
				expect(css).toBe("radial-gradient(oklab(0.5 -0.2 0.3), hsl(240 100% 50%))");
			}
		});
	});

	describe("Conic gradients with multiple color formats", () => {
		test("hex, named, and rgb colors", () => {
			const input = "conic-gradient(#ff0000, blue, rgb(0 255 0))";
			const result = ConicParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "hex",
					value: "#FF0000",
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "named",
					name: "blue",
				});
				expect(result.value.colorStops[2]?.color).toEqual({
					kind: "rgb",
					r: 0,
					g: 255,
					b: 0,
				});

				// Round-trip
				const css = ConicGenerate.generate(result.value);
				expect(css).toBe("conic-gradient(#FF0000, blue, rgb(0 255 0))");
			}
		});

		test("oklch and lab colors with angles", () => {
			const input = "conic-gradient(oklch(0.5 0.2 180) 0deg, lab(50 -20 30) 90deg)";
			const result = ConicParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
				});
				expect(result.value.colorStops[0]?.position).toEqual({
					value: 0,
					unit: "deg",
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
				});
				expect(result.value.colorStops[1]?.position).toEqual({
					value: 90,
					unit: "deg",
				});

				// Round-trip
				const css = ConicGenerate.generate(result.value);
				expect(css).toBe("conic-gradient(oklch(0.5 0.2 180) 0deg, lab(50 -20 30) 90deg)");
			}
		});
	});

	describe("Complex gradients with alpha channels", () => {
		test("linear gradient with alpha in multiple formats", () => {
			const input = "linear-gradient(rgb(255 0 0 / 0.5), hsl(120 100% 50% / 0.8), oklch(0.5 0.2 180 / 0.3))";
			const result = LinearParse.parse(input);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorStops[0]?.color).toEqual({
					kind: "rgb",
					r: 255,
					g: 0,
					b: 0,
					alpha: 0.5,
				});
				expect(result.value.colorStops[1]?.color).toEqual({
					kind: "hsl",
					h: 120,
					s: 100,
					l: 50,
					alpha: 0.8,
				});
				expect(result.value.colorStops[2]?.color).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
					alpha: 0.3,
				});

				// Round-trip
				const css = LinearGenerate.generate(result.value);
				expect(css).toBe("linear-gradient(rgb(255 0 0 / 0.5), hsl(120 100% 50% / 0.8), oklch(0.5 0.2 180 / 0.3))");
			}
		});
	});
});
