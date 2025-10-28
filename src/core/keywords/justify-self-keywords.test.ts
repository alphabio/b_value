// b_path:: src/core/keywords/justify-self-keywords.test.ts
import { describe, expect, it } from "vitest";
import { JUSTIFY_SELF_KEYWORDS, type JustifySelfKeyword, justifySelfKeywordsSchema } from "./justify-self-keywords";

describe("justifySelfKeywordsSchema", () => {
	it("accepts all valid justify-self keywords", () => {
		const keywords: JustifySelfKeyword[] = [
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
			"left",
			"right",
		];

		for (const keyword of keywords) {
			expect(justifySelfKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid justify-self keywords", () => {
		expect(justifySelfKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(justifySelfKeywordsSchema.safeParse("").success).toBe(false);
		expect(justifySelfKeywordsSchema.safeParse(123).success).toBe(false);
		expect(justifySelfKeywordsSchema.safeParse("space-between").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(JUSTIFY_SELF_KEYWORDS).toHaveLength(12);
		expect(JUSTIFY_SELF_KEYWORDS).toContain("auto");
		expect(JUSTIFY_SELF_KEYWORDS).toContain("right");
	});
});
