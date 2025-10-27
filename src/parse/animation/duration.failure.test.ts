// b_path:: src/parse/animation/duration.failure.test.ts
// Auto-generated from scripts/test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-duration
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/duration";

describe("parse/animation/duration - invalid cases", () => {
	describe("invalid-negative", () => {
		it("should reject negative duration", () => {
			const result = Parser.parse("-1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("must be");
		});

		it("should reject negative milliseconds", () => {
			const result = Parser.parse("-500ms");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("must be");
		});

	});

	describe("invalid-unit", () => {
		it("should reject invalid unit", () => {
			const result = Parser.parse("1px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Invalid");
		});

		it("should reject wrong unit type", () => {
			const result = Parser.parse("1em");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Invalid");
		});

		it("should reject missing unit", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Expected");
		});

	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Empty");
		});

	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("1s,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Empty");
		});

		it("should reject leading comma", () => {
			const result = Parser.parse(",1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Empty");
		});

		it("should reject double comma", () => {
			const result = Parser.parse("1s,,2s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Empty");
		});

	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Expected");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Expected");
		});

	});

});
