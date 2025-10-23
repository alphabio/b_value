// b_path:: src/core/keywords/flex-direction-keywords.test.ts

import { describe, expect, it } from "vitest";
import {
	FLEX_DIRECTION_KEYWORDS,
	type FlexDirectionKeyword,
	flexDirectionKeywordOptions,
	flexDirectionKeywordsSchema,
} from "./flex-direction-keywords";

describe("flexDirectionKeywordsSchema", () => {
	it("validates row", () => {
		expect(flexDirectionKeywordsSchema.safeParse("row").success).toBe(true);
	});

	it("validates row-reverse", () => {
		expect(flexDirectionKeywordsSchema.safeParse("row-reverse").success).toBe(true);
	});

	it("validates column", () => {
		expect(flexDirectionKeywordsSchema.safeParse("column").success).toBe(true);
	});

	it("validates column-reverse", () => {
		expect(flexDirectionKeywordsSchema.safeParse("column-reverse").success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		expect(flexDirectionKeywordsSchema.safeParse("invalid").success).toBe(false);
	});
});

describe("FLEX_DIRECTION_KEYWORDS", () => {
	it("contains all keywords", () => {
		expect(FLEX_DIRECTION_KEYWORDS).toEqual(["row", "row-reverse", "column", "column-reverse"]);
	});
});

describe("flexDirectionKeywordOptions", () => {
	it("includes descriptions", () => {
		expect(flexDirectionKeywordOptions[0]).toHaveProperty("value");
		expect(flexDirectionKeywordOptions[0]).toHaveProperty("description");
	});
});

describe("FlexDirectionKeyword type", () => {
	it("accepts valid keywords", () => {
		const keyword: FlexDirectionKeyword = "row";
		expect(keyword).toBe("row");
	});
});
