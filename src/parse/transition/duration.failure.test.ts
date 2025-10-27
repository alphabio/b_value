// b_path:: src/parse/transition/duration.failure.test.ts
// Auto-generated from scripts/test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-duration-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/transition/duration";

describe("parse/transition/duration - invalid cases", () => {
	describe("invalid-negative", () => {
		it("should reject negative duration", () => {
			const result = Parser.parse("-1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: transition-duration must be non-negative, got: -1");
		});

		it("should reject negative milliseconds", () => {
			const result = Parser.parse("-500ms");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: transition-duration must be non-negative, got: -500");
		});
	});

	describe("invalid-unit", () => {
		it("should reject invalid unit", () => {
			const result = Parser.parse("1px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Invalid time unit: px. Expected 's' or 'ms'");
		});

		it("should reject wrong unit type", () => {
			const result = Parser.parse("1em");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Invalid time unit: em. Expected 's' or 'ms'");
		});

		it("should reject missing unit", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Expected time dimension, got: Number");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Empty value");
		});
	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("1s,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Empty value");
		});

		it("should reject leading comma", () => {
			const result = Parser.parse(",1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Empty value before comma");
		});

		it("should reject double comma", () => {
			const result = Parser.parse("1s,,2s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Empty value before comma");
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Expected time dimension, got: Identifier");
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("transition-duration: Expected time dimension, got: Identifier");
		});
	});
});
