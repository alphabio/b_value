// b_path:: src/core/keywords/overflow-keywords.test.ts
import { describe, expect, it } from "vitest";
import {
	OVERFLOW_KEYWORDS,
	type OverflowKeyword,
	type OverflowKeywordOptions,
	overflowKeywordOptions,
	overflowKeywordsSchema,
} from "./overflow-keywords";

describe("overflowKeywordsSchema", () => {
	it("accepts all valid overflow keywords", () => {
		const keywords: OverflowKeyword[] = ["visible", "hidden", "clip", "scroll", "auto"];

		for (const keyword of keywords) {
			expect(overflowKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid overflow keywords", () => {
		expect(overflowKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(overflowKeywordsSchema.safeParse("").success).toBe(false);
		expect(overflowKeywordsSchema.safeParse(123).success).toBe(false);
		expect(overflowKeywordsSchema.safeParse("none").success).toBe(false);
	});

	it("accepts visible keyword", () => {
		expect(overflowKeywordsSchema.safeParse("visible").success).toBe(true);
	});

	it("accepts hidden keyword", () => {
		expect(overflowKeywordsSchema.safeParse("hidden").success).toBe(true);
	});

	it("accepts clip keyword", () => {
		expect(overflowKeywordsSchema.safeParse("clip").success).toBe(true);
	});

	it("accepts scroll and auto keywords", () => {
		expect(overflowKeywordsSchema.safeParse("scroll").success).toBe(true);
		expect(overflowKeywordsSchema.safeParse("auto").success).toBe(true);
	});
});

describe("OVERFLOW_KEYWORDS", () => {
	it("contains exactly 5 keywords", () => {
		expect(OVERFLOW_KEYWORDS).toHaveLength(5);
	});

	it("contains all valid overflow keywords", () => {
		expect(OVERFLOW_KEYWORDS).toContain("visible");
		expect(OVERFLOW_KEYWORDS).toContain("hidden");
		expect(OVERFLOW_KEYWORDS).toContain("clip");
		expect(OVERFLOW_KEYWORDS).toContain("scroll");
		expect(OVERFLOW_KEYWORDS).toContain("auto");
	});
});

describe("overflowKeywordOptions", () => {
	it("contains metadata for all keywords", () => {
		expect(overflowKeywordOptions).toHaveLength(5);
		expect(overflowKeywordOptions[0]).toHaveProperty("value");
		expect(overflowKeywordOptions[0]).toHaveProperty("description");
	});

	it("has descriptions for all keywords", () => {
		for (const option of overflowKeywordOptions) {
			expect(option.description).toBeTruthy();
			expect(typeof option.description).toBe("string");
		}
	});

	it("describes clipping behavior", () => {
		const hiddenOption = overflowKeywordOptions.find((opt) => opt.value === "hidden");
		expect(hiddenOption).toBeDefined();
		if (hiddenOption?.description) {
			expect(hiddenOption.description.toLowerCase()).toContain("clip");
		}
	});

	it("describes scrollbar behavior", () => {
		const scrollOption = overflowKeywordOptions.find((opt) => opt.value === "scroll");
		expect(scrollOption).toBeDefined();
		if (scrollOption?.description) {
			expect(scrollOption.description.toLowerCase()).toContain("scrollbar");
		}
	});
});

describe("OverflowKeywordOptions type", () => {
	it("is correctly typed", () => {
		const options: OverflowKeywordOptions = overflowKeywordOptions;
		expect(options).toBeDefined();
		expect(Array.isArray(options)).toBe(true);
	});
});
