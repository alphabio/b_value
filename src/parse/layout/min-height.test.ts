// b_path:: src/parse/layout/min-height.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./min-height";

describe("Parse.Layout.MinHeight", () => {
	describe("auto keyword", () => {
		it("parses 'auto'", () => {
			const result = parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: "auto",
				});
			}
		});
	});

	describe("intrinsic sizing keywords", () => {
		it("parses 'min-content'", () => {
			const result = parse("min-content");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: "min-content",
				});
			}
		});

		it("parses 'max-content'", () => {
			const result = parse("max-content");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: "max-content",
				});
			}
		});

		it("parses 'fit-content'", () => {
			const result = parse("fit-content");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: "fit-content",
				});
			}
		});
	});

	describe("length values", () => {
		it("parses px", () => {
			const result = parse("50px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: { value: 50, unit: "px" },
				});
			}
		});

		it("parses em", () => {
			const result = parse("2em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: { value: 2, unit: "em" },
				});
			}
		});

		it("parses vh", () => {
			const result = parse("100vh");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: { value: 100, unit: "vh" },
				});
			}
		});

		it("parses unitless 0", () => {
			const result = parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 0, unit: "px" });
			}
		});
	});

	describe("percentage values", () => {
		it("parses percentage", () => {
			const result = parse("30%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "min-height",
					value: { value: 30, unit: "%" },
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
			const result = parse("50px 25px");
			expect(result.ok).toBe(false);
		});

		it("rejects unitless non-zero number", () => {
			const result = parse("50");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("require a unit");
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
				expect(result.error).toContain("Failed to parse min-height");
			}
		});
	});
});
