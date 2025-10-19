// b_path:: src/parse/border/width.test.ts
import { describe, expect, it } from "vitest";
import * as BorderWidth from "./width";

describe("Parse.Border.Width", () => {
	describe("valid keywords", () => {
		it("should parse 'thin'", () => {
			const result = BorderWidth.parse("thin");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: "thin",
				});
			}
		});

		it("should parse 'medium'", () => {
			const result = BorderWidth.parse("medium");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: "medium",
				});
			}
		});

		it("should parse 'thick'", () => {
			const result = BorderWidth.parse("thick");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: "thick",
				});
			}
		});
	});

	describe("valid lengths", () => {
		it("should parse '0' (unitless zero)", () => {
			const result = BorderWidth.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: { value: 0, unit: "px" },
				});
			}
		});

		it("should parse '1px'", () => {
			const result = BorderWidth.parse("1px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: { value: 1, unit: "px" },
				});
			}
		});

		it("should parse '2.5em'", () => {
			const result = BorderWidth.parse("2.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: { value: 2.5, unit: "em" },
				});
			}
		});

		it("should parse '0.5rem'", () => {
			const result = BorderWidth.parse("0.5rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: { value: 0.5, unit: "rem" },
				});
			}
		});

		it("should parse '10pt'", () => {
			const result = BorderWidth.parse("10pt");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-width",
					width: { value: 10, unit: "pt" },
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject negative values", () => {
			const result = BorderWidth.parse("-1px");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("non-negative");
			}
		});

		it("should reject invalid keywords", () => {
			const result = BorderWidth.parse("large");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("keyword");
			}
		});

		it("should reject unitless non-zero", () => {
			const result = BorderWidth.parse("5");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unitless");
			}
		});

		it("should reject percentage values", () => {
			const result = BorderWidth.parse("50%");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = BorderWidth.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = BorderWidth.parse("1px 2px");
			expect(result.ok).toBe(false);
		});
	});
});
