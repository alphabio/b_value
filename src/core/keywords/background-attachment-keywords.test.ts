import { describe, expect, it } from "vitest";
import {
	BACKGROUND_ATTACHMENT_KEYWORDS,
	type BackgroundAttachmentKeyword,
	type BackgroundAttachmentKeywordOptions,
	backgroundAttachmentKeywordOptions,
	backgroundAttachmentKeywordsSchema,
} from "./background-attachment-keywords";

describe("backgroundAttachmentKeywordsSchema", () => {
	it("accepts all valid keywords", () => {
		const keywords: BackgroundAttachmentKeyword[] = ["scroll", "fixed", "local"];
		for (const keyword of keywords) {
			expect(backgroundAttachmentKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "sticky", "absolute", ""];
		for (const keyword of invalid) {
			expect(backgroundAttachmentKeywordsSchema.safeParse(keyword).success).toBe(false);
		}
	});
});

describe("BACKGROUND_ATTACHMENT_KEYWORDS", () => {
	it("exports all keyword values", () => {
		expect(BACKGROUND_ATTACHMENT_KEYWORDS).toEqual(["scroll", "fixed", "local"]);
	});

	it("has correct length", () => {
		expect(BACKGROUND_ATTACHMENT_KEYWORDS).toHaveLength(3);
	});
});

describe("backgroundAttachmentKeywordOptions", () => {
	it("provides metadata for all keywords", () => {
		expect(backgroundAttachmentKeywordOptions).toHaveLength(3);
		for (const option of backgroundAttachmentKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("matches BACKGROUND_ATTACHMENT_KEYWORDS values", () => {
		const optionValues = backgroundAttachmentKeywordOptions.map((opt) => opt.value);
		expect(optionValues).toEqual(BACKGROUND_ATTACHMENT_KEYWORDS);
	});
});

describe("Type exports", () => {
	it("exports BackgroundAttachmentKeyword type", () => {
		const keyword: BackgroundAttachmentKeyword = "fixed";
		expect(keyword).toBeDefined();
	});

	it("exports BackgroundAttachmentKeywordOptions type", () => {
		const options: BackgroundAttachmentKeywordOptions = backgroundAttachmentKeywordOptions;
		expect(options).toBeDefined();
	});
});
