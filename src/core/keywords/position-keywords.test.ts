import { describe, expect, it } from "vitest";
import { POSITION_KEYWORDS, positionKeywordsSchema } from "./position-keywords";

describe("positionKeywordsSchema", () => {
	it("accepts all valid position keywords", () => {
		for (const keyword of POSITION_KEYWORDS) {
			expect(positionKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("accepts center", () => {
		expect(positionKeywordsSchema.safeParse("center").success).toBe(true);
	});

	it("accepts left", () => {
		expect(positionKeywordsSchema.safeParse("left").success).toBe(true);
	});

	it("accepts right", () => {
		expect(positionKeywordsSchema.safeParse("right").success).toBe(true);
	});

	it("accepts top", () => {
		expect(positionKeywordsSchema.safeParse("top").success).toBe(true);
	});

	it("accepts bottom", () => {
		expect(positionKeywordsSchema.safeParse("bottom").success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		expect(positionKeywordsSchema.safeParse("middle").success).toBe(false);
	});

	it("rejects empty string", () => {
		expect(positionKeywordsSchema.safeParse("").success).toBe(false);
	});
});

describe("POSITION_KEYWORDS array", () => {
	it("contains expected number of keywords", () => {
		expect(POSITION_KEYWORDS.length).toBe(5);
	});

	it("contains all position keywords", () => {
		expect(POSITION_KEYWORDS).toContain("center");
		expect(POSITION_KEYWORDS).toContain("left");
		expect(POSITION_KEYWORDS).toContain("right");
		expect(POSITION_KEYWORDS).toContain("top");
		expect(POSITION_KEYWORDS).toContain("bottom");
	});
});
