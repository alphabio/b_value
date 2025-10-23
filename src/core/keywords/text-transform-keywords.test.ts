import { describe, expect, it } from "vitest";
import {
	TEXT_TRANSFORM_KEYWORDS,
	type TextTransformKeyword,
	textTransformKeywordsSchema,
} from "./text-transform-keywords";

describe("textTransformKeywordsSchema", () => {
	it("accepts all valid text-transform keywords", () => {
		const keywords: TextTransformKeyword[] = [
			"none",
			"capitalize",
			"uppercase",
			"lowercase",
			"full-width",
			"full-size-kana",
		];

		for (const keyword of keywords) {
			expect(textTransformKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid text-transform keywords", () => {
		expect(textTransformKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(textTransformKeywordsSchema.safeParse("").success).toBe(false);
		expect(textTransformKeywordsSchema.safeParse(123).success).toBe(false);
		expect(textTransformKeywordsSchema.safeParse("camelCase").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(TEXT_TRANSFORM_KEYWORDS).toHaveLength(6);
		expect(TEXT_TRANSFORM_KEYWORDS).toContain("uppercase");
		expect(TEXT_TRANSFORM_KEYWORDS).toContain("full-width");
	});
});
