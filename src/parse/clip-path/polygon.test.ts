// b_path:: src/parse/clip-path/polygon.test.ts

import { describe, expect, it } from "vitest";
import * as Polygon from "./polygon";

describe("Parse.ClipPath.Polygon.parse", () => {
	describe("basic parsing", () => {
		it("should parse 3-point triangle", () => {
			const result = Polygon.parse("polygon(50% 0%, 100% 100%, 0% 100%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-polygon",
				points: [
					{ x: { value: 50, unit: "%" }, y: { value: 0, unit: "%" } },
					{ x: { value: 100, unit: "%" }, y: { value: 100, unit: "%" } },
					{ x: { value: 0, unit: "%" }, y: { value: 100, unit: "%" } },
				],
			});
		});

		it("should parse 4-point square", () => {
			const result = Polygon.parse("polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(4);
			expect(result.value.points[0]).toEqual({ x: { value: 0, unit: "px" }, y: { value: 0, unit: "px" } });
			expect(result.value.points[3]).toEqual({ x: { value: 0, unit: "px" }, y: { value: 100, unit: "px" } });
		});

		it("should parse 5-point pentagon", () => {
			const result = Polygon.parse("polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(5);
		});

		it("should parse polygon with mixed units", () => {
			const result = Polygon.parse("polygon(10px 20%, 50% 30px, 100px 100%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toEqual([
				{ x: { value: 10, unit: "px" }, y: { value: 20, unit: "%" } },
				{ x: { value: 50, unit: "%" }, y: { value: 30, unit: "px" } },
				{ x: { value: 100, unit: "px" }, y: { value: 100, unit: "%" } },
			]);
		});

		it("should parse polygon with unitless zero", () => {
			const result = Polygon.parse("polygon(0 0, 100px 0, 100px 100px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points[0]).toEqual({ x: { value: 0, unit: "px" }, y: { value: 0, unit: "px" } });
		});
	});

	describe("fill-rule parsing", () => {
		it("should parse nonzero fill-rule", () => {
			const result = Polygon.parse("polygon(nonzero, 50% 0%, 100% 50%, 50% 100%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.fillRule).toBe("nonzero");
			expect(result.value.points).toHaveLength(3);
		});

		it("should parse evenodd fill-rule", () => {
			const result = Polygon.parse("polygon(evenodd, 0px 0px, 100px 0px, 100px 100px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.fillRule).toBe("evenodd");
			expect(result.value.points).toHaveLength(3);
		});

		it("should parse polygon without fill-rule", () => {
			const result = Polygon.parse("polygon(50% 0%, 100% 50%, 50% 100%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.fillRule).toBeUndefined();
		});
	});

	describe("complex shapes", () => {
		it("should parse 6-point star", () => {
			const result = Polygon.parse(
				"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
			);
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(10);
		});

		it("should parse 6-sided hexagon", () => {
			const result = Polygon.parse("polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(6);
		});
	});

	describe("edge cases", () => {
		it("should handle minimum 3 points", () => {
			const result = Polygon.parse("polygon(0px 0px, 50px 50px, 100px 0px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(3);
		});

		it("should handle many points", () => {
			const points = Array.from({ length: 20 }, (_, i) => `${i * 5}% ${(i * 3) % 100}%`).join(", ");
			const result = Polygon.parse(`polygon(${points})`);
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(20);
		});
	});

	describe("error handling", () => {
		it("should reject too few points", () => {
			const result = Polygon.parse("polygon(50% 0%, 100% 50%)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("at least 3 points");
		});

		it("should reject odd number of coordinates", () => {
			const result = Polygon.parse("polygon(50% 0%, 100%)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("coordinate");
		});

		it("should reject invalid fill-rule", () => {
			const result = Polygon.parse("polygon(invalid, 50% 0%, 100% 50%, 50% 100%)");
			expect(result.ok).toBe(false);
		});

		it("should reject wrong function name", () => {
			const result = Polygon.parse("circle(50%)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("polygon");
		});

		it("should reject missing comma after fill-rule", () => {
			const result = Polygon.parse("polygon(nonzero 50% 0%, 100% 50%, 50% 100%)");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("comma");
		});
	});

	describe("whitespace handling", () => {
		it("should handle extra spaces", () => {
			const result = Polygon.parse("polygon(  50%   0%  ,  100%   50%  ,  50%   100%  )");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(3);
		});

		it("should handle no spaces", () => {
			const result = Polygon.parse("polygon(50% 0%,100% 50%,50% 100%)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.points).toHaveLength(3);
		});
	});
});
