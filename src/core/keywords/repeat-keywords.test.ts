// b_path:: src/core/keywords/repeat-keywords.test.ts
import { describe, expect, it } from "vitest";
import { REPEAT_KEYWORDS, repeatKeywordsSchema } from "./repeat-keywords";

describe("repeatKeywordsSchema", () => {
	it("accepts all valid repeat keywords", () => {
		for (const keyword of REPEAT_KEYWORDS) {
			expect(repeatKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("accepts repeat", () => {
		expect(repeatKeywordsSchema.safeParse("repeat").success).toBe(true);
	});

	it("accepts repeat-x", () => {
		expect(repeatKeywordsSchema.safeParse("repeat-x").success).toBe(true);
	});

	it("accepts repeat-y", () => {
		expect(repeatKeywordsSchema.safeParse("repeat-y").success).toBe(true);
	});

	it("accepts no-repeat", () => {
		expect(repeatKeywordsSchema.safeParse("no-repeat").success).toBe(true);
	});

	it("accepts space", () => {
		expect(repeatKeywordsSchema.safeParse("space").success).toBe(true);
	});

	it("accepts round", () => {
		expect(repeatKeywordsSchema.safeParse("round").success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		expect(repeatKeywordsSchema.safeParse("repeat-z").success).toBe(false);
	});

	it("rejects empty string", () => {
		expect(repeatKeywordsSchema.safeParse("").success).toBe(false);
	});
});

describe("REPEAT_KEYWORDS array", () => {
	it("contains expected number of keywords", () => {
		expect(REPEAT_KEYWORDS.length).toBe(6);
	});

	it("contains all repeat keywords", () => {
		expect(REPEAT_KEYWORDS).toContain("repeat");
		expect(REPEAT_KEYWORDS).toContain("repeat-x");
		expect(REPEAT_KEYWORDS).toContain("repeat-y");
		expect(REPEAT_KEYWORDS).toContain("no-repeat");
		expect(REPEAT_KEYWORDS).toContain("space");
		expect(REPEAT_KEYWORDS).toContain("round");
	});
});
