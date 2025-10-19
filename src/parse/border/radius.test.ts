// b_path:: src/parse/border/radius.test.ts
import { describe, expect, it } from "vitest";
import * as BorderRadius from "./radius";

describe("Parse.Border.Radius", () => {
	describe("valid lengths", () => {
		it("should parse '0' (unitless zero)", () => {
			const result = BorderRadius.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 0, unit: "px" },
				});
			}
		});

		it("should parse '5px'", () => {
			const result = BorderRadius.parse("5px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 5, unit: "px" },
				});
			}
		});

		it("should parse '10.5px'", () => {
			const result = BorderRadius.parse("10.5px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 10.5, unit: "px" },
				});
			}
		});

		it("should parse '1em'", () => {
			const result = BorderRadius.parse("1em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 1, unit: "em" },
				});
			}
		});

		it("should parse '2rem'", () => {
			const result = BorderRadius.parse("2rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 2, unit: "rem" },
				});
			}
		});
	});

	describe("valid percentages", () => {
		it("should parse '50%'", () => {
			const result = BorderRadius.parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 50, unit: "%" },
				});
			}
		});

		it("should parse '100%'", () => {
			const result = BorderRadius.parse("100%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 100, unit: "%" },
				});
			}
		});

		it("should parse '25.5%'", () => {
			const result = BorderRadius.parse("25.5%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-radius",
					radius: { value: 25.5, unit: "%" },
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject negative values", () => {
			const result = BorderRadius.parse("-5px");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("non-negative");
			}
		});

		it("should reject keywords", () => {
			const result = BorderRadius.parse("medium");
			expect(result.ok).toBe(false);
		});

		it("should reject unitless non-zero", () => {
			const result = BorderRadius.parse("5");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unitless");
			}
		});

		it("should reject empty string", () => {
			const result = BorderRadius.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = BorderRadius.parse("5px 10px");
			expect(result.ok).toBe(false);
		});
	});
});
