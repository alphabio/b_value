// b_path:: src/parse/flexbox/justify-content.failure.test.ts
// Auto-generated from scripts/test-generator/configs/justify-content.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/justify-content";

describe("parse/flexbox/justify-content - invalid cases", () => {
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
			expect(result.error).toBe("Invalid justify-content value: middle");
		});
	});
});
