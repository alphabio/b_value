// b_path:: src/parse/typography/text-transform.test.ts
// Auto-generated from scripts/parse-test-generator/configs/typography/text-transform.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
// - W3C: https://www.w3.org/TR/css-text-3/#text-transform-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/typography/text-transform";

describe("parse/typography/text-transform - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-transform",
				value: "none",
			});
		});

		it("should parse capitalize keyword", () => {
			const result = Parser.parse("capitalize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-transform",
				value: "capitalize",
			});
		});

		it("should parse uppercase keyword", () => {
			const result = Parser.parse("uppercase");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-transform",
				value: "uppercase",
			});
		});

		it("should parse lowercase keyword", () => {
			const result = Parser.parse("lowercase");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-transform",
				value: "lowercase",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase uppercase", () => {
			const result = Parser.parse("UPPERCASE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-transform",
				value: "uppercase",
			});
		});
	});
});
