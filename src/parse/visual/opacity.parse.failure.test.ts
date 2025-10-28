// b_path:: src/parse/visual/opacity.parse.failure.test.ts
// Auto-generated from scripts/test-generator/configs/opacity.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
// - W3C: https://www.w3.org/TR/css-color-4/#transparency
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/visual/opacity";

describe("parse/visual/opacity - invalid cases", () => {
	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 0 values");
		});
	});

	describe("invalid-unit", () => {
		it("should reject invalid unit", () => {
			const result = Parser.parse("1px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected number or percentage, got: Dimension");
		});

		it("should reject wrong unit type", () => {
			const result = Parser.parse("1em");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected number or percentage, got: Dimension");
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected number or percentage, got: Identifier");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected number or percentage, got: Identifier");
		});
	});

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("0.5, 1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 3 values");
		});
	});
});
