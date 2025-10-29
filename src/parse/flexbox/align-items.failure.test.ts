// b_path:: src/parse/flexbox/align-items.failure.test.ts
// Auto-generated from scripts/test-generator/configs/align-items.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/align-items";

describe("parse/flexbox/align-items - invalid cases", () => {
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
			expect(result.error).toBe("Invalid align-items value: middle");
		});
	});

	describe("invalid-type", () => {
		it("should reject numeric value", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected identifier");
		});

		it("should reject dimension value", () => {
			const result = Parser.parse("10px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected identifier");
		});
	});

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("center baseline");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 2 values");
		});
	});
});
