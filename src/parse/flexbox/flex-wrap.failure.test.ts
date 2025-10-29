// b_path:: src/parse/flexbox/flex-wrap.failure.test.ts
// Auto-generated from scripts/test-generator/configs/flex-wrap.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/flex-wrap";

describe("parse/flexbox/flex-wrap - invalid cases", () => {
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
			expect(result.error).toBe("Invalid flex-wrap value: none");
		});
	});
});
