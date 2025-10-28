// b_path:: src/core/keywords/word-break-keywords.test.ts
import { describe, expect, it } from "vitest";
import { WORD_BREAK_KEYWORDS, type WordBreakKeyword, wordBreakKeywordsSchema } from "./word-break-keywords";

describe("wordBreakKeywordsSchema", () => {
	it("accepts all valid word-break keywords", () => {
		const keywords: WordBreakKeyword[] = ["normal", "break-all", "keep-all", "break-word"];

		for (const keyword of keywords) {
			expect(wordBreakKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid word-break keywords", () => {
		expect(wordBreakKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(wordBreakKeywordsSchema.safeParse("").success).toBe(false);
		expect(wordBreakKeywordsSchema.safeParse(123).success).toBe(false);
		expect(wordBreakKeywordsSchema.safeParse("wrap").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(WORD_BREAK_KEYWORDS).toHaveLength(4);
		expect(WORD_BREAK_KEYWORDS).toContain("normal");
		expect(WORD_BREAK_KEYWORDS).toContain("break-all");
	});
});
