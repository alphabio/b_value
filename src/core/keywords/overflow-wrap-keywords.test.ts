import { describe, expect, it } from "vitest";
import {
	OVERFLOW_WRAP_KEYWORDS,
	type OverflowWrapKeyword,
	overflowWrapKeywordsMetadata,
	overflowWrapKeywordsSchema,
} from "./overflow-wrap-keywords";

describe("overflowWrapKeywordsSchema", () => {
	it("accepts all valid overflow-wrap keywords", () => {
		const keywords: OverflowWrapKeyword[] = ["normal", "anywhere", "break-word"];

		for (const keyword of keywords) {
			expect(overflowWrapKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid overflow-wrap keywords", () => {
		expect(overflowWrapKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(overflowWrapKeywordsSchema.safeParse("").success).toBe(false);
		expect(overflowWrapKeywordsSchema.safeParse(123).success).toBe(false);
		expect(overflowWrapKeywordsSchema.safeParse("break-all").success).toBe(false);
	});

	it("accepts normal keyword", () => {
		expect(overflowWrapKeywordsSchema.safeParse("normal").success).toBe(true);
	});

	it("accepts anywhere keyword", () => {
		expect(overflowWrapKeywordsSchema.safeParse("anywhere").success).toBe(true);
	});

	it("accepts break-word keyword", () => {
		expect(overflowWrapKeywordsSchema.safeParse("break-word").success).toBe(true);
	});
});

describe("OVERFLOW_WRAP_KEYWORDS", () => {
	it("contains exactly 3 keywords", () => {
		expect(OVERFLOW_WRAP_KEYWORDS).toHaveLength(3);
	});

	it("contains all valid overflow-wrap keywords", () => {
		expect(OVERFLOW_WRAP_KEYWORDS).toContain("normal");
		expect(OVERFLOW_WRAP_KEYWORDS).toContain("anywhere");
		expect(OVERFLOW_WRAP_KEYWORDS).toContain("break-word");
	});
});

describe("overflowWrapKeywordsMetadata", () => {
	it("contains metadata for all keywords", () => {
		expect(overflowWrapKeywordsMetadata.normal).toBeDefined();
		expect(overflowWrapKeywordsMetadata.anywhere).toBeDefined();
		expect(overflowWrapKeywordsMetadata["break-word"]).toBeDefined();
	});

	it("has value and description properties", () => {
		expect(overflowWrapKeywordsMetadata.normal).toHaveProperty("value");
		expect(overflowWrapKeywordsMetadata.normal).toHaveProperty("description");
		expect(overflowWrapKeywordsMetadata.anywhere).toHaveProperty("value");
		expect(overflowWrapKeywordsMetadata.anywhere).toHaveProperty("description");
	});

	it("describes normal break behavior", () => {
		expect(overflowWrapKeywordsMetadata.normal.description).toContain("normal break");
	});

	it("describes anywhere break behavior", () => {
		expect(overflowWrapKeywordsMetadata.anywhere.description.toLowerCase()).toContain("any character");
	});

	it("describes break-word behavior", () => {
		expect(overflowWrapKeywordsMetadata["break-word"].description.toLowerCase()).toContain("anywhere");
	});
});
