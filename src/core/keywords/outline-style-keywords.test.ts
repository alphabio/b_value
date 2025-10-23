import { describe, expect, it } from "vitest";
import {
	OUTLINE_STYLE_KEYWORDS,
	type OutlineStyleKeyword,
	type OutlineStyleKeywordOptions,
	outlineStyleKeywordOptions,
	outlineStyleKeywordsSchema,
} from "./outline-style-keywords";

describe("outlineStyleKeywordsSchema", () => {
	it("accepts all valid outline-style keywords", () => {
		const keywords: OutlineStyleKeyword[] = [
			"auto",
			"none",
			"hidden",
			"dotted",
			"dashed",
			"solid",
			"double",
			"groove",
			"ridge",
			"inset",
			"outset",
		];

		for (const keyword of keywords) {
			expect(outlineStyleKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid outline-style keywords", () => {
		expect(outlineStyleKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(outlineStyleKeywordsSchema.safeParse("").success).toBe(false);
		expect(outlineStyleKeywordsSchema.safeParse(123).success).toBe(false);
	});

	it("includes auto keyword specific to outline-style", () => {
		expect(outlineStyleKeywordsSchema.safeParse("auto").success).toBe(true);
	});
});

describe("OUTLINE_STYLE_KEYWORDS", () => {
	it("contains all valid outline-style keywords", () => {
		expect(OUTLINE_STYLE_KEYWORDS).toHaveLength(11);
		expect(OUTLINE_STYLE_KEYWORDS).toContain("auto");
		expect(OUTLINE_STYLE_KEYWORDS).toContain("none");
		expect(OUTLINE_STYLE_KEYWORDS).toContain("solid");
		expect(OUTLINE_STYLE_KEYWORDS).toContain("double");
	});

	it("has unique keywords", () => {
		const uniqueKeywords = [...new Set(OUTLINE_STYLE_KEYWORDS)];
		expect(uniqueKeywords.length).toBe(OUTLINE_STYLE_KEYWORDS.length);
	});
});

describe("outlineStyleKeywordOptions", () => {
	it("contains metadata for all keywords", () => {
		expect(outlineStyleKeywordOptions).toHaveLength(11);
		expect(outlineStyleKeywordOptions[0]).toHaveProperty("value");
		expect(outlineStyleKeywordOptions[0]).toHaveProperty("description");
	});

	it("has descriptions for all keywords", () => {
		for (const option of outlineStyleKeywordOptions) {
			expect(option.description).toBeTruthy();
			expect(typeof option.description).toBe("string");
		}
	});

	it("auto keyword has browser-specific description", () => {
		const autoOption = outlineStyleKeywordOptions.find((opt) => opt.value === "auto");
		expect(autoOption).toBeDefined();
		expect(autoOption?.description).toContain("browser");
	});
});

describe("OutlineStyleKeywordOptions type", () => {
	it("is correctly typed", () => {
		const options: OutlineStyleKeywordOptions = outlineStyleKeywordOptions;
		expect(options).toBeDefined();
		expect(Array.isArray(options)).toBe(true);
	});
});
