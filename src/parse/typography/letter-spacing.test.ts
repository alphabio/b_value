// b_path:: src/parse/typography/letter-spacing.test.ts
import { describe, expect, it } from "vitest";
import * as LetterSpacing from "./letter-spacing";

describe("Parse.Typography.LetterSpacing", () => {
	describe("valid keywords", () => {
		it("should parse 'normal'", () => {
			const result = LetterSpacing.parse("normal");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "letter-spacing",
					value: "normal",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'NORMAL' (uppercase)", () => {
			const result = LetterSpacing.parse("NORMAL");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("normal");
			}
		});

		it("should parse 'Normal' (mixed case)", () => {
			const result = LetterSpacing.parse("Normal");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("normal");
			}
		});
	});

	describe("length values", () => {
		it("should parse '0' (zero)", () => {
			const result = LetterSpacing.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "letter-spacing",
					value: { value: 0, unit: "px" },
				});
			}
		});

		it("should parse '0.1em'", () => {
			const result = LetterSpacing.parse("0.1em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "letter-spacing",
					value: { value: 0.1, unit: "em" },
				});
			}
		});

		it("should parse '2px'", () => {
			const result = LetterSpacing.parse("2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "letter-spacing",
					value: { value: 2, unit: "px" },
				});
			}
		});

		it("should parse negative value '-1px'", () => {
			const result = LetterSpacing.parse("-1px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "letter-spacing",
					value: { value: -1, unit: "px" },
				});
			}
		});

		it("should parse '0.05rem'", () => {
			const result = LetterSpacing.parse("0.05rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "letter-spacing",
					value: { value: 0.05, unit: "rem" },
				});
			}
		});
	});

	describe("percentage values", () => {
		it("should parse '10%'", () => {
			const result = LetterSpacing.parse("10%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "letter-spacing",
					value: { value: 10, unit: "%" },
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = LetterSpacing.parse("auto");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid letter-spacing keyword");
			}
		});

		it("should reject empty string", () => {
			const result = LetterSpacing.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = LetterSpacing.parse("2px 4px");
			expect(result.ok).toBe(false);
		});
	});
});
