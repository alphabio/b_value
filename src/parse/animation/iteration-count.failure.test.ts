// b_path:: src/parse/animation/iteration-count.failure.test.ts
// Auto-generated from scripts/test-generator/configs/iteration-count.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-iteration-count
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/iteration-count";

describe("parse/animation/iteration-count - invalid cases", () => {
	describe("invalid-negative", () => {
		it("should reject negative count", () => {
			const result = Parser.parse("-1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: animation-iteration-count must be non-negative, got: -1");
		});

		it("should reject negative decimal", () => {
			const result = Parser.parse("-0.5");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: animation-iteration-count must be non-negative, got: -0.5");
		});
	});

	describe("invalid-unit", () => {
		it("should reject time unit", () => {
			const result = Parser.parse("1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Expected number or 'infinite', got: Dimension");
		});

		it("should reject length unit", () => {
			const result = Parser.parse("2px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Expected number or 'infinite', got: Dimension");
		});
	});

	describe("invalid-keyword", () => {
		it("should reject auto keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Expected number or 'infinite', got: Identifier");
		});

		it("should reject none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Expected number or 'infinite', got: Identifier");
		});

		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Expected number or 'infinite', got: Identifier");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Empty value");
		});
	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("1,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Empty value");
		});

		it("should reject leading comma", () => {
			const result = Parser.parse(",1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Empty value before comma");
		});

		it("should reject double comma", () => {
			const result = Parser.parse("1,,2");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-iteration-count: Empty value before comma");
		});
	});
});
