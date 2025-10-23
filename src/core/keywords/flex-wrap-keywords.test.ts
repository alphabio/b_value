// b_path:: src/core/keywords/flex-wrap-keywords.test.ts

import { describe, expect, it } from "vitest";
import {
	FLEX_WRAP_KEYWORDS,
	type FlexWrapKeyword,
	flexWrapKeywordOptions,
	flexWrapKeywordsSchema,
} from "./flex-wrap-keywords";

describe("flexWrapKeywordsSchema", () => {
	it("validates nowrap", () => {
		expect(flexWrapKeywordsSchema.safeParse("nowrap").success).toBe(true);
	});

	it("validates wrap", () => {
		expect(flexWrapKeywordsSchema.safeParse("wrap").success).toBe(true);
	});

	it("validates wrap-reverse", () => {
		expect(flexWrapKeywordsSchema.safeParse("wrap-reverse").success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		expect(flexWrapKeywordsSchema.safeParse("invalid").success).toBe(false);
	});
});

describe("FLEX_WRAP_KEYWORDS", () => {
	it("contains all keywords", () => {
		expect(FLEX_WRAP_KEYWORDS).toEqual(["nowrap", "wrap", "wrap-reverse"]);
	});
});

describe("flexWrapKeywordOptions", () => {
	it("includes descriptions", () => {
		expect(flexWrapKeywordOptions[0]).toHaveProperty("value");
		expect(flexWrapKeywordOptions[0]).toHaveProperty("description");
	});
});

describe("FlexWrapKeyword type", () => {
	it("accepts valid keywords", () => {
		const keyword: FlexWrapKeyword = "wrap";
		expect(keyword).toBe("wrap");
	});
});
