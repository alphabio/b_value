// b_path:: src/parse/layout/right.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./right";

describe("Parse.Layout.Right", () => {
	describe("auto keyword", () => {
		it("parses 'auto'", () => {
			const result = parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: "auto",
				});
			}
		});
	});

	describe("length values", () => {
		it("parses positive px", () => {
			const result = parse("10px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: { value: 10, unit: "px" },
				});
			}
		});

		it("parses negative px", () => {
			const result = parse("-10px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: { value: -10, unit: "px" },
				});
			}
		});

		it("parses em", () => {
			const result = parse("2em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: { value: 2, unit: "em" },
				});
			}
		});

		it("parses rem", () => {
			const result = parse("1.5rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: { value: 1.5, unit: "rem" },
				});
			}
		});
	});

	describe("percentage values", () => {
		it("parses positive percentage", () => {
			const result = parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: { value: 50, unit: "%" },
				});
			}
		});

		it("parses negative percentage", () => {
			const result = parse("-25%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: { value: -25, unit: "%" },
				});
			}
		});
	});

	describe("error cases", () => {
		it("rejects invalid keyword", () => {
			const result = parse("inherit");
			expect(result.ok).toBe(false);
		});

		it("rejects multiple values", () => {
			const result = parse("10px 20px");
			expect(result.ok).toBe(false);
		});

		it("rejects unitless non-zero number", () => {
			const result = parse("10");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("require a unit");
			}
		});

		it("accepts unitless zero", () => {
			const result = parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "right",
					value: { value: 0, unit: "px" },
				});
			}
		});

		it("rejects invalid length type", () => {
			const result = parse("rgb(255, 0, 0)");
			expect(result.ok).toBe(false);
		});

		it("handles parse exception", () => {
			const result = parse("@@@");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Failed to parse right");
			}
		});
	});
});
