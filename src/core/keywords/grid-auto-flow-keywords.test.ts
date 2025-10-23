import { describe, expect, it } from "vitest";
import {
	GRID_AUTO_FLOW_KEYWORDS,
	type GridAutoFlowKeyword,
	type GridAutoFlowKeywordOptions,
	gridAutoFlowKeywordOptions,
	gridAutoFlowKeywordsSchema,
} from "./grid-auto-flow-keywords";

describe("gridAutoFlowKeywordsSchema", () => {
	it("accepts all valid grid-auto-flow keywords", () => {
		const keywords: GridAutoFlowKeyword[] = ["row", "column", "dense", "row dense", "column dense"];

		for (const keyword of keywords) {
			expect(gridAutoFlowKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid grid-auto-flow keywords", () => {
		expect(gridAutoFlowKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(gridAutoFlowKeywordsSchema.safeParse("").success).toBe(false);
		expect(gridAutoFlowKeywordsSchema.safeParse(123).success).toBe(false);
		expect(gridAutoFlowKeywordsSchema.safeParse("dense row").success).toBe(false);
	});

	it("accepts row keyword", () => {
		expect(gridAutoFlowKeywordsSchema.safeParse("row").success).toBe(true);
	});

	it("accepts column keyword", () => {
		expect(gridAutoFlowKeywordsSchema.safeParse("column").success).toBe(true);
	});

	it("accepts dense packing keywords", () => {
		expect(gridAutoFlowKeywordsSchema.safeParse("dense").success).toBe(true);
		expect(gridAutoFlowKeywordsSchema.safeParse("row dense").success).toBe(true);
		expect(gridAutoFlowKeywordsSchema.safeParse("column dense").success).toBe(true);
	});
});

describe("GRID_AUTO_FLOW_KEYWORDS", () => {
	it("contains exactly 5 keywords", () => {
		expect(GRID_AUTO_FLOW_KEYWORDS).toHaveLength(5);
	});

	it("contains all valid grid-auto-flow keywords", () => {
		expect(GRID_AUTO_FLOW_KEYWORDS).toContain("row");
		expect(GRID_AUTO_FLOW_KEYWORDS).toContain("column");
		expect(GRID_AUTO_FLOW_KEYWORDS).toContain("dense");
		expect(GRID_AUTO_FLOW_KEYWORDS).toContain("row dense");
		expect(GRID_AUTO_FLOW_KEYWORDS).toContain("column dense");
	});
});

describe("gridAutoFlowKeywordOptions", () => {
	it("contains metadata for all keywords", () => {
		expect(gridAutoFlowKeywordOptions).toHaveLength(5);
		expect(gridAutoFlowKeywordOptions[0]).toHaveProperty("value");
		expect(gridAutoFlowKeywordOptions[0]).toHaveProperty("description");
	});

	it("has descriptions for all keywords", () => {
		for (const option of gridAutoFlowKeywordOptions) {
			expect(option.description).toBeTruthy();
			expect(typeof option.description).toBe("string");
		}
	});

	it("describes dense packing", () => {
		const denseOption = gridAutoFlowKeywordOptions.find((opt) => opt.value === "dense");
		expect(denseOption).toBeDefined();
		expect(denseOption?.description).toContain("dense packing");
	});
});

describe("GridAutoFlowKeywordOptions type", () => {
	it("is correctly typed", () => {
		const options: GridAutoFlowKeywordOptions = gridAutoFlowKeywordOptions;
		expect(options).toBeDefined();
		expect(Array.isArray(options)).toBe(true);
	});
});
