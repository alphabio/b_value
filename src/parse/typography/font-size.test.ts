// b_path:: src/parse/typography/font-size.test.ts
import { describe, expect, it } from "vitest";
import * as FontSize from "./font-size";

describe("Parse.Typography.FontSize", () => {
	describe("absolute size keywords", () => {
		it("should parse 'xx-small'", () => {
			const result = FontSize.parse("xx-small");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "font-size",
					value: "xx-small",
				});
			}
		});

		it("should parse 'x-small'", () => {
			const result = FontSize.parse("x-small");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("x-small");
		});

		it("should parse 'small'", () => {
			const result = FontSize.parse("small");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("small");
		});

		it("should parse 'medium'", () => {
			const result = FontSize.parse("medium");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("medium");
		});

		it("should parse 'large'", () => {
			const result = FontSize.parse("large");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("large");
		});

		it("should parse 'x-large'", () => {
			const result = FontSize.parse("x-large");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("x-large");
		});

		it("should parse 'xx-large'", () => {
			const result = FontSize.parse("xx-large");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("xx-large");
		});

		it("should parse 'xxx-large'", () => {
			const result = FontSize.parse("xxx-large");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("xxx-large");
		});
	});

	describe("relative size keywords", () => {
		it("should parse 'larger'", () => {
			const result = FontSize.parse("larger");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("larger");
		});

		it("should parse 'smaller'", () => {
			const result = FontSize.parse("smaller");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("smaller");
		});
	});

	describe("length values", () => {
		it("should parse pixel values", () => {
			const result = FontSize.parse("16px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 16, unit: "px" });
			}
		});

		it("should parse em values", () => {
			const result = FontSize.parse("1.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 1.5, unit: "em" });
			}
		});

		it("should parse rem values", () => {
			const result = FontSize.parse("2rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 2, unit: "rem" });
			}
		});
	});

	describe("percentage values", () => {
		it("should parse percentage values", () => {
			const result = FontSize.parse("120%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 120, unit: "%" });
			}
		});
	});

	describe("error cases", () => {
		it("should reject invalid values", () => {
			const result = FontSize.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = FontSize.parse("16px 20px");
			expect(result.ok).toBe(false);
		});

		it("should parse unitless zero", () => {
			const result = FontSize.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 0, unit: "px" });
			}
		});

		it("should reject unitless non-zero", () => {
			const result = FontSize.parse("16");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("require a unit");
			}
		});

		it("should reject invalid value type", () => {
			const result = FontSize.parse("rgb(255, 0, 0)");
			expect(result.ok).toBe(false);
		});

		it("should handle parse exception", () => {
			const result = FontSize.parse("@@@");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Failed to parse font-size");
			}
		});
	});
});
