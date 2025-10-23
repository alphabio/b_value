import { describe, expect, it } from "vitest";
import {
	geometryBoxKeywords,
	geometryBoxKeywordsSchema,
	shapeBoxKeywords,
	shapeBoxKeywordsSchema,
	visualBoxKeywords,
	visualBoxKeywordsSchema,
} from "./geometry-box";

describe("visual box keywords", () => {
	it("exports keywords array", () => {
		expect(visualBoxKeywords).toEqual(["content-box", "padding-box", "border-box"]);
	});

	it("validates 'content-box'", () => {
		const result = visualBoxKeywordsSchema.safeParse("content-box");
		expect(result.success).toBe(true);
	});

	it("validates 'padding-box'", () => {
		const result = visualBoxKeywordsSchema.safeParse("padding-box");
		expect(result.success).toBe(true);
	});

	it("validates 'border-box'", () => {
		const result = visualBoxKeywordsSchema.safeParse("border-box");
		expect(result.success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		const result = visualBoxKeywordsSchema.safeParse("margin-box");
		expect(result.success).toBe(false);
	});
});

describe("shape box keywords", () => {
	it("exports keywords array with margin-box", () => {
		expect(shapeBoxKeywords).toEqual(["content-box", "padding-box", "border-box", "margin-box"]);
	});

	it("validates 'margin-box'", () => {
		const result = shapeBoxKeywordsSchema.safeParse("margin-box");
		expect(result.success).toBe(true);
	});

	it("validates visual box keywords", () => {
		const result = shapeBoxKeywordsSchema.safeParse("content-box");
		expect(result.success).toBe(true);
	});
});

describe("geometry box keywords", () => {
	it("exports keywords array with SVG keywords", () => {
		expect(geometryBoxKeywords).toEqual([
			"content-box",
			"padding-box",
			"border-box",
			"margin-box",
			"fill-box",
			"stroke-box",
			"view-box",
		]);
	});

	it("validates 'fill-box'", () => {
		const result = geometryBoxKeywordsSchema.safeParse("fill-box");
		expect(result.success).toBe(true);
	});

	it("validates 'stroke-box'", () => {
		const result = geometryBoxKeywordsSchema.safeParse("stroke-box");
		expect(result.success).toBe(true);
	});

	it("validates 'view-box'", () => {
		const result = geometryBoxKeywordsSchema.safeParse("view-box");
		expect(result.success).toBe(true);
	});

	it("validates all visual and shape keywords", () => {
		const result = geometryBoxKeywordsSchema.safeParse("margin-box");
		expect(result.success).toBe(true);
	});

	it("rejects invalid keyword", () => {
		const result = geometryBoxKeywordsSchema.safeParse("invalid-box");
		expect(result.success).toBe(false);
	});
});
