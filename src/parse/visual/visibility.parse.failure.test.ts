// b_path:: src/parse/visual/visibility.parse.failure.test.ts
// Auto-generated from scripts/test-generator/configs/visibility.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
// - W3C: https://www.w3.org/TR/css-display-3/#visibility
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/visual/visibility";

describe("parse/visual/visibility - invalid cases", () => {
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
			const result = Parser.parse("auto");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid visibility keyword: auto");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid visibility keyword: none");
		});

		it("should reject non-standard keyword", () => {
			const result = Parser.parse("show");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid visibility keyword: show");
		});

		it("should reject display value", () => {
			const result = Parser.parse("block");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Invalid visibility keyword: block");
		});
	});

	describe("invalid-type", () => {
		it("should reject number value", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected keyword identifier, got: Number");
		});

		it("should reject dimension value", () => {
			const result = Parser.parse("1px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected keyword identifier, got: Dimension");
		});
	});

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("visible, hidden");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 3 values");
		});
	});
});
