// b_path:: src/parse/layout/display.failure.test.ts
// Auto-generated from scripts/test-generator/configs/display.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
// - W3C: https://www.w3.org/TR/css-display-3/
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/display";

describe("parse/layout/display - invalid cases", () => {
	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 0 values");
		});
	});

	describe("invalid-keyword", () => {
		it("should reject visibility value", () => {
			const result = Parser.parse("visible");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid display keyword: visible");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid display keyword: auto");
		});

		it("should reject non-standard keyword", () => {
			const result = Parser.parse("show");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid display keyword: show");
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

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("block, inline");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 3 values");
		});
	});
});
