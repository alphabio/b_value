import { describe, expect, it } from "vitest";
import { CORNER_SHAPE_KEYWORDS, type CornerShapeKeyword, cornerShapeKeywordsSchema } from "./corner-shape-keywords";

describe("cornerShapeKeywordsSchema", () => {
	it("accepts all valid corner-shape keywords", () => {
		const keywords: CornerShapeKeyword[] = ["round", "scoop", "bevel", "notch", "square", "squircle"];

		for (const keyword of keywords) {
			expect(cornerShapeKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid corner-shape keywords", () => {
		expect(cornerShapeKeywordsSchema.safeParse("invalid").success).toBe(false);
		expect(cornerShapeKeywordsSchema.safeParse("").success).toBe(false);
		expect(cornerShapeKeywordsSchema.safeParse(123).success).toBe(false);
		expect(cornerShapeKeywordsSchema.safeParse("circle").success).toBe(false);
	});

	it("exports complete keyword array", () => {
		expect(CORNER_SHAPE_KEYWORDS).toHaveLength(6);
		expect(CORNER_SHAPE_KEYWORDS).toContain("round");
		expect(CORNER_SHAPE_KEYWORDS).toContain("squircle");
	});
});
