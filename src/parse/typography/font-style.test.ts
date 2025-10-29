// b_path:: src/parse/typography/font-style.test.ts
// Auto-generated from scripts/parse-test-generator/configs/typography/font-style.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
// - W3C: https://www.w3.org/TR/css-fonts-4/#font-style-prop
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/typography/font-style";

describe("parse/typography/font-style - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse normal keyword", () => {
			const result = Parser.parse("normal");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "font-style",
				value: "normal",
			});
		});

		it("should parse italic keyword", () => {
			const result = Parser.parse("italic");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "font-style",
				value: "italic",
			});
		});

		it("should parse oblique keyword", () => {
			const result = Parser.parse("oblique");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "font-style",
				value: "oblique",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase italic", () => {
			const result = Parser.parse("ITALIC");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "font-style",
				value: "italic",
			});
		});
	});
});
