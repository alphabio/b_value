// b_path:: src/parse/typography/text-transform.test.ts
import { describe, expect, it } from "vitest";
import * as TextTransform from "./text-transform";

describe("Parse.Typography.TextTransform", () => {
	describe("valid keywords", () => {
		it("should parse 'none'", () => {
			const result = TextTransform.parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-transform",
					value: "none",
				});
			}
		});

		it("should parse 'capitalize'", () => {
			const result = TextTransform.parse("capitalize");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-transform",
					value: "capitalize",
				});
			}
		});

		it("should parse 'uppercase'", () => {
			const result = TextTransform.parse("uppercase");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-transform",
					value: "uppercase",
				});
			}
		});

		it("should parse 'lowercase'", () => {
			const result = TextTransform.parse("lowercase");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-transform",
					value: "lowercase",
				});
			}
		});

		it("should parse 'full-width'", () => {
			const result = TextTransform.parse("full-width");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-transform",
					value: "full-width",
				});
			}
		});

		it("should parse 'full-size-kana'", () => {
			const result = TextTransform.parse("full-size-kana");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-transform",
					value: "full-size-kana",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'UPPERCASE' (uppercase)", () => {
			const result = TextTransform.parse("UPPERCASE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("uppercase");
			}
		});

		it("should parse 'Capitalize' (mixed case)", () => {
			const result = TextTransform.parse("Capitalize");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("capitalize");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = TextTransform.parse("underline");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid text-transform keyword");
			}
		});

		it("should reject numeric value", () => {
			const result = TextTransform.parse("12px");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = TextTransform.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = TextTransform.parse("uppercase lowercase");
			expect(result.ok).toBe(false);
		});
	});
});
