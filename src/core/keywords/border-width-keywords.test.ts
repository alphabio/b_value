// b_path:: src/core/keywords/border-width-keywords.test.ts
import { describe, expect, it } from "vitest";
import {
	BORDER_WIDTH_KEYWORDS,
	type BorderWidthKeyword,
	type BorderWidthKeywordOptions,
	type BorderWidthValue,
	borderWidthKeywordOptions,
	borderWidthKeywordsSchema,
} from "./border-width-keywords";

describe("borderWidthKeywordsSchema", () => {
	it("accepts all valid keywords", () => {
		const keywords: BorderWidthKeyword[] = ["thin", "medium", "thick"];
		for (const keyword of keywords) {
			expect(borderWidthKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "large", "small", ""];
		for (const keyword of invalid) {
			expect(borderWidthKeywordsSchema.safeParse(keyword).success).toBe(false);
		}
	});
});

describe("BORDER_WIDTH_KEYWORDS", () => {
	it("exports all keyword values", () => {
		expect(BORDER_WIDTH_KEYWORDS).toEqual(["thin", "medium", "thick"]);
	});

	it("has correct length", () => {
		expect(BORDER_WIDTH_KEYWORDS).toHaveLength(3);
	});
});

describe("borderWidthKeywordOptions", () => {
	it("provides metadata for all keywords", () => {
		expect(borderWidthKeywordOptions).toHaveLength(3);
		for (const option of borderWidthKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("matches BORDER_WIDTH_KEYWORDS values", () => {
		const optionValues = borderWidthKeywordOptions.map((opt) => opt.value);
		expect(optionValues).toEqual(BORDER_WIDTH_KEYWORDS);
	});
});

describe("Type exports", () => {
	it("exports BorderWidthKeyword type", () => {
		const keyword: BorderWidthKeyword = "medium";
		expect(keyword).toBeDefined();
	});

	it("exports BorderWidthValue type", () => {
		const value1: BorderWidthValue = "thin";
		const value2: BorderWidthValue = { value: 2, unit: "px" };
		expect(value1).toBeDefined();
		expect(value2).toBeDefined();
	});

	it("exports BorderWidthKeywordOptions type", () => {
		const options: BorderWidthKeywordOptions = borderWidthKeywordOptions;
		expect(options).toBeDefined();
	});
});
