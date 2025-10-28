// b_path:: src/core/keywords/justify-items-keywords.test.ts
import { describe, expect, it } from "vitest";
import { JUSTIFY_ITEMS_KEYWORDS, type JustifyItemsKeyword, justifyItemsKeywordsSchema } from "./justify-items-keywords";

describe("justifyItemsKeywordsSchema", () => {
	it("accepts all valid justify-items keywords", () => {
		const keywords: JustifyItemsKeyword[] = [
			"start",
			"end",
			"center",
			"stretch",
			"baseline",
			"flex-start",
			"flex-end",
			"self-start",
			"self-end",
			"left",
			"right",
		];

		for (const keyword of keywords) {
			expect(justifyItemsKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid justify-items keywords", () => {
		expect(justifyItemsKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(justifyItemsKeywordsSchema.safeParse("").success).toBe(false);
		expect(justifyItemsKeywordsSchema.safeParse(123).success).toBe(false);
		expect(justifyItemsKeywordsSchema.safeParse("space-between").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(JUSTIFY_ITEMS_KEYWORDS).toHaveLength(11);
		expect(JUSTIFY_ITEMS_KEYWORDS).toContain("center");
		expect(JUSTIFY_ITEMS_KEYWORDS).toContain("self-end");
	});
});
