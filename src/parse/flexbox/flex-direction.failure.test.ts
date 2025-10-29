// b_path:: src/parse/flexbox/flex-direction.failure.test.ts
// Auto-generated from scripts/test-generator/configs/flex-direction.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/flex-direction";

describe("parse/flexbox/flex-direction - invalid cases", () => {
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
			const result = Parser.parse("horizontal");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid flex-direction value: horizontal");
		});
	});
});
