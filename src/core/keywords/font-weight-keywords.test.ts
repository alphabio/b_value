// b_path:: src/core/keywords/font-weight-keywords.test.ts

import { describe, expect, it } from "vitest";
import {
	FONT_WEIGHT_KEYWORDS,
	type FontWeightKeyword,
	fontWeightKeywordOptions,
	fontWeightKeywordsSchema,
} from "./font-weight-keywords";

describe("fontWeightKeywordsSchema", () => {
	it("validates normal", () => {
		expect(fontWeightKeywordsSchema.safeParse("normal").success).toBe(true);
	});

	it("validates bold", () => {
		expect(fontWeightKeywordsSchema.safeParse("bold").success).toBe(true);
	});

	it("validates lighter", () => {
		expect(fontWeightKeywordsSchema.safeParse("lighter").success).toBe(true);
	});

	it("validates bolder", () => {
		expect(fontWeightKeywordsSchema.safeParse("bolder").success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		expect(fontWeightKeywordsSchema.safeParse("invalid").success).toBe(false);
	});
});

describe("FONT_WEIGHT_KEYWORDS", () => {
	it("contains all keywords", () => {
		expect(FONT_WEIGHT_KEYWORDS).toEqual(["normal", "bold", "lighter", "bolder"]);
	});
});

describe("fontWeightKeywordOptions", () => {
	it("includes descriptions", () => {
		expect(fontWeightKeywordOptions[0]).toHaveProperty("value");
		expect(fontWeightKeywordOptions[0]).toHaveProperty("description");
	});
});

describe("FontWeightKeyword type", () => {
	it("accepts valid keywords", () => {
		const keyword: FontWeightKeyword = "bold";
		expect(keyword).toBe("bold");
	});
});
