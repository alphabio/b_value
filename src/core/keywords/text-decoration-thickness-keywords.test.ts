// b_path:: src/core/keywords/text-decoration-thickness-keywords.test.ts

import { describe, expect, it } from "vitest";
import {
	TEXT_DECORATION_THICKNESS_KEYWORDS,
	type TextDecorationThicknessKeyword,
	textDecorationThicknessKeywordOptions,
	textDecorationThicknessKeywordsSchema,
} from "./text-decoration-thickness-keywords";

describe("textDecorationThicknessKeywordsSchema", () => {
	it("validates auto", () => {
		const result = textDecorationThicknessKeywordsSchema.safeParse("auto");
		expect(result.success).toBe(true);
	});

	it("validates from-font", () => {
		const result = textDecorationThicknessKeywordsSchema.safeParse("from-font");
		expect(result.success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		const result = textDecorationThicknessKeywordsSchema.safeParse("invalid");
		expect(result.success).toBe(false);
	});
});

describe("TEXT_DECORATION_THICKNESS_KEYWORDS", () => {
	it("contains auto", () => {
		expect(TEXT_DECORATION_THICKNESS_KEYWORDS).toContain("auto");
	});

	it("contains from-font", () => {
		expect(TEXT_DECORATION_THICKNESS_KEYWORDS).toContain("from-font");
	});

	it("has correct length", () => {
		expect(TEXT_DECORATION_THICKNESS_KEYWORDS).toHaveLength(2);
	});
});

describe("textDecorationThicknessKeywordOptions", () => {
	it("includes descriptions", () => {
		expect(textDecorationThicknessKeywordOptions.length).toBeGreaterThan(0);
		expect(textDecorationThicknessKeywordOptions[0]).toHaveProperty("value");
		expect(textDecorationThicknessKeywordOptions[0]).toHaveProperty("description");
	});
});

describe("TextDecorationThicknessKeyword type", () => {
	it("accepts valid keywords", () => {
		const keyword1: TextDecorationThicknessKeyword = "auto";
		const keyword2: TextDecorationThicknessKeyword = "from-font";
		expect(keyword1).toBe("auto");
		expect(keyword2).toBe("from-font");
	});
});
