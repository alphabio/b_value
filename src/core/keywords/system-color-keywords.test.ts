import { describe, expect, it } from "vitest";
import { SYSTEM_COLOR_KEYWORDS, systemColorKeywordsSchema } from "./system-color-keywords";

describe("systemColorKeywordsSchema", () => {
	it("accepts all valid system color keywords", () => {
		for (const keyword of SYSTEM_COLOR_KEYWORDS) {
			expect(systemColorKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keyword", () => {
		expect(systemColorKeywordsSchema.safeParse("InvalidColor").success).toBe(false);
	});

	it("rejects empty string", () => {
		expect(systemColorKeywordsSchema.safeParse("").success).toBe(false);
	});

	it("rejects null", () => {
		expect(systemColorKeywordsSchema.safeParse(null).success).toBe(false);
	});

	it("rejects undefined", () => {
		expect(systemColorKeywordsSchema.safeParse(undefined).success).toBe(false);
	});

	it("rejects number", () => {
		expect(systemColorKeywordsSchema.safeParse(123).success).toBe(false);
	});
});

describe("SYSTEM_COLOR_KEYWORDS array", () => {
	it("contains expected number of keywords", () => {
		expect(SYSTEM_COLOR_KEYWORDS.length).toBe(19);
	});

	it("contains AccentColor", () => {
		expect(SYSTEM_COLOR_KEYWORDS).toContain("AccentColor");
	});

	it("contains Canvas", () => {
		expect(SYSTEM_COLOR_KEYWORDS).toContain("Canvas");
	});

	it("contains HighlightText", () => {
		expect(SYSTEM_COLOR_KEYWORDS).toContain("HighlightText");
	});
});
