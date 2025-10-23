import { describe, expect, it } from "vitest";
import {
	JUSTIFY_CONTENT_KEYWORDS,
	type JustifyContentKeyword,
	justifyContentKeywordsSchema,
} from "./justify-content-keywords";

describe("justifyContentKeywordsSchema", () => {
	it("accepts all valid justify-content keywords", () => {
		const keywords: JustifyContentKeyword[] = [
			"flex-start",
			"flex-end",
			"center",
			"space-between",
			"space-around",
			"space-evenly",
			"start",
			"end",
			"left",
			"right",
		];

		for (const keyword of keywords) {
			expect(justifyContentKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid justify-content keywords", () => {
		expect(justifyContentKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(justifyContentKeywordsSchema.safeParse("").success).toBe(false);
		expect(justifyContentKeywordsSchema.safeParse(123).success).toBe(false);
		expect(justifyContentKeywordsSchema.safeParse("baseline").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(JUSTIFY_CONTENT_KEYWORDS).toHaveLength(10);
		expect(JUSTIFY_CONTENT_KEYWORDS).toContain("flex-start");
		expect(JUSTIFY_CONTENT_KEYWORDS).toContain("space-evenly");
	});
});
