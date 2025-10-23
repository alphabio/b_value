import { describe, expect, it } from "vitest";
import { WIDTH_HEIGHT_KEYWORDS, widthHeightKeywordsSchema } from "./width-height-keywords";

describe("width-height keywords", () => {
	it("exports keywords array", () => {
		expect(WIDTH_HEIGHT_KEYWORDS).toEqual(["min-content", "max-content", "fit-content"]);
	});

	it("validates 'min-content'", () => {
		const result = widthHeightKeywordsSchema.safeParse("min-content");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("min-content");
		}
	});

	it("validates 'max-content'", () => {
		const result = widthHeightKeywordsSchema.safeParse("max-content");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("max-content");
		}
	});

	it("validates 'fit-content'", () => {
		const result = widthHeightKeywordsSchema.safeParse("fit-content");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("fit-content");
		}
	});

	it("rejects invalid keyword", () => {
		const result = widthHeightKeywordsSchema.safeParse("invalid");
		expect(result.success).toBe(false);
	});

	it("rejects empty string", () => {
		const result = widthHeightKeywordsSchema.safeParse("");
		expect(result.success).toBe(false);
	});

	it("is case sensitive", () => {
		const result = widthHeightKeywordsSchema.safeParse("Min-Content");
		expect(result.success).toBe(false);
	});
});
