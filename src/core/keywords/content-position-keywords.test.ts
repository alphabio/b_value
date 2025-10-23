import { describe, expect, it } from "vitest";
import {
	CONTENT_POSITION_KEYWORDS,
	type ContentPositionKeyword,
	contentPositionKeywordOptions,
	contentPositionKeywordsSchema,
} from "./content-position-keywords";

describe("contentPositionKeywordsSchema", () => {
	it("accepts all valid content position keywords", () => {
		const keywords: ContentPositionKeyword[] = ["center", "start", "end", "flex-start", "flex-end"];
		for (const keyword of keywords) {
			expect(contentPositionKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "left", "right", "space-between", "stretch", "", 123, null, undefined];
		for (const value of invalid) {
			expect(contentPositionKeywordsSchema.safeParse(value).success).toBe(false);
		}
	});

	it("exports correct CONTENT_POSITION_KEYWORDS array", () => {
		expect(CONTENT_POSITION_KEYWORDS).toHaveLength(5);
		expect(CONTENT_POSITION_KEYWORDS).toContain("center");
		expect(CONTENT_POSITION_KEYWORDS).toContain("start");
		expect(CONTENT_POSITION_KEYWORDS).toContain("end");
		expect(CONTENT_POSITION_KEYWORDS).toContain("flex-start");
		expect(CONTENT_POSITION_KEYWORDS).toContain("flex-end");
	});

	it("exports keyword options with descriptions", () => {
		expect(contentPositionKeywordOptions).toHaveLength(5);
		for (const option of contentPositionKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("has description for each keyword", () => {
		const centerOption = contentPositionKeywordOptions.find((opt) => opt.value === "center");
		expect(centerOption?.description).toContain("center");

		const startOption = contentPositionKeywordOptions.find((opt) => opt.value === "start");
		expect(startOption?.description).toContain("start");
	});
});
