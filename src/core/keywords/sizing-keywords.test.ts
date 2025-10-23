import { describe, expect, it } from "vitest";
import { SIZING_KEYWORDS, type SizingKeyword, sizingKeywordOptions, sizingKeywordsSchema } from "./sizing-keywords";

describe("sizingKeywordsSchema", () => {
	it("accepts all valid sizing keywords", () => {
		const keywords: SizingKeyword[] = ["cover", "contain"];
		for (const keyword of keywords) {
			expect(sizingKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "fill", "scale", "fit", "auto", "", 123, null, undefined];
		for (const value of invalid) {
			expect(sizingKeywordsSchema.safeParse(value).success).toBe(false);
		}
	});

	it("exports correct SIZING_KEYWORDS array", () => {
		expect(SIZING_KEYWORDS).toHaveLength(2);
		expect(SIZING_KEYWORDS).toContain("cover");
		expect(SIZING_KEYWORDS).toContain("contain");
	});

	it("exports keyword options with descriptions", () => {
		expect(sizingKeywordOptions).toHaveLength(2);
		for (const option of sizingKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("has description for each keyword", () => {
		const coverOption = sizingKeywordOptions.find((opt) => opt.value === "cover");
		expect(coverOption?.description).toContain("cover");

		const containOption = sizingKeywordOptions.find((opt) => opt.value === "contain");
		expect(containOption?.description).toContain("fit");
	});
});
