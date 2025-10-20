// b_path:: src/parse/clip-path/inset.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./inset";

describe("parse inset()", () => {
	describe("basic TRBL", () => {
		it("should parse single value (all sides)", () => {
			const result = parse("inset(10px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-inset");
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 10, unit: "px" });
				expect(result.value.borderRadius).toBeUndefined();
			}
		});

		it("should parse two values (vertical | horizontal)", () => {
			const result = parse("inset(10px 20px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse three values", () => {
			const result = parse("inset(10px 20px 30px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse four values (TRBL)", () => {
			const result = parse("inset(10px 20px 30px 40px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 40, unit: "px" });
			}
		});

		it("should handle mixed units", () => {
			const result = parse("inset(10% 20px 5em 0)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "%" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 5, unit: "em" });
				expect(result.value.left).toEqual({ value: 0, unit: "px" });
			}
		});

		it("should handle unitless zero", () => {
			const result = parse("inset(0 10px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 0, unit: "px" });
				expect(result.value.right).toEqual({ value: 10, unit: "px" });
			}
		});

		it("should handle all zero", () => {
			const result = parse("inset(0)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 0, unit: "px" });
			}
		});

		it("should handle percentage values", () => {
			const result = parse("inset(10% 20%)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "%" });
				expect(result.value.right).toEqual({ value: 20, unit: "%" });
			}
		});

		it("should handle negative insets", () => {
			const result = parse("inset(-10px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: -10, unit: "px" });
			}
		});
	});

	describe("border-radius", () => {
		it("should parse single radius (all corners)", () => {
			const result = parse("inset(10px round 5px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius).toBeDefined();
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.bottomRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.bottomLeft).toEqual({ value: 5, unit: "px" });
			}
		});

		it("should parse two radii (diagonal corners)", () => {
			const result = parse("inset(10px round 5px 10px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.borderRadius?.bottomRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.bottomLeft).toEqual({ value: 10, unit: "px" });
			}
		});

		it("should parse four radii (all corners)", () => {
			const result = parse("inset(10px round 5px 10px 15px 20px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.borderRadius?.bottomRight).toEqual({ value: 15, unit: "px" });
				expect(result.value.borderRadius?.bottomLeft).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse zero radius", () => {
			const result = parse("inset(10px round 0)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 0, unit: "px" });
			}
		});

		it("should parse mixed TRBL with radius", () => {
			const result = parse("inset(10px 20px round 5px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
			}
		});

		it("should parse full complex example", () => {
			const result = parse("inset(5% 10% 15% 20% round 2px 4px 6px 8px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 5, unit: "%" });
				expect(result.value.right).toEqual({ value: 10, unit: "%" });
				expect(result.value.bottom).toEqual({ value: 15, unit: "%" });
				expect(result.value.left).toEqual({ value: 20, unit: "%" });
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 2, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 4, unit: "px" });
				expect(result.value.borderRadius?.bottomRight).toEqual({ value: 6, unit: "px" });
				expect(result.value.borderRadius?.bottomLeft).toEqual({ value: 8, unit: "px" });
			}
		});
	});

	describe("edge cases and errors", () => {
		it("should reject empty function", () => {
			const result = parse("inset()");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("at least one");
			}
		});

		it("should reject too many TRBL values", () => {
			const result = parse("inset(1px 2px 3px 4px 5px)");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("accepts 1-4");
			}
		});

		it("should reject round without value", () => {
			const result = parse("inset(10px round)");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("after 'round'");
			}
		});

		it("should reject negative radius", () => {
			const result = parse("inset(10px round -5px)");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("non-negative");
			}
		});

		it("should reject invalid syntax", () => {
			const result = parse("inset(round 10px)");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBeTruthy();
			}
		});

		it("should reject invalid function name", () => {
			const result = parse("circle(10px)");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("inset");
			}
		});
	});
});
