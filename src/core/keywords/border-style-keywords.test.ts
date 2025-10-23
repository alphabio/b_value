import { describe, expect, it } from "vitest";
import {
	BORDER_STYLE_KEYWORDS,
	type BorderStyleKeyword,
	borderStyleKeywordOptions,
	borderStyleKeywordsSchema,
} from "./border-style-keywords";

describe("borderStyleKeywordsSchema", () => {
	it("accepts all valid border-style keywords", () => {
		const keywords: BorderStyleKeyword[] = [
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
			expect(borderStyleKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "auto", "wavy", "", 123, null, undefined];
		for (const value of invalid) {
			expect(borderStyleKeywordsSchema.safeParse(value).success).toBe(false);
		}
	});

	it("exports correct BORDER_STYLE_KEYWORDS array", () => {
		expect(BORDER_STYLE_KEYWORDS).toHaveLength(10);
		expect(BORDER_STYLE_KEYWORDS).toContain("solid");
		expect(BORDER_STYLE_KEYWORDS).toContain("none");
		expect(BORDER_STYLE_KEYWORDS).toContain("hidden");
		expect(BORDER_STYLE_KEYWORDS).toContain("dotted");
		expect(BORDER_STYLE_KEYWORDS).toContain("dashed");
		expect(BORDER_STYLE_KEYWORDS).toContain("double");
		expect(BORDER_STYLE_KEYWORDS).toContain("groove");
		expect(BORDER_STYLE_KEYWORDS).toContain("ridge");
		expect(BORDER_STYLE_KEYWORDS).toContain("inset");
		expect(BORDER_STYLE_KEYWORDS).toContain("outset");
	});

	it("exports keyword options with descriptions", () => {
		expect(borderStyleKeywordOptions).toHaveLength(10);
		for (const option of borderStyleKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("has description for each keyword", () => {
		const solidOption = borderStyleKeywordOptions.find((opt) => opt.value === "solid");
		expect(solidOption?.description).toContain("solid line");

		const noneOption = borderStyleKeywordOptions.find((opt) => opt.value === "none");
		expect(noneOption?.description).toContain("No border");
	});
});
