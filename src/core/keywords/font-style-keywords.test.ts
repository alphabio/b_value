// b_path:: src/core/keywords/font-style-keywords.test.ts

import { describe, expect, it } from "vitest";
import {
	FONT_STYLE_KEYWORDS,
	type FontStyleKeyword,
	fontStyleKeywordOptions,
	fontStyleKeywordsSchema,
} from "./font-style-keywords";

describe("fontStyleKeywordsSchema", () => {
	it("validates normal", () => {
		expect(fontStyleKeywordsSchema.safeParse("normal").success).toBe(true);
	});

	it("validates italic", () => {
		expect(fontStyleKeywordsSchema.safeParse("italic").success).toBe(true);
	});

	it("validates oblique", () => {
		expect(fontStyleKeywordsSchema.safeParse("oblique").success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		expect(fontStyleKeywordsSchema.safeParse("invalid").success).toBe(false);
	});
});

describe("FONT_STYLE_KEYWORDS", () => {
	it("contains all keywords", () => {
		expect(FONT_STYLE_KEYWORDS).toEqual(["normal", "italic", "oblique"]);
	});
});

describe("fontStyleKeywordOptions", () => {
	it("includes descriptions", () => {
		expect(fontStyleKeywordOptions[0]).toHaveProperty("value");
		expect(fontStyleKeywordOptions[0]).toHaveProperty("description");
	});
});

describe("FontStyleKeyword type", () => {
	it("accepts valid keywords", () => {
		const keyword: FontStyleKeyword = "italic";
		expect(keyword).toBe("italic");
	});
});
