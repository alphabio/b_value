// b_path:: src/core/keywords/text-decoration-line-keywords.test.ts
import { describe, expect, it } from "vitest";
import {
	TEXT_DECORATION_LINE_KEYWORDS,
	type TextDecorationLineKeyword,
	type TextDecorationLineKeywordOptions,
	textDecorationLineKeywordOptions,
	textDecorationLineKeywordsSchema,
} from "./text-decoration-line-keywords";

describe("textDecorationLineKeywordsSchema", () => {
	it("accepts all valid text-decoration-line keywords", () => {
		const keywords: TextDecorationLineKeyword[] = ["none", "underline", "overline", "line-through"];

		for (const keyword of keywords) {
			expect(textDecorationLineKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid text-decoration-line keywords", () => {
		expect(textDecorationLineKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(textDecorationLineKeywordsSchema.safeParse("").success).toBe(false);
		expect(textDecorationLineKeywordsSchema.safeParse(123).success).toBe(false);
		expect(textDecorationLineKeywordsSchema.safeParse("blink").success).toBe(false);
	});

	it("accepts none keyword", () => {
		expect(textDecorationLineKeywordsSchema.safeParse("none").success).toBe(true);
	});

	it("accepts underline keyword", () => {
		expect(textDecorationLineKeywordsSchema.safeParse("underline").success).toBe(true);
	});
});

describe("TEXT_DECORATION_LINE_KEYWORDS", () => {
	it("contains exactly 4 keywords", () => {
		expect(TEXT_DECORATION_LINE_KEYWORDS).toHaveLength(4);
	});

	it("contains all valid text-decoration-line keywords", () => {
		expect(TEXT_DECORATION_LINE_KEYWORDS).toContain("none");
		expect(TEXT_DECORATION_LINE_KEYWORDS).toContain("underline");
		expect(TEXT_DECORATION_LINE_KEYWORDS).toContain("overline");
		expect(TEXT_DECORATION_LINE_KEYWORDS).toContain("line-through");
	});

	it("has unique keywords", () => {
		const uniqueKeywords = [...new Set(TEXT_DECORATION_LINE_KEYWORDS)];
		expect(uniqueKeywords.length).toBe(TEXT_DECORATION_LINE_KEYWORDS.length);
	});
});

describe("textDecorationLineKeywordOptions", () => {
	it("contains metadata for all keywords", () => {
		expect(textDecorationLineKeywordOptions).toHaveLength(4);
		expect(textDecorationLineKeywordOptions[0]).toHaveProperty("value");
		expect(textDecorationLineKeywordOptions[0]).toHaveProperty("description");
	});

	it("has descriptions for all keywords", () => {
		for (const option of textDecorationLineKeywordOptions) {
			expect(option.description).toBeTruthy();
			expect(typeof option.description).toBe("string");
		}
	});

	it("underline has descriptive text", () => {
		const underlineOption = textDecorationLineKeywordOptions.find((opt) => opt.value === "underline");
		expect(underlineOption).toBeDefined();
		expect(underlineOption?.description).toContain("below");
	});

	it("overline has descriptive text", () => {
		const overlineOption = textDecorationLineKeywordOptions.find((opt) => opt.value === "overline");
		expect(overlineOption).toBeDefined();
		expect(overlineOption?.description).toContain("above");
	});
});

describe("TextDecorationLineKeywordOptions type", () => {
	it("is correctly typed", () => {
		const options: TextDecorationLineKeywordOptions = textDecorationLineKeywordOptions;
		expect(options).toBeDefined();
		expect(Array.isArray(options)).toBe(true);
	});
});
