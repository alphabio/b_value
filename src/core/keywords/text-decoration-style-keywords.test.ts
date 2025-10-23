// b_path:: src/core/keywords/text-decoration-style-keywords.test.ts

import { describe, expect, it } from "vitest";
import {
	TEXT_DECORATION_STYLE_KEYWORDS,
	type TextDecorationStyleKeyword,
	textDecorationStyleKeywordOptions,
	textDecorationStyleKeywordsSchema,
} from "./text-decoration-style-keywords";

describe("textDecorationStyleKeywordsSchema", () => {
	it("validates solid", () => {
		const result = textDecorationStyleKeywordsSchema.safeParse("solid");
		expect(result.success).toBe(true);
	});

	it("validates double", () => {
		const result = textDecorationStyleKeywordsSchema.safeParse("double");
		expect(result.success).toBe(true);
	});

	it("validates dotted", () => {
		const result = textDecorationStyleKeywordsSchema.safeParse("dotted");
		expect(result.success).toBe(true);
	});

	it("validates dashed", () => {
		const result = textDecorationStyleKeywordsSchema.safeParse("dashed");
		expect(result.success).toBe(true);
	});

	it("validates wavy", () => {
		const result = textDecorationStyleKeywordsSchema.safeParse("wavy");
		expect(result.success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		const result = textDecorationStyleKeywordsSchema.safeParse("invalid");
		expect(result.success).toBe(false);
	});
});

describe("TEXT_DECORATION_STYLE_KEYWORDS", () => {
	it("contains all style keywords", () => {
		expect(TEXT_DECORATION_STYLE_KEYWORDS).toContain("solid");
		expect(TEXT_DECORATION_STYLE_KEYWORDS).toContain("double");
		expect(TEXT_DECORATION_STYLE_KEYWORDS).toContain("dotted");
		expect(TEXT_DECORATION_STYLE_KEYWORDS).toContain("dashed");
		expect(TEXT_DECORATION_STYLE_KEYWORDS).toContain("wavy");
	});

	it("has correct length", () => {
		expect(TEXT_DECORATION_STYLE_KEYWORDS).toHaveLength(5);
	});
});

describe("textDecorationStyleKeywordOptions", () => {
	it("includes descriptions", () => {
		expect(textDecorationStyleKeywordOptions.length).toBeGreaterThan(0);
		expect(textDecorationStyleKeywordOptions[0]).toHaveProperty("value");
		expect(textDecorationStyleKeywordOptions[0]).toHaveProperty("description");
	});
});

describe("TextDecorationStyleKeyword type", () => {
	it("accepts valid keywords", () => {
		const keyword: TextDecorationStyleKeyword = "solid";
		expect(keyword).toBe("solid");
	});
});
