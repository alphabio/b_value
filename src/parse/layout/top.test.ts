// b_path:: src/parse/layout/top.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./top";

describe("Parse.Layout.Top", () => {
	describe("auto keyword", () => {
		it("parses 'auto'", () => {
			const result = parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: "auto",
				});
			}
		});

		it("parses 'AUTO' (case insensitive)", () => {
			const result = parse("AUTO");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("auto");
			}
		});
	});

	describe("length values", () => {
		it("parses positive px", () => {
			const result = parse("10px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: { value: 10, unit: "px" },
				});
			}
		});

		it("parses negative px", () => {
			const result = parse("-10px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: { value: -10, unit: "px" },
				});
			}
		});

		it("parses zero", () => {
			const result = parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 0, unit: "px" });
			}
		});

		it("parses em", () => {
			const result = parse("2em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: { value: 2, unit: "em" },
				});
			}
		});

		it("parses rem", () => {
			const result = parse("1.5rem");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: { value: 1.5, unit: "rem" },
				});
			}
		});

		it("parses vh", () => {
			const result = parse("50vh");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: { value: 50, unit: "vh" },
				});
			}
		});

		it("parses vw", () => {
			const result = parse("100vw");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: { value: 100, unit: "vw" },
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
					kind: "top",
					value: { value: 50, unit: "%" },
				});
			}
		});

		it("parses negative percentage", () => {
			const result = parse("-25%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
					value: { value: -25, unit: "%" },
				});
			}
		});

		it("parses zero percentage", () => {
			const result = parse("0%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toEqual({ value: 0, unit: "%" });
			}
		});

		it("parses decimal percentage", () => {
			const result = parse("33.33%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "top",
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
			const result = parse("10px 20px");
			expect(result.ok).toBe(false);
		});

		it("rejects invalid unit", () => {
			const result = parse("10xyz");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});
	});
});
