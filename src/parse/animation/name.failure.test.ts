// b_path:: src/parse/animation/name.failure.test.ts
// Auto-generated from scripts/test-generator/configs/name.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-name
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/name";

describe("parse/animation/name - invalid cases", () => {
	describe("invalid-type", () => {
		it("should reject number", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-name: Expected identifier or 'none', got: Number");
		});

		it("should reject time value", () => {
			const result = Parser.parse("1s");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-name: Expected identifier or 'none', got: Dimension");
		});

		it("should reject length value", () => {
			const result = Parser.parse("10px");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-name: Expected identifier or 'none', got: Dimension");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-name: Empty value");
		});
	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("slideIn,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-name: Empty value");
		});

		it("should reject leading comma", () => {
			const result = Parser.parse(",slideIn");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-name: Empty value before comma");
		});

		it("should reject double comma", () => {
			const result = Parser.parse("a,,b");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-name: Empty value before comma");
		});
	});
});
