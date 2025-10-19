// b_path:: src/parse/outline/width.test.ts
import { describe, expect, it } from "vitest";
import * as OutlineWidth from "./width";

describe("Parse.Outline.Width", () => {
	describe("valid keywords", () => {
		it("should parse 'thin'", () => {
			const result = OutlineWidth.parse("thin");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: "thin",
				});
			}
		});

		it("should parse 'medium'", () => {
			const result = OutlineWidth.parse("medium");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: "medium",
				});
			}
		});

		it("should parse 'thick'", () => {
			const result = OutlineWidth.parse("thick");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: "thick",
				});
			}
		});
	});

	describe("valid lengths", () => {
		it("should parse '0' (unitless zero)", () => {
			const result = OutlineWidth.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: { value: 0, unit: "px" },
				});
			}
		});

		it("should parse '1px'", () => {
			const result = OutlineWidth.parse("1px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: { value: 1, unit: "px" },
				});
			}
		});

		it("should parse '2.5em'", () => {
			const result = OutlineWidth.parse("2.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: { value: 2.5, unit: "em" },
				});
			}
		});

		it("should parse '0.5rem'", () => {
			const result = OutlineWidth.parse("0.5rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: { value: 0.5, unit: "rem" },
				});
			}
		});

		it("should parse '10pt'", () => {
			const result = OutlineWidth.parse("10pt");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-width",
					width: { value: 10, unit: "pt" },
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject negative values", () => {
			const result = OutlineWidth.parse("-1px");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("non-negative");
			}
		});

		it("should reject invalid keywords", () => {
			const result = OutlineWidth.parse("large");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("keyword");
			}
		});

		it("should reject unitless non-zero", () => {
			const result = OutlineWidth.parse("5");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unitless");
			}
		});

		it("should reject percentage values", () => {
			const result = OutlineWidth.parse("50%");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = OutlineWidth.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = OutlineWidth.parse("1px 2px");
			expect(result.ok).toBe(false);
		});
	});
});
