// b_path:: src/parse/animation/fill-mode.failure.test.ts
// Auto-generated from scripts/test-generator/configs/fill-mode.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-fill-mode
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/fill-mode";

describe("parse/animation/fill-mode - invalid cases", () => {
	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				"animation-fill-mode: Invalid animation-fill-mode keyword: invalid. Expected one of: none, forwards, backwards, both",
			);
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("normal");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				"animation-fill-mode: Invalid animation-fill-mode keyword: normal. Expected one of: none, forwards, backwards, both",
			);
		});
	});

	describe("invalid-type", () => {
		it("should reject number", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-fill-mode: Expected fill mode keyword, got: Number");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-fill-mode: Empty value");
		});
	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("none,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-fill-mode: Empty value");
		});
	});
});
