// b_path:: src/parse/clip-path/ellipse.test.ts
import { describe, expect, it } from "vitest";
import * as Ellipse from "./ellipse";

describe("parse/clip-path/ellipse", () => {
	describe("basic parsing", () => {
		it("should parse ellipse with no arguments", () => {
			const result = Ellipse.parse("ellipse()");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
				},
			});
		});

		it("should parse ellipse with single radius (both X and Y)", () => {
			const result = Ellipse.parse("ellipse(50px)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: { value: 50, unit: "px" },
				},
			});
		});

		it("should parse ellipse with two radii", () => {
			const result = Ellipse.parse("ellipse(50px 100px)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: { value: 50, unit: "px" },
					radiusY: { value: 100, unit: "px" },
				},
			});
		});

		it("should parse ellipse with percentage radii", () => {
			const result = Ellipse.parse("ellipse(50% 75%)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: { value: 50, unit: "%" },
					radiusY: { value: 75, unit: "%" },
				},
			});
		});

		it("should parse ellipse with mixed units", () => {
			const result = Ellipse.parse("ellipse(2rem 100px)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: { value: 2, unit: "rem" },
					radiusY: { value: 100, unit: "px" },
				},
			});
		});
	});

	describe("keyword radii", () => {
		it("should parse ellipse with closest-side keywords", () => {
			const result = Ellipse.parse("ellipse(closest-side closest-side)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: "closest-side",
					radiusY: "closest-side",
				},
			});
		});

		it("should parse ellipse with farthest-side keywords", () => {
			const result = Ellipse.parse("ellipse(farthest-side farthest-side)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: "farthest-side",
					radiusY: "farthest-side",
				},
			});
		});

		it("should parse ellipse with mixed keywords", () => {
			const result = Ellipse.parse("ellipse(closest-side farthest-side)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: "closest-side",
					radiusY: "farthest-side",
				},
			});
		});

		it("should parse ellipse with keyword and value", () => {
			const result = Ellipse.parse("ellipse(50px farthest-side)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: { value: 50, unit: "px" },
					radiusY: "farthest-side",
				},
			});
		});
	});

	describe("position parsing", () => {
		it("should parse ellipse with position only", () => {
			const result = Ellipse.parse("ellipse(at center center)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					position: {
						horizontal: "center",
						vertical: "center",
					},
				},
			});
		});

		it("should parse ellipse with radii and position", () => {
			const result = Ellipse.parse("ellipse(50px 100px at 30px 40px)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: { value: 50, unit: "px" },
					radiusY: { value: 100, unit: "px" },
					position: {
						horizontal: { value: 30, unit: "px" },
						vertical: { value: 40, unit: "px" },
					},
				},
			});
		});

		it("should parse ellipse with keywords and position", () => {
			const result = Ellipse.parse("ellipse(closest-side farthest-side at left top)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: "closest-side",
					radiusY: "farthest-side",
					position: {
						horizontal: "left",
						vertical: "top",
					},
				},
			});
		});

		it("should parse ellipse with mixed position", () => {
			const result = Ellipse.parse("ellipse(at 30% top)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					position: {
						horizontal: { value: 30, unit: "%" },
						vertical: "top",
					},
				},
			});
		});
	});

	describe("edge cases", () => {
		it("should parse ellipse with zero radii", () => {
			const result = Ellipse.parse("ellipse(0 0)");
			expect(result).toEqual({
				ok: true,
				value: {
					kind: "clip-path-ellipse",
					radiusX: { value: 0, unit: "px" },
					radiusY: { value: 0, unit: "px" },
				},
			});
		});

		it("should parse ellipse with unitless zero", () => {
			const result = Ellipse.parse("ellipse(0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.radiusX).toEqual({ value: 0, unit: "px" });
				expect(result.value.radiusY).toEqual({ value: 0, unit: "px" });
			}
		});

		it("should reject negative radiusX", () => {
			const result = Ellipse.parse("ellipse(-50px 100px)");
			expect(result).toEqual({
				ok: false,
				error: "ellipse() radiusX must be non-negative",
			});
		});

		it("should reject negative radiusY", () => {
			const result = Ellipse.parse("ellipse(50px -100px)");
			expect(result).toEqual({
				ok: false,
				error: "ellipse() radiusY must be non-negative",
			});
		});
	});

	describe("error handling", () => {
		it("should reject non-ellipse function", () => {
			const result = Ellipse.parse("circle(50px)");
			expect(result.ok).toBe(false);
		});

		it("should reject missing position after at", () => {
			const result = Ellipse.parse("ellipse(50px 100px at)");
			expect(result).toEqual({
				ok: false,
				error: "Expected position after 'at'",
			});
		});

		it("should reject invalid syntax", () => {
			const result = Ellipse.parse("ellipse(50px 100px center)");
			expect(result).toEqual({
				ok: false,
				error: "Expected 'at' keyword before position",
			});
		});

		it("should reject extra content", () => {
			const result = Ellipse.parse("ellipse(50px 100px at center extra)");
			expect(result.ok).toBe(false);
		});

		it("should reject invalid keyword", () => {
			const result = Ellipse.parse("ellipse(invalid)");
			expect(result.ok).toBe(false);
		});
	});

	describe("whitespace handling", () => {
		it("should handle extra whitespace", () => {
			const result = Ellipse.parse("ellipse(  50px   100px   at   center   center  )");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.radiusX).toEqual({ value: 50, unit: "px" });
				expect(result.value.radiusY).toEqual({ value: 100, unit: "px" });
			}
		});

		it("should handle no whitespace", () => {
			const result = Ellipse.parse("ellipse(50px 100px at center center)");
			expect(result.ok).toBe(true);
		});
	});
});
