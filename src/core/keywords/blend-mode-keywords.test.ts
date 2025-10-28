// b_path:: src/core/keywords/blend-mode-keywords.test.ts
import { describe, expect, it } from "vitest";
import {
	BLEND_MODE_KEYWORDS,
	type BlendModeKeyword,
	blendModeKeywordOptions,
	blendModeKeywordsSchema,
} from "./blend-mode-keywords";

describe("blendModeKeywordsSchema", () => {
	it("accepts all valid blend mode keywords", () => {
		const keywords: BlendModeKeyword[] = [
			"normal",
			"multiply",
			"screen",
			"overlay",
			"darken",
			"lighten",
			"color-dodge",
			"color-burn",
			"hard-light",
			"soft-light",
			"difference",
			"exclusion",
			"hue",
			"saturation",
			"color",
			"luminosity",
		];
		for (const keyword of keywords) {
			expect(blendModeKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "add", "subtract", "divide", "blend", "", 123, null, undefined];
		for (const value of invalid) {
			expect(blendModeKeywordsSchema.safeParse(value).success).toBe(false);
		}
	});

	it("exports correct BLEND_MODE_KEYWORDS array", () => {
		expect(BLEND_MODE_KEYWORDS).toHaveLength(16);
		expect(BLEND_MODE_KEYWORDS).toContain("normal");
		expect(BLEND_MODE_KEYWORDS).toContain("multiply");
		expect(BLEND_MODE_KEYWORDS).toContain("screen");
		expect(BLEND_MODE_KEYWORDS).toContain("overlay");
	});

	it("exports keyword options with descriptions", () => {
		expect(blendModeKeywordOptions).toHaveLength(16);
		for (const option of blendModeKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("has descriptions for color modes", () => {
		const hueOption = blendModeKeywordOptions.find((opt) => opt.value === "hue");
		expect(hueOption?.description).toContain("hue");

		const saturationOption = blendModeKeywordOptions.find((opt) => opt.value === "saturation");
		expect(saturationOption?.description).toContain("saturation");

		const colorOption = blendModeKeywordOptions.find((opt) => opt.value === "color");
		expect(colorOption?.description).toContain("hue");

		const luminosityOption = blendModeKeywordOptions.find((opt) => opt.value === "luminosity");
		expect(luminosityOption?.description).toContain("luminosity");
	});

	it("has descriptions for mathematical modes", () => {
		const multiplyOption = blendModeKeywordOptions.find((opt) => opt.value === "multiply");
		expect(multiplyOption?.description).toContain("multiply");

		const screenOption = blendModeKeywordOptions.find((opt) => opt.value === "screen");
		expect(screenOption?.description).toContain("invert");
	});

	it("includes all dodge and burn modes", () => {
		expect(BLEND_MODE_KEYWORDS).toContain("color-dodge");
		expect(BLEND_MODE_KEYWORDS).toContain("color-burn");
	});

	it("includes all light modes", () => {
		expect(BLEND_MODE_KEYWORDS).toContain("hard-light");
		expect(BLEND_MODE_KEYWORDS).toContain("soft-light");
	});

	it("includes difference modes", () => {
		expect(BLEND_MODE_KEYWORDS).toContain("difference");
		expect(BLEND_MODE_KEYWORDS).toContain("exclusion");
	});

	it("includes darken and lighten modes", () => {
		expect(BLEND_MODE_KEYWORDS).toContain("darken");
		expect(BLEND_MODE_KEYWORDS).toContain("lighten");
	});
});
