// b_path:: src/generate/clip-path/ellipse.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse";
import * as Ellipse from "./ellipse";

describe("generate/clip-path/ellipse", () => {
	describe("basic generation", () => {
		it("should generate ellipse with no arguments", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse()" });
		});

		it("should generate ellipse with single radius", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: { value: 50, unit: "px" },
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(50px)" });
		});

		it("should generate ellipse with two radii", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: { value: 50, unit: "px" },
				radiusY: { value: 100, unit: "px" },
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(50px 100px)" });
		});

		it("should generate ellipse with percentage radii", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: { value: 50, unit: "%" },
				radiusY: { value: 75, unit: "%" },
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(50% 75%)" });
		});

		it("should generate ellipse with mixed units", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: { value: 2, unit: "rem" },
				radiusY: { value: 100, unit: "px" },
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(2rem 100px)" });
		});
	});

	describe("keyword radii", () => {
		it("should generate ellipse with closest-side keywords", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: "closest-side",
				radiusY: "closest-side",
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(closest-side closest-side)" });
		});

		it("should generate ellipse with farthest-side keywords", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: "farthest-side",
				radiusY: "farthest-side",
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(farthest-side farthest-side)" });
		});

		it("should generate ellipse with mixed keywords", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: "closest-side",
				radiusY: "farthest-side",
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(closest-side farthest-side)" });
		});

		it("should generate ellipse with keyword and value", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: { value: 50, unit: "px" },
				radiusY: "farthest-side",
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(50px farthest-side)" });
		});
	});

	describe("position generation", () => {
		it("should generate ellipse with position only", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				position: {
					horizontal: "center",
					vertical: "center",
				},
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(at center center)" });
		});

		it("should generate ellipse with radii and position", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: { value: 50, unit: "px" },
				radiusY: { value: 100, unit: "px" },
				position: {
					horizontal: { value: 30, unit: "px" },
					vertical: { value: 40, unit: "px" },
				},
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(50px 100px at 30px 40px)" });
		});

		it("should generate ellipse with keywords and position", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: "closest-side",
				radiusY: "farthest-side",
				position: {
					horizontal: "left",
					vertical: "top",
				},
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(closest-side farthest-side at left top)" });
		});
	});

	describe("edge cases", () => {
		it("should generate ellipse with zero radii", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusX: { value: 0, unit: "px" },
				radiusY: { value: 0, unit: "px" },
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(0px 0px)" });
		});

		it("should generate ellipse with only radiusY", () => {
			const css = Ellipse.generate({
				kind: "clip-path-ellipse",
				radiusY: { value: 100, unit: "px" },
			});
			expect(css).toEqual({ ok: true, issues: [], value: "ellipse(100px)" });
		});
	});

	describe("round-trip validation", () => {
		it("should round-trip empty ellipse", () => {
			const original = "ellipse()";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with single radius", () => {
			const original = "ellipse(50px)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with two radii", () => {
			const original = "ellipse(50px 100px)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with keywords", () => {
			const original = "ellipse(closest-side farthest-side)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with position", () => {
			const original = "ellipse(at center center)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with radii and position", () => {
			const original = "ellipse(50px 100px at 30px 40px)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with keywords and position", () => {
			const original = "ellipse(closest-side farthest-side at left top)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with percentage", () => {
			const original = "ellipse(50% 75%)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with zero", () => {
			const original = "ellipse(0 0)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});

		it("should round-trip ellipse with mixed units", () => {
			const original = "ellipse(2rem 100px at 30% top)";
			const parsed = Parse.ClipPath.Ellipse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Ellipse.generate(parsed.value);
				const reparsed = Parse.ClipPath.Ellipse.parse(generated);
				expect(reparsed).toEqual(parsed);
			}
		});
	});
});
