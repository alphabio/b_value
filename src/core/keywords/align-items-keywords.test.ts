// b_path:: src/core/keywords/align-items-keywords.test.ts
import { describe, expect, it } from "vitest";
import { ALIGN_ITEMS_KEYWORDS, type AlignItemsKeyword, alignItemsKeywordsSchema } from "./align-items-keywords";

describe("alignItemsKeywordsSchema", () => {
	it("accepts all valid align-items keywords", () => {
		const keywords: AlignItemsKeyword[] = [
			"flex-start",
			"flex-end",
			"center",
			"baseline",
			"stretch",
			"start",
			"end",
			"self-start",
			"self-end",
		];

		for (const keyword of keywords) {
			expect(alignItemsKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid align-items keywords", () => {
		expect(alignItemsKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(alignItemsKeywordsSchema.safeParse("").success).toBe(false);
		expect(alignItemsKeywordsSchema.safeParse(123).success).toBe(false);
		expect(alignItemsKeywordsSchema.safeParse("space-between").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(ALIGN_ITEMS_KEYWORDS).toHaveLength(9);
		expect(ALIGN_ITEMS_KEYWORDS).toContain("flex-start");
		expect(ALIGN_ITEMS_KEYWORDS).toContain("self-end");
	});
});
