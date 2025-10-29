// b_path:: src/parse/layout/cursor.failure.test.ts
// Auto-generated from scripts/test-generator/configs/cursor.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
// - W3C: https://www.w3.org/TR/css-ui-4/#cursor
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/cursor";

describe("parse/layout/cursor - invalid cases", () => {
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
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid cursor keyword: invalid");
		});

		it("should reject non-standard keyword", () => {
			const result = Parser.parse("hand");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid cursor keyword: hand");
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
