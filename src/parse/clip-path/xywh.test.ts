// b_path:: src/parse/clip-path/xywh.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./xywh";

describe("parse xywh()", () => {
	describe("basic position and size", () => {
		it("should parse all four values", () => {
			const result = parse("xywh(10px 20px 100px 50px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-xywh");
				expect(result.value.x).toEqual({ value: 10, unit: "px" });
				expect(result.value.y).toEqual({ value: 20, unit: "px" });
				expect(result.value.width).toEqual({ value: 100, unit: "px" });
				expect(result.value.height).toEqual({ value: 50, unit: "px" });
				expect(result.value.borderRadius).toBeUndefined();
			}
		});

		it("should parse with percentages", () => {
			const result = parse("xywh(0% 0% 100% 100%)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.x).toEqual({ value: 0, unit: "%" });
				expect(result.value.y).toEqual({ value: 0, unit: "%" });
				expect(result.value.width).toEqual({ value: 100, unit: "%" });
				expect(result.value.height).toEqual({ value: 100, unit: "%" });
			}
		});

		it("should parse with mixed units", () => {
			const result = parse("xywh(10px 5em 50% 80px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.x).toEqual({ value: 10, unit: "px" });
				expect(result.value.y).toEqual({ value: 5, unit: "em" });
				expect(result.value.width).toEqual({ value: 50, unit: "%" });
				expect(result.value.height).toEqual({ value: 80, unit: "px" });
			}
		});

		it("should parse zero values", () => {
			const result = parse("xywh(0 0 0 0)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.x).toEqual({ value: 0, unit: "px" });
				expect(result.value.width).toEqual({ value: 0, unit: "px" });
			}
		});
	});

	describe("border-radius", () => {
		it("should parse with single border-radius", () => {
			const result = parse("xywh(10px 20px 100px 50px round 5px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius).toBeDefined();
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.bottomRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.bottomLeft).toEqual({ value: 5, unit: "px" });
			}
		});

		it("should parse with multiple border-radius values", () => {
			const result = parse("xywh(0 0 100% 100% round 5px 10px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius).toBeDefined();
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 10, unit: "px" });
			}
		});

		it("should parse with full border-radius", () => {
			const result = parse("xywh(10% 20% 50px 80px round 5px 10px 15px 20px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius).toBeDefined();
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.borderRadius?.bottomRight).toEqual({ value: 15, unit: "px" });
				expect(result.value.borderRadius?.bottomLeft).toEqual({ value: 20, unit: "px" });
			}
		});
	});

	describe("validation", () => {
		it("should reject negative width", () => {
			const result = parse("xywh(10px 20px -100px 50px)");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Width must be non-negative");
			}
		});

		it("should reject negative height", () => {
			const result = parse("xywh(10px 20px 100px -50px)");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Height must be non-negative");
			}
		});

		it("should allow negative x position", () => {
			const result = parse("xywh(-10px 20px 100px 50px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.x).toEqual({ value: -10, unit: "px" });
			}
		});

		it("should allow negative y position", () => {
			const result = parse("xywh(10px -20px 100px 50px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.y).toEqual({ value: -20, unit: "px" });
			}
		});
	});

	describe("errors", () => {
		it("should error on empty function", () => {
			const result = parse("xywh()");
			expect(result.ok).toBe(false);
		});

		it("should error on too few values", () => {
			const result = parse("xywh(10px 20px)");
			expect(result.ok).toBe(false);
		});

		it("should error on too many values", () => {
			const result = parse("xywh(10px 20px 100px 50px 30px)");
			expect(result.ok).toBe(false);
		});

		it("should error on invalid value", () => {
			const result = parse("xywh(invalid 20px 100px 50px)");
			expect(result.ok).toBe(false);
		});

		it("should error on round without radius", () => {
			const result = parse("xywh(10px 20px 100px 50px round)");
			expect(result.ok).toBe(false);
		});

		it("should error on non-xywh function", () => {
			const result = parse("rect(10px 20px 30px 40px)");
			expect(result.ok).toBe(false);
		});
	});
});
