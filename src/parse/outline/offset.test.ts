// b_path:: src/parse/outline/offset.test.ts
import { describe, expect, it } from "vitest";
import * as OutlineOffset from "./offset";

describe("Parse.Outline.Offset", () => {
	describe("valid lengths", () => {
		it("should parse '0' (unitless zero)", () => {
			const result = OutlineOffset.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-offset",
					offset: { value: 0, unit: "px" },
				});
			}
		});

		it("should parse '5px'", () => {
			const result = OutlineOffset.parse("5px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-offset",
					offset: { value: 5, unit: "px" },
				});
			}
		});

		it("should parse '2.5em'", () => {
			const result = OutlineOffset.parse("2.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-offset",
					offset: { value: 2.5, unit: "em" },
				});
			}
		});

		it("should parse '0.5rem'", () => {
			const result = OutlineOffset.parse("0.5rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-offset",
					offset: { value: 0.5, unit: "rem" },
				});
			}
		});

		it("should parse '10pt'", () => {
			const result = OutlineOffset.parse("10pt");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-offset",
					offset: { value: 10, unit: "pt" },
				});
			}
		});
	});

	describe("negative values", () => {
		it("should parse '-1px'", () => {
			const result = OutlineOffset.parse("-1px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-offset",
					offset: { value: -1, unit: "px" },
				});
			}
		});

		it("should parse '-2.5em'", () => {
			const result = OutlineOffset.parse("-2.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-offset",
					offset: { value: -2.5, unit: "em" },
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keywords", () => {
			const result = OutlineOffset.parse("auto");
			expect(result.ok).toBe(false);
		});

		it("should reject unitless non-zero", () => {
			const result = OutlineOffset.parse("5");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unitless");
			}
		});

		it("should reject percentage values", () => {
			const result = OutlineOffset.parse("50%");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = OutlineOffset.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = OutlineOffset.parse("1px 2px");
			expect(result.ok).toBe(false);
		});
	});
});
