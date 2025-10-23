import { describe, expect, it } from "vitest";
import { VISIBILITY_KEYWORDS, type VisibilityKeyword, visibilityKeywordsSchema } from "./visibility-keywords";

describe("visibilityKeywordsSchema", () => {
	it("accepts all valid visibility keywords", () => {
		const keywords: VisibilityKeyword[] = ["visible", "hidden", "collapse"];

		for (const keyword of keywords) {
			expect(visibilityKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid visibility keywords", () => {
		expect(visibilityKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(visibilityKeywordsSchema.safeParse("").success).toBe(false);
		expect(visibilityKeywordsSchema.safeParse(123).success).toBe(false);
		expect(visibilityKeywordsSchema.safeParse("none").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(VISIBILITY_KEYWORDS).toHaveLength(3);
		expect(VISIBILITY_KEYWORDS).toContain("visible");
		expect(VISIBILITY_KEYWORDS).toContain("hidden");
		expect(VISIBILITY_KEYWORDS).toContain("collapse");
	});
});
