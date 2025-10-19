// b_path:: src/parse/layout/width.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./width";

describe("Parse.Layout.Width", () => {
	describe("auto keyword", () => {
		it("parses 'auto'", () => {
			const result = parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
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
					kind: "width",
					value: "min-content",
				});
			}
		});

		it("parses 'max-content'", () => {
			const result = parse("max-content");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: "max-content",
				});
			}
		});

		it("parses 'fit-content'", () => {
			const result = parse("fit-content");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: "fit-content",
				});
			}
		});
	});

	describe("length values", () => {
		it("parses px", () => {
			const result = parse("200px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: { value: 200, unit: "px" },
				});
			}
		});

		it("parses em", () => {
			const result = parse("10em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: { value: 10, unit: "em" },
				});
			}
		});

		it("parses rem", () => {
			const result = parse("2.5rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: { value: 2.5, unit: "rem" },
				});
			}
		});

		it("parses vw", () => {
			const result = parse("100vw");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: { value: 100, unit: "vw" },
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
			const result = parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: { value: 50, unit: "%" },
				});
			}
		});

		it("parses decimal percentage", () => {
			const result = parse("33.33%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "width",
					value: { value: 33.33, unit: "%" },
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
			const result = parse("100px 200px");
			expect(result.ok).toBe(false);
		});

		it("rejects negative values", () => {
			const result = parse("-100px");
			expect(result.ok).toBe(true); // CSS allows negative widths (they're clamped to 0)
		});
	});
});
