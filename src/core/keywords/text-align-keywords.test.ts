import { describe, expect, it } from "vitest";
import {
	TEXT_ALIGN_KEYWORDS,
	type TextAlignKeyword,
	type TextAlignKeywordOptions,
	textAlignKeywordOptions,
	textAlignKeywordsSchema,
} from "./text-align-keywords";

describe("textAlignKeywordsSchema", () => {
	it("accepts all valid text-align keywords", () => {
		const keywords: TextAlignKeyword[] = ["left", "right", "center", "justify", "start", "end"];

		for (const keyword of keywords) {
			expect(textAlignKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid text-align keywords", () => {
		expect(textAlignKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(textAlignKeywordsSchema.safeParse("").success).toBe(false);
		expect(textAlignKeywordsSchema.safeParse(123).success).toBe(false);
		expect(textAlignKeywordsSchema.safeParse("middle").success).toBe(false);
	});

	it("accepts basic alignment keywords", () => {
		expect(textAlignKeywordsSchema.safeParse("left").success).toBe(true);
		expect(textAlignKeywordsSchema.safeParse("right").success).toBe(true);
		expect(textAlignKeywordsSchema.safeParse("center").success).toBe(true);
	});

	it("accepts justify keyword", () => {
		expect(textAlignKeywordsSchema.safeParse("justify").success).toBe(true);
	});

	it("accepts logical alignment keywords", () => {
		expect(textAlignKeywordsSchema.safeParse("start").success).toBe(true);
		expect(textAlignKeywordsSchema.safeParse("end").success).toBe(true);
	});
});

describe("TEXT_ALIGN_KEYWORDS", () => {
	it("contains exactly 6 keywords", () => {
		expect(TEXT_ALIGN_KEYWORDS).toHaveLength(6);
	});

	it("contains all valid text-align keywords", () => {
		expect(TEXT_ALIGN_KEYWORDS).toContain("left");
		expect(TEXT_ALIGN_KEYWORDS).toContain("right");
		expect(TEXT_ALIGN_KEYWORDS).toContain("center");
		expect(TEXT_ALIGN_KEYWORDS).toContain("justify");
		expect(TEXT_ALIGN_KEYWORDS).toContain("start");
		expect(TEXT_ALIGN_KEYWORDS).toContain("end");
	});
});

describe("textAlignKeywordOptions", () => {
	it("contains metadata for all keywords", () => {
		expect(textAlignKeywordOptions).toHaveLength(6);
		expect(textAlignKeywordOptions[0]).toHaveProperty("value");
		expect(textAlignKeywordOptions[0]).toHaveProperty("description");
	});

	it("has descriptions for all keywords", () => {
		for (const option of textAlignKeywordOptions) {
			expect(option.description).toBeTruthy();
			expect(typeof option.description).toBe("string");
		}
	});

	it("describes justify behavior", () => {
		const justifyOption = textAlignKeywordOptions.find((opt) => opt.value === "justify");
		expect(justifyOption).toBeDefined();
		if (justifyOption?.description) {
			expect(justifyOption.description.toLowerCase()).toContain("justif");
		}
	});
});

describe("TextAlignKeywordOptions type", () => {
	it("is correctly typed", () => {
		const options: TextAlignKeywordOptions = textAlignKeywordOptions;
		expect(options).toBeDefined();
		expect(Array.isArray(options)).toBe(true);
	});
});
