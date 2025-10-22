// b_path:: src/generate/clip-path/polygon.test.ts

import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/clip-path/polygon";
import * as Polygon from "./polygon";

describe("Generate.ClipPath.Polygon.toCss", () => {
	describe("basic generation", () => {
		it("should generate 3-point triangle", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 50, unit: "%" as const }, y: { value: 0, unit: "%" as const } },
					{ x: { value: 100, unit: "%" as const }, y: { value: 100, unit: "%" as const } },
					{ x: { value: 0, unit: "%" as const }, y: { value: 100, unit: "%" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(50% 0%, 100% 100%, 0% 100%)");
		});

		it("should generate 4-point square", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 0, unit: "px" as const }, y: { value: 0, unit: "px" as const } },
					{ x: { value: 100, unit: "px" as const }, y: { value: 0, unit: "px" as const } },
					{ x: { value: 100, unit: "px" as const }, y: { value: 100, unit: "px" as const } },
					{ x: { value: 0, unit: "px" as const }, y: { value: 100, unit: "px" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px)");
		});

		it("should generate 5-point pentagon", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 50, unit: "%" as const }, y: { value: 0, unit: "%" as const } },
					{ x: { value: 100, unit: "%" as const }, y: { value: 38, unit: "%" as const } },
					{ x: { value: 82, unit: "%" as const }, y: { value: 100, unit: "%" as const } },
					{ x: { value: 18, unit: "%" as const }, y: { value: 100, unit: "%" as const } },
					{ x: { value: 0, unit: "%" as const }, y: { value: 38, unit: "%" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)");
		});

		it("should generate polygon with mixed units", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 10, unit: "px" as const }, y: { value: 20, unit: "%" as const } },
					{ x: { value: 50, unit: "%" as const }, y: { value: 30, unit: "px" as const } },
					{ x: { value: 100, unit: "px" as const }, y: { value: 100, unit: "%" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(10px 20%, 50% 30px, 100px 100%)");
		});

		it("should generate polygon with zero values", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 0, unit: "px" as const }, y: { value: 0, unit: "px" as const } },
					{ x: { value: 100, unit: "px" as const }, y: { value: 0, unit: "px" as const } },
					{ x: { value: 100, unit: "px" as const }, y: { value: 100, unit: "px" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(0px 0px, 100px 0px, 100px 100px)");
		});
	});

	describe("fill-rule generation", () => {
		it("should generate with nonzero fill-rule", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				fillRule: "nonzero" as const,
				points: [
					{ x: { value: 50, unit: "%" as const }, y: { value: 0, unit: "%" as const } },
					{ x: { value: 100, unit: "%" as const }, y: { value: 50, unit: "%" as const } },
					{ x: { value: 50, unit: "%" as const }, y: { value: 100, unit: "%" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(nonzero, 50% 0%, 100% 50%, 50% 100%)");
		});

		it("should generate with evenodd fill-rule", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				fillRule: "evenodd" as const,
				points: [
					{ x: { value: 0, unit: "px" as const }, y: { value: 0, unit: "px" as const } },
					{ x: { value: 100, unit: "px" as const }, y: { value: 0, unit: "px" as const } },
					{ x: { value: 100, unit: "px" as const }, y: { value: 100, unit: "px" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(evenodd, 0px 0px, 100px 0px, 100px 100px)");
		});

		it("should generate without fill-rule when omitted", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 50, unit: "%" as const }, y: { value: 0, unit: "%" as const } },
					{ x: { value: 100, unit: "%" as const }, y: { value: 50, unit: "%" as const } },
					{ x: { value: 50, unit: "%" as const }, y: { value: 100, unit: "%" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(50% 0%, 100% 50%, 50% 100%)");
		});
	});

	describe("complex shapes", () => {
		it("should generate 10-point star", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 50, unit: "%" as const }, y: { value: 0, unit: "%" as const } },
					{ x: { value: 61, unit: "%" as const }, y: { value: 35, unit: "%" as const } },
					{ x: { value: 98, unit: "%" as const }, y: { value: 35, unit: "%" as const } },
					{ x: { value: 68, unit: "%" as const }, y: { value: 57, unit: "%" as const } },
					{ x: { value: 79, unit: "%" as const }, y: { value: 91, unit: "%" as const } },
					{ x: { value: 50, unit: "%" as const }, y: { value: 70, unit: "%" as const } },
					{ x: { value: 21, unit: "%" as const }, y: { value: 91, unit: "%" as const } },
					{ x: { value: 32, unit: "%" as const }, y: { value: 57, unit: "%" as const } },
					{ x: { value: 2, unit: "%" as const }, y: { value: 35, unit: "%" as const } },
					{ x: { value: 39, unit: "%" as const }, y: { value: 35, unit: "%" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe(
				"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
			);
		});

		it("should generate 6-sided hexagon", () => {
			const polygon = {
				kind: "clip-path-polygon" as const,
				points: [
					{ x: { value: 50, unit: "%" as const }, y: { value: 0, unit: "%" as const } },
					{ x: { value: 100, unit: "%" as const }, y: { value: 25, unit: "%" as const } },
					{ x: { value: 100, unit: "%" as const }, y: { value: 75, unit: "%" as const } },
					{ x: { value: 50, unit: "%" as const }, y: { value: 100, unit: "%" as const } },
					{ x: { value: 0, unit: "%" as const }, y: { value: 75, unit: "%" as const } },
					{ x: { value: 0, unit: "%" as const }, y: { value: 25, unit: "%" as const } },
				],
			};
			expect(Polygon.generate(polygon)).toBe("polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)");
		});
	});

	describe("edge cases", () => {
		it("should handle many points", () => {
			const points = Array.from({ length: 20 }, (_, i) => ({
				x: { value: i * 5, unit: "%" as const },
				y: { value: (i * 3) % 100, unit: "%" as const },
			}));
			const polygon = {
				kind: "clip-path-polygon" as const,
				points,
			};
			const css = Polygon.generate(polygon);
			expect(css).toContain("polygon(");
			expect(css.split(",").length).toBe(20); // 20 points = 20 commas separating them
		});
	});

	describe("round-trip", () => {
		it("should round-trip basic triangle", () => {
			const css = "polygon(50% 0%, 100% 100%, 0% 100%)";
			const parsed = Parse.parse(css);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Polygon.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
		});

		it("should round-trip with fill-rule", () => {
			const css = "polygon(nonzero, 50% 0%, 100% 50%, 50% 100%)";
			const parsed = Parse.parse(css);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Polygon.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
		});

		it("should round-trip square", () => {
			const css = "polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px)";
			const parsed = Parse.parse(css);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Polygon.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
		});

		it("should round-trip mixed units", () => {
			const css = "polygon(10px 20%, 50% 30px, 100px 100%)";
			const parsed = Parse.parse(css);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Polygon.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
		});

		it("should round-trip hexagon", () => {
			const css = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
			const parsed = Parse.parse(css);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Polygon.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
		});

		it("should round-trip with evenodd", () => {
			const css = "polygon(evenodd, 0px 0px, 100px 0px, 100px 100px)";
			const parsed = Parse.parse(css);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Polygon.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
		});

		it("should round-trip star", () => {
			const css = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
			const parsed = Parse.parse(css);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Polygon.generate(parsed.value);
			expect(generated.ok && generated.value).toBe(css);
		});
	});
});
