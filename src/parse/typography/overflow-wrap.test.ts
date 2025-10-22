// b_path:: src/parse/typography/overflow-wrap.test.ts
import { describe, expect, it } from "vitest";
import * as OverflowWrap from "./overflow-wrap";

describe("Parse.Typography.OverflowWrap", () => {
	describe("valid keywords", () => {
		it("should parse 'normal'", () => {
			const result = OverflowWrap.parse("normal");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-wrap",
					value: "normal",
				});
			}
		});

		it("should parse 'break-word'", () => {
			const result = OverflowWrap.parse("break-word");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-wrap",
					value: "break-word",
				});
			}
		});

		it("should parse 'anywhere'", () => {
			const result = OverflowWrap.parse("anywhere");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-wrap",
					value: "anywhere",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'BREAK-WORD' (uppercase)", () => {
			const result = OverflowWrap.parse("BREAK-WORD");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("break-word");
			}
		});

		it("should parse 'Anywhere' (mixed case)", () => {
			const result = OverflowWrap.parse("Anywhere");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("anywhere");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = OverflowWrap.parse("break-all");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid overflow-wrap keyword");
			}
		});

		it("should reject numeric value", () => {
			const result = OverflowWrap.parse("12px");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = OverflowWrap.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = OverflowWrap.parse("normal anywhere");
			expect(result.ok).toBe(false);
		});
	});
});
