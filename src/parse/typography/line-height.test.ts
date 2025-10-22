import { describe, expect, it } from "vitest";
import * as LineHeight from "./line-height";

describe("Parse.Typography.LineHeight", () => {
	describe("keyword values", () => {
		it("should parse 'normal'", () => {
			const result = LineHeight.parse("normal");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "line-height",
					value: "normal",
				});
			}
		});
	});

	describe("unitless numbers", () => {
		it("should parse integer", () => {
			const result = LineHeight.parse("1");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(1);
		});

		it("should parse decimal", () => {
			const result = LineHeight.parse("1.5");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(1.5);
		});

		it("should parse small number", () => {
			const result = LineHeight.parse("0.8");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(0.8);
		});

		it("should parse large number", () => {
			const result = LineHeight.parse("2.5");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(2.5);
		});

		it("should parse zero", () => {
			const result = LineHeight.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(0);
		});
	});

	describe("length values", () => {
		it("should parse pixel values", () => {
			const result = LineHeight.parse("20px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse em values", () => {
			const result = LineHeight.parse("1.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 1.5, unit: "em" });
			}
		});

		it("should parse rem values", () => {
			const result = LineHeight.parse("2rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 2, unit: "rem" });
			}
		});
	});

	describe("percentage values", () => {
		it("should parse percentage", () => {
			const result = LineHeight.parse("120%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 120, unit: "%" });
			}
		});

		it("should parse large percentage", () => {
			const result = LineHeight.parse("150%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 150, unit: "%" });
			}
		});
	});

	describe("error cases", () => {
		it("should reject invalid keyword", () => {
			const result = LineHeight.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = LineHeight.parse("1.5 20px");
			expect(result.ok).toBe(false);
		});
	});
});
