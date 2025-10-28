// b_path:: src/core/keywords/basic-color-keywords.test.ts
import { describe, expect, it } from "vitest";
import { BASIC_NAMED_COLOR_KEYWORDS, basicNamedColorKeywordsSchema } from "./basic-color-keywords";

describe("basicNamedColorKeywordsSchema", () => {
	it("accepts all valid basic color keywords", () => {
		for (const keyword of BASIC_NAMED_COLOR_KEYWORDS) {
			expect(basicNamedColorKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keyword", () => {
		expect(basicNamedColorKeywordsSchema.safeParse("invalidcolor").success).toBe(false);
	});

	it("rejects empty string", () => {
		expect(basicNamedColorKeywordsSchema.safeParse("").success).toBe(false);
	});

	it("rejects null", () => {
		expect(basicNamedColorKeywordsSchema.safeParse(null).success).toBe(false);
	});

	it("rejects undefined", () => {
		expect(basicNamedColorKeywordsSchema.safeParse(undefined).success).toBe(false);
	});

	it("rejects number", () => {
		expect(basicNamedColorKeywordsSchema.safeParse(123).success).toBe(false);
	});
});

describe("BASIC_NAMED_COLOR_KEYWORDS array", () => {
	it("contains expected number of keywords", () => {
		expect(BASIC_NAMED_COLOR_KEYWORDS.length).toBe(22);
	});

	it("contains primary colors", () => {
		expect(BASIC_NAMED_COLOR_KEYWORDS).toContain("black");
		expect(BASIC_NAMED_COLOR_KEYWORDS).toContain("white");
		expect(BASIC_NAMED_COLOR_KEYWORDS).toContain("red");
		expect(BASIC_NAMED_COLOR_KEYWORDS).toContain("green");
		expect(BASIC_NAMED_COLOR_KEYWORDS).toContain("blue");
	});

	it("contains both gray spellings", () => {
		expect(BASIC_NAMED_COLOR_KEYWORDS).toContain("gray");
		expect(BASIC_NAMED_COLOR_KEYWORDS).toContain("grey");
	});
});
