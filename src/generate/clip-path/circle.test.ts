// b_path:: src/generate/clip-path/circle.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/clip-path/circle";
import * as Generate from "./circle";

describe("Generate.ClipPath.Circle", () => {
	describe("Basic generation", () => {
		it("generates circle() with no arguments", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle()" });
		});

		it("generates circle() with radius", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "px" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(50px)" });
		});

		it("generates circle() with percentage radius", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "%" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(50%)" });
		});

		it("generates circle() with closest-side", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				radius: "closest-side",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(closest-side)" });
		});

		it("generates circle() with farthest-side", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				radius: "farthest-side",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(farthest-side)" });
		});
	});

	describe("Position generation", () => {
		it("generates circle() with position only", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				position: { horizontal: "center", vertical: "center" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(at center center)" });
		});

		it("generates circle() with radius and position", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "px" },
				position: { horizontal: "center", vertical: "center" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(50px at center center)" });
		});

		it("generates circle() with length-percentage position", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				position: {
					horizontal: { value: 30, unit: "px" },
					vertical: { value: 40, unit: "%" },
				},
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(at 30px 40%)" });
		});

		it("generates circle() with keyword position", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				position: { horizontal: "left", vertical: "top" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(at left top)" });
		});
	});

	describe("Edge cases", () => {
		it("generates zero radius", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				radius: { value: 0, unit: "px" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(0px)" });
		});

		it("generates zero percentage radius", () => {
			const css = Generate.generate({
				kind: "clip-path-circle",
				radius: { value: 0, unit: "%" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "circle(0%)" });
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

				const generated = Generate.generate(parsed.value);
				const reparsed = generated.ok ? Parse.parse(generated.value) : { ok: false as const };

				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});
});
