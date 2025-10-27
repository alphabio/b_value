// b_path:: src/parse/animation/direction.failure.test.ts
// Auto-generated from scripts/test-generator/configs/direction.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-direction
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/direction";

describe("parse/animation/direction - invalid cases", () => {
	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				"animation-direction: Invalid animation-direction keyword: invalid. Expected one of: normal, reverse, alternate, alternate-reverse",
			);
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("forwards");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				"animation-direction: Invalid animation-direction keyword: forwards. Expected one of: normal, reverse, alternate, alternate-reverse",
			);
		});

		it("should reject another wrong keyword", () => {
			const result = Parser.parse("backwards");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				"animation-direction: Invalid animation-direction keyword: backwards. Expected one of: normal, reverse, alternate, alternate-reverse",
			);
		});
	});

	describe("invalid-type", () => {
		it("should reject number", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-direction: Expected direction keyword, got: Number");
		});

		it("should reject time value", () => {
			const result = Parser.parse("1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-direction: Expected direction keyword, got: Dimension");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-direction: Empty value");
		});
	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("normal,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-direction: Empty value");
		});

		it("should reject leading comma", () => {
			const result = Parser.parse(",normal");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-direction: Empty value before comma");
		});

		it("should reject double comma", () => {
			const result = Parser.parse("normal,,reverse");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-direction: Empty value before comma");
		});
	});
});
