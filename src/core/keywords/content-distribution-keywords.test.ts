import { describe, expect, it } from "vitest";
import {
	CONTENT_DISTRIBUTION_KEYWORDS,
	type ContentDistributionKeyword,
	contentDistributionKeywordOptions,
	contentDistributionKeywordsSchema,
} from "./content-distribution-keywords";

describe("contentDistributionKeywordsSchema", () => {
	it("accepts all valid content distribution keywords", () => {
		const keywords: ContentDistributionKeyword[] = ["space-between", "space-around", "space-evenly", "stretch"];
		for (const keyword of keywords) {
			expect(contentDistributionKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "center", "start", "space-apart", "", 123, null, undefined];
		for (const value of invalid) {
			expect(contentDistributionKeywordsSchema.safeParse(value).success).toBe(false);
		}
	});

	it("exports correct CONTENT_DISTRIBUTION_KEYWORDS array", () => {
		expect(CONTENT_DISTRIBUTION_KEYWORDS).toHaveLength(4);
		expect(CONTENT_DISTRIBUTION_KEYWORDS).toContain("space-between");
		expect(CONTENT_DISTRIBUTION_KEYWORDS).toContain("space-around");
		expect(CONTENT_DISTRIBUTION_KEYWORDS).toContain("space-evenly");
		expect(CONTENT_DISTRIBUTION_KEYWORDS).toContain("stretch");
	});

	it("exports keyword options with descriptions", () => {
		expect(contentDistributionKeywordOptions).toHaveLength(4);
		for (const option of contentDistributionKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("has description for each keyword", () => {
		const spaceBetweenOption = contentDistributionKeywordOptions.find((opt) => opt.value === "space-between");
		expect(spaceBetweenOption?.description).toContain("evenly");

		const stretchOption = contentDistributionKeywordOptions.find((opt) => opt.value === "stretch");
		expect(stretchOption?.description).toContain("fill");
	});
});
