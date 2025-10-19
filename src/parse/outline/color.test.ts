// b_path:: src/parse/border/color.test.ts
import { describe, expect, it } from "vitest";
import * as OutlineColor from "./color";

describe("Parse.Border.Color", () => {
	describe("valid keywords", () => {
		it("should parse 'invert'", () => {
			const result = OutlineColor.parse("invert");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "invert",
				});
			}
		});

		it("should parse 'transparent'", () => {
			const result = OutlineColor.parse("transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "transparent",
				});
			}
		});

		it("should parse 'currentcolor'", () => {
			const result = OutlineColor.parse("currentcolor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "currentcolor",
				});
			}
		});

		it("should parse 'red'", () => {
			const result = OutlineColor.parse("red");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "red",
				});
			}
		});

		it("should parse 'blue'", () => {
			const result = OutlineColor.parse("blue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "blue",
				});
			}
		});

		it("should parse 'green'", () => {
			const result = OutlineColor.parse("green");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "green",
				});
			}
		});

		it("should parse 'black'", () => {
			const result = OutlineColor.parse("black");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "black",
				});
			}
		});

		it("should parse 'white'", () => {
			const result = OutlineColor.parse("white");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "outline-color",
					color: "white",
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = OutlineColor.parse("notacolor");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("color keyword");
			}
		});

		it("should reject length values", () => {
			const result = OutlineColor.parse("1px");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = OutlineColor.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = OutlineColor.parse("red blue");
			expect(result.ok).toBe(false);
		});
	});
});
