// b_path:: src/parse/transition/delay.failure.test.ts
// Auto-generated from scripts/test-generator/configs/delay.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-delay-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/transition/delay";

describe("parse/transition/delay - invalid cases", () => {
	describe("invalid-unit", () => {
		it("should reject length unit", () => {
			const result = Parser.parse("1px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Invalid time unit: px. Expected 's' or 'ms'");
		});

		it("should reject font unit", () => {
			const result = Parser.parse("1em");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Invalid time unit: em. Expected 's' or 'ms'");
		});

		it("should reject angle unit", () => {
			const result = Parser.parse("1deg");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Invalid time unit: deg. Expected 's' or 'ms'");
		});

		it("should reject missing unit", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Expected time dimension, got: Number");
		});
	});

	describe("invalid-keyword", () => {
		it("should reject auto keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Expected time dimension, got: Identifier");
		});

		it("should reject none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Expected time dimension, got: Identifier");
		});

		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Expected time dimension, got: Identifier");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Empty value");
		});
	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("1s,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Empty value");
		});

		it("should reject leading comma", () => {
			const result = Parser.parse(",1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Empty value before comma");
		});

		it("should reject double comma", () => {
			const result = Parser.parse("1s,,2s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-delay: Empty value before comma");
		});
	});
});
