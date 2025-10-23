import { describe, expect, it } from "vitest";
import { WHITE_SPACE_KEYWORDS, type WhiteSpaceKeyword, whiteSpaceKeywordsSchema } from "./white-space-keywords";

describe("whiteSpaceKeywordsSchema", () => {
	it("accepts all valid white-space keywords", () => {
		const keywords: WhiteSpaceKeyword[] = ["normal", "nowrap", "pre", "pre-wrap", "pre-line", "break-spaces"];

		for (const keyword of keywords) {
			expect(whiteSpaceKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid white-space keywords", () => {
		expect(whiteSpaceKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(whiteSpaceKeywordsSchema.safeParse("").success).toBe(false);
		expect(whiteSpaceKeywordsSchema.safeParse(123).success).toBe(false);
		expect(whiteSpaceKeywordsSchema.safeParse("wrap").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(WHITE_SPACE_KEYWORDS).toHaveLength(6);
		expect(WHITE_SPACE_KEYWORDS).toContain("normal");
		expect(WHITE_SPACE_KEYWORDS).toContain("break-spaces");
	});
});
