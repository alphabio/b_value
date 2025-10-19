// b_path:: src/parse/border/style.test.ts
import { describe, expect, it } from "vitest";
import * as OutlineStyle from "./style";

describe("Parse.Border.Style", () => {
	describe("valid keywords", () => {
		it("should parse 'auto'", () => {
			const result = OutlineStyle.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "auto",
				});
			}
		});

		it("should parse 'none'", () => {
			const result = OutlineStyle.parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "none",
				});
			}
		});

		it("should parse 'hidden'", () => {
			const result = OutlineStyle.parse("hidden");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "hidden",
				});
			}
		});

		it("should parse 'dotted'", () => {
			const result = OutlineStyle.parse("dotted");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "dotted",
				});
			}
		});

		it("should parse 'dashed'", () => {
			const result = OutlineStyle.parse("dashed");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "dashed",
				});
			}
		});

		it("should parse 'solid'", () => {
			const result = OutlineStyle.parse("solid");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "solid",
				});
			}
		});

		it("should parse 'double'", () => {
			const result = OutlineStyle.parse("double");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "double",
				});
			}
		});

		it("should parse 'groove'", () => {
			const result = OutlineStyle.parse("groove");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "groove",
				});
			}
		});

		it("should parse 'ridge'", () => {
			const result = OutlineStyle.parse("ridge");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "ridge",
				});
			}
		});

		it("should parse 'inset'", () => {
			const result = OutlineStyle.parse("inset");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "inset",
				});
			}
		});

		it("should parse 'outset'", () => {
			const result = OutlineStyle.parse("outset");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-style",
					style: "outset",
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = OutlineStyle.parse("wavy");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("keyword");
			}
		});

		it("should reject length values", () => {
			const result = OutlineStyle.parse("1px");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = OutlineStyle.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = OutlineStyle.parse("solid dashed");
			expect(result.ok).toBe(false);
		});
	});
});
