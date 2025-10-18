// b_path:: src/parse/gradient/radial.test.ts

import { describe, expect, it } from "vitest";
import * as RadialGenerator from "../../generate/gradient/radial";
import * as RadialParser from "./radial";

describe("Radial Gradient - Parse & Generate", () => {
	describe("parsing", () => {
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
	});

	describe("generation", () => {
		it("should generate simple radial gradient", () => {
			const ir = {
				kind: "radial" as const,
				colorStops: [{ color: "red" }, { color: "blue" }],
				repeating: false,
			};

			const css = RadialGenerator.toCss(ir);
			expect(css).toBe("radial-gradient(red, blue)");
		});

		it("should generate radial gradient with shape", () => {
			const ir = {
				kind: "radial" as const,
				shape: "circle" as const,
				colorStops: [{ color: "red" }, { color: "blue" }],
				repeating: false,
			};

			const css = RadialGenerator.toCss(ir);
			expect(css).toBe("radial-gradient(circle, red, blue)");
		});

		it("should generate radial gradient with size", () => {
			const ir = {
				kind: "radial" as const,
				shape: "circle" as const,
				size: { kind: "keyword" as const, value: "closest-side" as const },
				colorStops: [{ color: "red" }, { color: "blue" }],
				repeating: false,
			};

			const css = RadialGenerator.toCss(ir);
			expect(css).toBe("radial-gradient(circle closest-side, red, blue)");
		});

		it("should generate radial gradient with position", () => {
			const ir = {
				kind: "radial" as const,
				position: {
					horizontal: "left" as const,
					vertical: "top" as const,
				},
				colorStops: [{ color: "red" }, { color: "blue" }],
				repeating: false,
			};

			const css = RadialGenerator.toCss(ir);
			expect(css).toBe("radial-gradient(at left top, red, blue)");
		});

		it("should generate repeating radial gradient", () => {
			const ir = {
				kind: "radial" as const,
				colorStops: [{ color: "red" }, { color: "blue", position: { value: 20, unit: "px" as const } }],
				repeating: true,
			};

			const css = RadialGenerator.toCss(ir);
			expect(css).toBe("repeating-radial-gradient(red, blue 20px)");
		});
	});

	describe("round-trip", () => {
		it("should round-trip simple gradient", () => {
			const original = "radial-gradient(red, blue)";
			const parsed = RadialParser.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = RadialGenerator.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("should round-trip gradient with shape and size", () => {
			const original = "radial-gradient(circle closest-side, red, blue)";
			const parsed = RadialParser.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = RadialGenerator.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("should round-trip gradient with position", () => {
			const original = "radial-gradient(at center center, red, blue)";
			const parsed = RadialParser.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = RadialGenerator.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("should round-trip repeating gradient", () => {
			const original = "repeating-radial-gradient(red, blue 20px)";
			const parsed = RadialParser.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = RadialGenerator.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});
	});
});
