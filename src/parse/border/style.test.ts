// b_path:: src/parse/border/style.test.ts
import { describe, expect, it } from "vitest";
import * as BorderStyle from "./style";

describe("Parse.Border.Style", () => {
	describe("valid keywords", () => {
		it("should parse 'none'", () => {
			const result = BorderStyle.parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "none",
				});
			}
		});

		it("should parse 'hidden'", () => {
			const result = BorderStyle.parse("hidden");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "hidden",
				});
			}
		});

		it("should parse 'dotted'", () => {
			const result = BorderStyle.parse("dotted");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "dotted",
				});
			}
		});

		it("should parse 'dashed'", () => {
			const result = BorderStyle.parse("dashed");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "dashed",
				});
			}
		});

		it("should parse 'solid'", () => {
			const result = BorderStyle.parse("solid");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "solid",
				});
			}
		});

		it("should parse 'double'", () => {
			const result = BorderStyle.parse("double");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "double",
				});
			}
		});

		it("should parse 'groove'", () => {
			const result = BorderStyle.parse("groove");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "groove",
				});
			}
		});

		it("should parse 'ridge'", () => {
			const result = BorderStyle.parse("ridge");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "ridge",
				});
			}
		});

		it("should parse 'inset'", () => {
			const result = BorderStyle.parse("inset");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "inset",
				});
			}
		});

		it("should parse 'outset'", () => {
			const result = BorderStyle.parse("outset");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-style",
					style: "outset",
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = BorderStyle.parse("wavy");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("keyword");
			}
		});

		it("should reject length values", () => {
			const result = BorderStyle.parse("1px");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = BorderStyle.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = BorderStyle.parse("solid dashed");
			expect(result.ok).toBe(false);
		});
	});
});
