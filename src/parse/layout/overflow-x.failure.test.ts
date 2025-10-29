// b_path:: src/parse/layout/overflow-x.failure.test.ts
// Auto-generated from scripts/test-generator/configs/overflow-x.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
// - W3C: https://www.w3.org/TR/css-overflow-3/#overflow-properties
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/overflow-x";

describe("parse/layout/overflow-x - invalid cases", () => {
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
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid overflow-x keyword: none");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("show");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid overflow-x keyword: show");
		});
	});

	describe("invalid-type", () => {
		it("should reject number value", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected keyword identifier, got: Number");
		});
	});
});
