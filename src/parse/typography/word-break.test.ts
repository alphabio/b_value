// b_path:: src/parse/typography/word-break.test.ts
import { describe, expect, it } from "vitest";
import * as WordBreak from "./word-break";

describe("Parse.Typography.WordBreak", () => {
	describe("valid keywords", () => {
		it("should parse 'normal'", () => {
			const result = WordBreak.parse("normal");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "word-break",
					value: "normal",
				});
			}
		});

		it("should parse 'break-all'", () => {
			const result = WordBreak.parse("break-all");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "word-break",
					value: "break-all",
				});
			}
		});

		it("should parse 'keep-all'", () => {
			const result = WordBreak.parse("keep-all");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "word-break",
					value: "keep-all",
				});
			}
		});

		it("should parse 'break-word'", () => {
			const result = WordBreak.parse("break-word");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "word-break",
					value: "break-word",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'BREAK-ALL' (uppercase)", () => {
			const result = WordBreak.parse("BREAK-ALL");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("break-all");
			}
		});

		it("should parse 'Keep-All' (mixed case)", () => {
			const result = WordBreak.parse("Keep-All");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("keep-all");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = WordBreak.parse("wrap");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid word-break keyword");
			}
		});

		it("should reject numeric value", () => {
			const result = WordBreak.parse("12px");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = WordBreak.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = WordBreak.parse("normal break-all");
			expect(result.ok).toBe(false);
		});
	});
});
