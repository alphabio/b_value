// b_path:: src/parse/clip-path/circle.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "./circle";

describe("Parse.ClipPath.Circle", () => {
	describe("Basic parsing", () => {
		it("parses circle() with no arguments (all defaults)", () => {
			const result = Parse.parse("circle()");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
			});
		});

		it("parses circle() with radius only", () => {
			const result = Parse.parse("circle(50px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "px" },
			});
		});

		it("parses circle() with percentage radius", () => {
			const result = Parse.parse("circle(50%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "%" },
			});
		});

		it("parses circle() with closest-side radius", () => {
			const result = Parse.parse("circle(closest-side)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: "closest-side",
			});
		});

		it("parses circle() with farthest-side radius", () => {
			const result = Parse.parse("circle(farthest-side)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: "farthest-side",
			});
		});
	});

	describe("Position parsing", () => {
		it("parses circle() with position only", () => {
			const result = Parse.parse("circle(at center)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				position: { horizontal: "center", vertical: "center" },
			});
		});

		it("parses circle() with radius and position", () => {
			const result = Parse.parse("circle(50px at center)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "px" },
				position: { horizontal: "center", vertical: "center" },
			});
		});

		it("parses circle() with length-percentage position", () => {
			const result = Parse.parse("circle(at 30px 40%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				position: {
					horizontal: { value: 30, unit: "px" },
					vertical: { value: 40, unit: "%" },
				},
			});
		});

		it("parses circle() with mixed keyword and value position", () => {
			const result = Parse.parse("circle(closest-side at 30% top)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.kind).toBe("clip-path-circle");
			expect(result.value.radius).toBe("closest-side");
			expect(result.value.position).toBeDefined();
		});

		it("parses circle() with keyword position", () => {
			const result = Parse.parse("circle(at left top)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				position: { horizontal: "left", vertical: "top" },
			});
		});
	});

	describe("Edge cases", () => {
		it("parses zero radius", () => {
			const result = Parse.parse("circle(0)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: { value: 0, unit: "px" },
			});
		});

		it("parses zero percentage radius", () => {
			const result = Parse.parse("circle(0%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: { value: 0, unit: "%" },
			});
		});

		it("rejects negative radius", () => {
			const result = Parse.parse("circle(-10px)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("non-negative");
		});

		it("rejects negative percentage radius", () => {
			const result = Parse.parse("circle(-50%)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("non-negative");
		});
	});

	describe("Error handling", () => {
		it("rejects non-circle function", () => {
			const result = Parse.parse("inset(10px)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("circle");
		});

		it("rejects missing position after 'at'", () => {
			const result = Parse.parse("circle(50px at)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("Expected position");
		});

		it("rejects invalid keyword", () => {
			const result = Parse.parse("circle(invalid)");
			expect(result.ok).toBe(false);
		});

		it("rejects extra content", () => {
			const result = Parse.parse("circle(50px at center extra)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("Unexpected");
		});

		it("rejects position without 'at'", () => {
			const result = Parse.parse("circle(50px center)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("'at'");
		});
	});

	describe("Whitespace handling", () => {
		it("handles extra whitespace", () => {
			const result = Parse.parse("circle(  50px   at   center  )");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-circle",
				radius: { value: 50, unit: "px" },
				position: { horizontal: "center", vertical: "center" },
			});
		});

		it("handles no whitespace", () => {
			const result = Parse.parse("circle(50px at center)");
			expect(result.ok).toBe(true);
		});
	});
});
