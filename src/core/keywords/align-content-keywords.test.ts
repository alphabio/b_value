// b_path:: src/core/keywords/align-content-keywords.test.ts
import { describe, expect, it } from "vitest";
import { ALIGN_CONTENT_KEYWORDS, type AlignContentKeyword, alignContentKeywordsSchema } from "./align-content-keywords";

describe("alignContentKeywordsSchema", () => {
	it("accepts all valid align-content keywords", () => {
		const keywords: AlignContentKeyword[] = [
			"flex-start",
			"flex-end",
			"center",
			"space-between",
			"space-around",
			"space-evenly",
			"stretch",
			"start",
			"end",
		];

		for (const keyword of keywords) {
			expect(alignContentKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid align-content keywords", () => {
		expect(alignContentKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(alignContentKeywordsSchema.safeParse("").success).toBe(false);
		expect(alignContentKeywordsSchema.safeParse(123).success).toBe(false);
		expect(alignContentKeywordsSchema.safeParse("baseline").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(ALIGN_CONTENT_KEYWORDS).toHaveLength(9);
		expect(ALIGN_CONTENT_KEYWORDS).toContain("flex-start");
		expect(ALIGN_CONTENT_KEYWORDS).toContain("space-evenly");
	});
});
