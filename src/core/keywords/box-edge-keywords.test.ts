import { describe, expect, it } from "vitest";
import { BOX_EDGE_KEYWORDS, boxEdgeKeywordsSchema } from "./box-edge-keywords";

describe("boxEdgeKeywordsSchema", () => {
	it("accepts all valid box edge keywords", () => {
		for (const keyword of BOX_EDGE_KEYWORDS) {
			expect(boxEdgeKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("accepts content-box", () => {
		expect(boxEdgeKeywordsSchema.safeParse("content-box").success).toBe(true);
	});

	it("accepts padding-box", () => {
		expect(boxEdgeKeywordsSchema.safeParse("padding-box").success).toBe(true);
	});

	it("accepts border-box", () => {
		expect(boxEdgeKeywordsSchema.safeParse("border-box").success).toBe(true);
	});

	it("accepts margin-box", () => {
		expect(boxEdgeKeywordsSchema.safeParse("margin-box").success).toBe(true);
	});

	it("accepts fill-box", () => {
		expect(boxEdgeKeywordsSchema.safeParse("fill-box").success).toBe(true);
	});

	it("accepts stroke-box", () => {
		expect(boxEdgeKeywordsSchema.safeParse("stroke-box").success).toBe(true);
	});

	it("accepts view-box", () => {
		expect(boxEdgeKeywordsSchema.safeParse("view-box").success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		expect(boxEdgeKeywordsSchema.safeParse("invalid-box").success).toBe(false);
	});

	it("rejects empty string", () => {
		expect(boxEdgeKeywordsSchema.safeParse("").success).toBe(false);
	});
});

describe("BOX_EDGE_KEYWORDS array", () => {
	it("contains expected number of keywords", () => {
		expect(BOX_EDGE_KEYWORDS.length).toBe(7);
	});

	it("contains visual box keywords", () => {
		expect(BOX_EDGE_KEYWORDS).toContain("content-box");
		expect(BOX_EDGE_KEYWORDS).toContain("padding-box");
		expect(BOX_EDGE_KEYWORDS).toContain("border-box");
	});

	it("contains SVG box keywords", () => {
		expect(BOX_EDGE_KEYWORDS).toContain("fill-box");
		expect(BOX_EDGE_KEYWORDS).toContain("stroke-box");
	});
});
