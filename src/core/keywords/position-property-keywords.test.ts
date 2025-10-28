// b_path:: src/core/keywords/position-property-keywords.test.ts
import { describe, expect, it } from "vitest";
import {
	POSITION_PROPERTY_KEYWORDS,
	type PositionPropertyKeyword,
	positionPropertyKeywordsSchema,
} from "./position-property-keywords";

describe("positionPropertyKeywordsSchema", () => {
	it("accepts all valid position keywords", () => {
		const keywords: PositionPropertyKeyword[] = ["static", "relative", "absolute", "fixed", "sticky"];

		for (const keyword of keywords) {
			expect(positionPropertyKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid position keywords", () => {
		expect(positionPropertyKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(positionPropertyKeywordsSchema.safeParse("").success).toBe(false);
		expect(positionPropertyKeywordsSchema.safeParse(123).success).toBe(false);
		expect(positionPropertyKeywordsSchema.safeParse("flex").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(POSITION_PROPERTY_KEYWORDS).toHaveLength(5);
		expect(POSITION_PROPERTY_KEYWORDS).toContain("static");
		expect(POSITION_PROPERTY_KEYWORDS).toContain("sticky");
	});
});
