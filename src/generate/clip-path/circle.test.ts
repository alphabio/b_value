// b_path:: src/generate/clip-path/circle.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/clip-path/circle";
import * as Generate from "./circle";

describe("Generate.ClipPath.Circle", () => {
	describe("Basic generation", () => {
		it("generates circle() with no arguments", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
			});

			expect(css).toBe("circle()");
		});

		it("generates circle() with radius", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "px" },
			});

			expect(css).toBe("circle(50px)");
		});

		it("generates circle() with percentage radius", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "%" },
			});

			expect(css).toBe("circle(50%)");
		});

		it("generates circle() with closest-side", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				radius: "closest-side",
			});

			expect(css).toBe("circle(closest-side)");
		});

		it("generates circle() with farthest-side", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				radius: "farthest-side",
			});

			expect(css).toBe("circle(farthest-side)");
		});
	});

	describe("Position generation", () => {
		it("generates circle() with position only", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				position: { horizontal: "center", vertical: "center" },
			});

			expect(css).toBe("circle(at center center)");
		});

		it("generates circle() with radius and position", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "px" },
				position: { horizontal: "center", vertical: "center" },
			});

			expect(css).toBe("circle(50px at center center)");
		});

		it("generates circle() with length-percentage position", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				position: {
					horizontal: { value: 30, unit: "px" },
					vertical: { value: 40, unit: "%" },
				},
			});

			expect(css).toBe("circle(at 30px 40%)");
		});

		it("generates circle() with keyword position", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				position: { horizontal: "left", vertical: "top" },
			});

			expect(css).toBe("circle(at left top)");
		});
	});

	describe("Edge cases", () => {
		it("generates zero radius", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				radius: { value: 0, unit: "px" },
			});

			expect(css).toBe("circle(0px)");
		});

		it("generates zero percentage radius", () => {
			const css = Generate.toCss({
				kind: "clip-path-circle",
				radius: { value: 0, unit: "%" },
			});

			expect(css).toBe("circle(0%)");
		});
	});

	describe("Round-trip", () => {
		const testCases = [
			"circle()",
			"circle(50px)",
			"circle(50%)",
			"circle(closest-side)",
			"circle(farthest-side)",
			"circle(at center center)",
			"circle(50px at center center)",
			"circle(at 30px 40%)",
			"circle(at left top)",
			"circle(0px)",
		];

		for (const input of testCases) {
			it(`round-trips: ${input}`, () => {
				const parsed = Parse.parse(input);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.toCss(parsed.value);
				const reparsed = Parse.parse(generated);

				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});
});
