// b_path:: src/parse/typography/vertical-align.test.ts
import { describe, expect, it } from "vitest";
import * as VerticalAlign from "./vertical-align";

describe("Parse.Typography.VerticalAlign", () => {
	describe("valid keywords", () => {
		it("should parse 'baseline'", () => {
			const result = VerticalAlign.parse("baseline");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "baseline",
				});
			}
		});

		it("should parse 'sub'", () => {
			const result = VerticalAlign.parse("sub");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "sub",
				});
			}
		});

		it("should parse 'super'", () => {
			const result = VerticalAlign.parse("super");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "super",
				});
			}
		});

		it("should parse 'text-top'", () => {
			const result = VerticalAlign.parse("text-top");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "text-top",
				});
			}
		});

		it("should parse 'text-bottom'", () => {
			const result = VerticalAlign.parse("text-bottom");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "text-bottom",
				});
			}
		});

		it("should parse 'middle'", () => {
			const result = VerticalAlign.parse("middle");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "middle",
				});
			}
		});

		it("should parse 'top'", () => {
			const result = VerticalAlign.parse("top");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "top",
				});
			}
		});

		it("should parse 'bottom'", () => {
			const result = VerticalAlign.parse("bottom");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: "bottom",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'MIDDLE' (uppercase)", () => {
			const result = VerticalAlign.parse("MIDDLE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("middle");
			}
		});

		it("should parse 'Baseline' (mixed case)", () => {
			const result = VerticalAlign.parse("Baseline");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("baseline");
			}
		});
	});

	describe("length values", () => {
		it("should parse '5px'", () => {
			const result = VerticalAlign.parse("5px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: { value: 5, unit: "px" },
				});
			}
		});

		it("should parse '0.5em'", () => {
			const result = VerticalAlign.parse("0.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: { value: 0.5, unit: "em" },
				});
			}
		});

		it("should parse negative value '-2px'", () => {
			const result = VerticalAlign.parse("-2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: { value: -2, unit: "px" },
				});
			}
		});
	});

	describe("percentage values", () => {
		it("should parse '50%'", () => {
			const result = VerticalAlign.parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: { value: 50, unit: "%" },
				});
			}
		});

		it("should parse negative percentage '-25%'", () => {
			const result = VerticalAlign.parse("-25%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "vertical-align",
					value: { value: -25, unit: "%" },
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = VerticalAlign.parse("center");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid vertical-align keyword");
			}
		});

		it("should reject empty string", () => {
			const result = VerticalAlign.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = VerticalAlign.parse("middle top");
			expect(result.ok).toBe(false);
		});
	});
});
