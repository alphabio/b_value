// b_path:: src/parse/layout/box-sizing.failure.test.ts
// Auto-generated from scripts/test-generator/configs/box-sizing.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
// - W3C: https://www.w3.org/TR/css-sizing-3/#box-sizing
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/box-sizing";

describe("parse/layout/box-sizing - invalid cases", () => {
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
			const result = Parser.parse("padding-box");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid box-sizing keyword: padding-box");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("margin-box");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid box-sizing keyword: margin-box");
		});

		it("should reject non-standard keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid box-sizing keyword: auto");
		});
	});

	describe("invalid-type", () => {
		it("should reject number value", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected keyword for box-sizing");
		});

		it("should reject dimension value", () => {
			const result = Parser.parse("1px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected keyword for box-sizing");
		});
	});

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("content-box, border-box");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 3 values");
		});
	});
});
