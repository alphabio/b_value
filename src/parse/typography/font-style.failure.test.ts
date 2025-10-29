// b_path:: src/parse/typography/font-style.failure.test.ts
// Auto-generated from scripts/test-generator/configs/font-style.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
// - W3C: https://www.w3.org/TR/css-fonts-4/#font-style-prop
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/typography/font-style";

describe("parse/typography/font-style - invalid cases", () => {
	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 0 values");
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("bold");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid font-style keyword: bold");
		});
	});

	describe("invalid-type", () => {
		it("should reject numeric value", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected keyword for font-style");
		});

		it("should reject dimension value", () => {
			const result = Parser.parse("10px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected keyword for font-style");
		});
	});

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("normal italic");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 2 values");
		});
	});
});
