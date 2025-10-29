// b_path:: src/parse/typography/text-align.failure.test.ts
// Auto-generated from scripts/test-generator/configs/text-align.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
// - W3C: https://www.w3.org/TR/css-text-3/#text-align-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/typography/text-align";

describe("parse/typography/text-align - invalid cases", () => {
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
			const result = Parser.parse("middle");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid text-align keyword: middle");
		});
	});
});
