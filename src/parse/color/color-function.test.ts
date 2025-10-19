// b_path:: src/parse/color/color-function.test.ts
import { describe, expect, test } from "vitest";
import * as ColorFunction from "./color-function";

describe("parse() - color() function parser", () => {
	describe("Color Spaces", () => {
		test("srgb color space", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "srgb",
					channels: [0.5, 0.2, 0.8],
				});
			}
		});

		test("srgb-linear color space", () => {
			const result = ColorFunction.parse("color(srgb-linear 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "srgb-linear",
					channels: [0.5, 0.2, 0.8],
				});
			}
		});

		test("display-p3 color space", () => {
			const result = ColorFunction.parse("color(display-p3 0.928 0.322 0.203)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "display-p3",
					channels: [0.928, 0.322, 0.203],
				});
			}
		});

		test("a98-rgb color space", () => {
			const result = ColorFunction.parse("color(a98-rgb 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "a98-rgb",
					channels: [0.5, 0.2, 0.8],
				});
			}
		});

		test("prophoto-rgb color space", () => {
			const result = ColorFunction.parse("color(prophoto-rgb 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "prophoto-rgb",
					channels: [0.5, 0.2, 0.8],
				});
			}
		});

		test("rec2020 color space", () => {
			const result = ColorFunction.parse("color(rec2020 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "rec2020",
					channels: [0.5, 0.2, 0.8],
				});
			}
		});

		test("xyz color space", () => {
			const result = ColorFunction.parse("color(xyz 0.3 0.4 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "xyz",
					channels: [0.3, 0.4, 0.5],
				});
			}
		});

		test("xyz-d50 color space", () => {
			const result = ColorFunction.parse("color(xyz-d50 0.3 0.4 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "xyz-d50",
					channels: [0.3, 0.4, 0.5],
				});
			}
		});

		test("xyz-d65 color space", () => {
			const result = ColorFunction.parse("color(xyz-d65 0.3 0.4 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "xyz-d65",
					channels: [0.3, 0.4, 0.5],
				});
			}
		});
	});

	describe("Channel Formats", () => {
		test("numeric channel values", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([0.5, 0.2, 0.8]);
			}
		});

		test("percentage channel values", () => {
			const result = ColorFunction.parse("color(srgb 50% 20% 80%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([0.5, 0.2, 0.8]);
			}
		});

		test("mixed numeric and percentage values", () => {
			const result = ColorFunction.parse("color(srgb 0.5 20% 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([0.5, 0.2, 0.8]);
			}
		});
	});

	describe("Alpha Channel", () => {
		test("color with numeric alpha", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "color",
					colorSpace: "srgb",
					channels: [0.5, 0.2, 0.8],
					alpha: 0.5,
				});
			}
		});

		test("color with percentage alpha", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8 / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.5);
			}
		});

		test("color without alpha", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBeUndefined();
			}
		});
	});

	describe("Edge Cases", () => {
		test("zero values", () => {
			const result = ColorFunction.parse("color(srgb 0 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([0, 0, 0]);
			}
		});

		test("one values", () => {
			const result = ColorFunction.parse("color(srgb 1 1 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([1, 1, 1]);
			}
		});

		test("values with high precision", () => {
			const result = ColorFunction.parse("color(srgb 0.123456 0.789012 0.345678)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([0.123456, 0.789012, 0.345678]);
			}
		});

		test("negative values (allowed for some spaces)", () => {
			const result = ColorFunction.parse("color(xyz -0.1 0.5 -0.2)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([-0.1, 0.5, -0.2]);
			}
		});

		test("values over 1 (allowed for some spaces)", () => {
			const result = ColorFunction.parse("color(xyz 1.5 2.0 1.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([1.5, 2.0, 1.8]);
			}
		});

		test("case insensitive color space", () => {
			const result = ColorFunction.parse("color(SRGB 0.5 0.2 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.colorSpace).toBe("srgb");
			}
		});

		test("extra whitespace", () => {
			const result = ColorFunction.parse("color(  srgb   0.5   0.2   0.8  )");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.channels).toEqual([0.5, 0.2, 0.8]);
			}
		});
	});

	describe("Error Cases", () => {
		test("invalid color space", () => {
			const result = ColorFunction.parse("color(invalid 0.5 0.2 0.8)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid color space");
			}
		});

		test("missing color space", () => {
			const result = ColorFunction.parse("color(0.5 0.2 0.8)");
			expect(result.ok).toBe(false);
		});

		test("missing channels", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("requires at least 4 arguments");
			}
		});

		test("too few channels", () => {
			const result = ColorFunction.parse("color(srgb 0.5)");
			expect(result.ok).toBe(false);
		});

		test("invalid alpha value", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8 / 1.5)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Alpha must be between 0 and 1");
			}
		});

		test("negative alpha", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8 / -0.1)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Alpha must be between 0 and 1");
			}
		});

		test("slash without alpha", () => {
			const result = ColorFunction.parse("color(srgb 0.5 0.2 0.8 /)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected alpha value after /");
			}
		});

		test("not a color function", () => {
			const result = ColorFunction.parse("rgb(255 0 0)");
			expect(result.ok).toBe(false);
		});

		test("empty string", () => {
			const result = ColorFunction.parse("");
			expect(result.ok).toBe(false);
		});

		test("invalid syntax", () => {
			const result = ColorFunction.parse("color(srgb 0.5, 0.2, 0.8)");
			expect(result.ok).toBe(false);
		});
	});
});
