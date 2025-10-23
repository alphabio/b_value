// b_path:: src/core/keywords/vertical-align-keywords.test.ts

import { describe, expect, it } from "vitest";
import {
	VERTICAL_ALIGN_KEYWORDS,
	type VerticalAlignKeyword,
	verticalAlignKeywordOptions,
	verticalAlignKeywordsSchema,
} from "./vertical-align-keywords";

describe("verticalAlignKeywordsSchema", () => {
	it("validates baseline", () => {
		const result = verticalAlignKeywordsSchema.safeParse("baseline");
		expect(result.success).toBe(true);
	});

	it("validates sub", () => {
		const result = verticalAlignKeywordsSchema.safeParse("sub");
		expect(result.success).toBe(true);
	});

	it("validates super", () => {
		const result = verticalAlignKeywordsSchema.safeParse("super");
		expect(result.success).toBe(true);
	});

	it("validates text-top", () => {
		const result = verticalAlignKeywordsSchema.safeParse("text-top");
		expect(result.success).toBe(true);
	});

	it("validates text-bottom", () => {
		const result = verticalAlignKeywordsSchema.safeParse("text-bottom");
		expect(result.success).toBe(true);
	});

	it("validates middle", () => {
		const result = verticalAlignKeywordsSchema.safeParse("middle");
		expect(result.success).toBe(true);
	});

	it("validates top", () => {
		const result = verticalAlignKeywordsSchema.safeParse("top");
		expect(result.success).toBe(true);
	});

	it("validates bottom", () => {
		const result = verticalAlignKeywordsSchema.safeParse("bottom");
		expect(result.success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		const result = verticalAlignKeywordsSchema.safeParse("invalid");
		expect(result.success).toBe(false);
	});
});

describe("VERTICAL_ALIGN_KEYWORDS", () => {
	it("contains all alignment keywords", () => {
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("baseline");
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("sub");
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("super");
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("text-top");
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("text-bottom");
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("middle");
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("top");
		expect(VERTICAL_ALIGN_KEYWORDS).toContain("bottom");
	});

	it("has correct length", () => {
		expect(VERTICAL_ALIGN_KEYWORDS).toHaveLength(8);
	});
});

describe("verticalAlignKeywordOptions", () => {
	it("includes descriptions", () => {
		expect(verticalAlignKeywordOptions.length).toBeGreaterThan(0);
		expect(verticalAlignKeywordOptions[0]).toHaveProperty("value");
		expect(verticalAlignKeywordOptions[0]).toHaveProperty("description");
	});
});

describe("VerticalAlignKeyword type", () => {
	it("accepts valid keywords", () => {
		const keyword: VerticalAlignKeyword = "baseline";
		expect(keyword).toBe("baseline");
	});
});
