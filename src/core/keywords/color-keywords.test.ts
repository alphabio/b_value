import { describe, expect, it } from "vitest";
import { SPECIAL_COLOR_KEYWORDS, type SpecialColorKeyword, specialColorKeywordsSchema } from "./color-keywords";

describe("specialColorKeywordsSchema", () => {
	it("accepts all valid special color keywords", () => {
		const keywords: SpecialColorKeyword[] = ["transparent", "currentcolor"];

		for (const keyword of keywords) {
			expect(specialColorKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid special color keywords", () => {
		expect(specialColorKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(specialColorKeywordsSchema.safeParse("").success).toBe(false);
		expect(specialColorKeywordsSchema.safeParse(123).success).toBe(false);
		expect(specialColorKeywordsSchema.safeParse("red").success).toBe(false);
		expect(specialColorKeywordsSchema.safeParse("inherit").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(SPECIAL_COLOR_KEYWORDS).toHaveLength(2);
		expect(SPECIAL_COLOR_KEYWORDS).toContain("transparent");
		expect(SPECIAL_COLOR_KEYWORDS).toContain("currentcolor");
	});
});
