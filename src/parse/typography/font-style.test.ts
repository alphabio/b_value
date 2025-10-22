// b_path:: src/parse/typography/font-style.test.ts
import { describe, expect, it } from "vitest";
import * as FontStyle from "./font-style";

describe("Parse.Typography.FontStyle", () => {
	describe("valid keywords", () => {
		it("should parse 'normal'", () => {
			const result = FontStyle.parse("normal");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "font-style",
					value: "normal",
				});
			}
		});

		it("should parse 'italic'", () => {
			const result = FontStyle.parse("italic");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "font-style",
					value: "italic",
				});
			}
		});

		it("should parse 'oblique'", () => {
			const result = FontStyle.parse("oblique");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "font-style",
					value: "oblique",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'ITALIC' (uppercase)", () => {
			const result = FontStyle.parse("ITALIC");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("italic");
			}
		});

		it("should parse 'Oblique' (mixed case)", () => {
			const result = FontStyle.parse("Oblique");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("oblique");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = FontStyle.parse("underline");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid font-style keyword");
			}
		});

		it("should reject numeric value", () => {
			const result = FontStyle.parse("400");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = FontStyle.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = FontStyle.parse("italic normal");
			expect(result.ok).toBe(false);
		});
	});
});
