// b_path:: src/parse/transition/timing-function.failure.test.ts
// Auto-generated from scripts/test-generator/configs/timing-function.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/transition/timing-function";

describe("parse/transition/timing-function - invalid cases", () => {
	describe("invalid-bezier", () => {
		it("should reject bezier X1 out of range", () => {
			const result = Parser.parse("cubic-bezier(-1, 0, 1, 1)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: cubic-bezier validation failed: x1 Too small: expected number to be >=0");
		});

		it("should reject bezier X2 out of range", () => {
			const result = Parser.parse("cubic-bezier(0, 0, 2, 1)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: cubic-bezier validation failed: x2 Too big: expected number to be <=1");
		});

		it("should reject bezier X2 above 1", () => {
			const result = Parser.parse("cubic-bezier(0.5, 0, 1.5, 1)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: cubic-bezier validation failed: x2 Too big: expected number to be <=1");
		});

		it("should reject bezier missing arguments", () => {
			const result = Parser.parse("cubic-bezier(0, 0)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: cubic-bezier requires exactly 4 numbers, got 2");
		});

		it("should reject bezier too many arguments", () => {
			const result = Parser.parse("cubic-bezier(0, 0, 1, 1, 0)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: cubic-bezier requires exactly 4 numbers, got 5");
		});

	});

	describe("invalid-steps", () => {
		it("should reject zero steps", () => {
			const result = Parser.parse("steps(0)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: steps() requires a positive integer, got 0");
		});

		it("should reject negative steps", () => {
			const result = Parser.parse("steps(-1)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: steps() requires a positive integer, got -1");
		});

		it("should reject fractional steps", () => {
			const result = Parser.parse("steps(1.5)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: steps() requires a positive integer, got 1.5");
		});

		it("should reject steps missing argument", () => {
			const result = Parser.parse("steps()");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: steps() requires a step count");
		});

		it("should reject steps invalid position", () => {
			const result = Parser.parse("steps(2, invalid)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: Invalid step position keyword: invalid");
		});

	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: Invalid easing keyword: invalid");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: Invalid easing keyword: none");
		});

	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: Empty value");
		});

	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("ease,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: Empty value");
		});

		it("should reject leading comma", () => {
			const result = Parser.parse(",ease");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: Empty value before comma");
		});

		it("should reject double comma", () => {
			const result = Parser.parse("ease,,linear");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-timing-function: Empty value before comma");
		});

	});

});
