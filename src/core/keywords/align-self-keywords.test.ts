// b_path:: src/core/keywords/align-self-keywords.test.ts
import { describe, expect, it } from "vitest";
import { ALIGN_SELF_KEYWORDS, type AlignSelfKeyword, alignSelfKeywordsSchema } from "./align-self-keywords";

describe("alignSelfKeywordsSchema", () => {
	it("accepts all valid align-self keywords", () => {
		const keywords: AlignSelfKeyword[] = [
			"auto",
			"start",
			"end",
			"center",
			"stretch",
			"baseline",
			"flex-start",
			"flex-end",
			"self-start",
			"self-end",
		];

		for (const keyword of keywords) {
			expect(alignSelfKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid align-self keywords", () => {
		expect(alignSelfKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(alignSelfKeywordsSchema.safeParse("").success).toBe(false);
		expect(alignSelfKeywordsSchema.safeParse(123).success).toBe(false);
		expect(alignSelfKeywordsSchema.safeParse("space-between").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(ALIGN_SELF_KEYWORDS).toHaveLength(10);
		expect(ALIGN_SELF_KEYWORDS).toContain("auto");
		expect(ALIGN_SELF_KEYWORDS).toContain("self-end");
	});
});
