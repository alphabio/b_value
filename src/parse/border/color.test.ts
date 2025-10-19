// b_path:: src/parse/border/color.test.ts
import { describe, expect, it } from "vitest";
import * as BorderColor from "./color";

describe("Parse.Border.Color", () => {
	describe("valid keywords", () => {
		it("should parse 'transparent'", () => {
			const result = BorderColor.parse("transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-color",
					color: "transparent",
				});
			}
		});

		it("should parse 'currentcolor'", () => {
			const result = BorderColor.parse("currentcolor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-color",
					color: "currentcolor",
				});
			}
		});

		it("should parse 'red'", () => {
			const result = BorderColor.parse("red");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-color",
					color: "red",
				});
			}
		});

		it("should parse 'blue'", () => {
			const result = BorderColor.parse("blue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-color",
					color: "blue",
				});
			}
		});

		it("should parse 'green'", () => {
			const result = BorderColor.parse("green");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-color",
					color: "green",
				});
			}
		});

		it("should parse 'black'", () => {
			const result = BorderColor.parse("black");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-color",
					color: "black",
				});
			}
		});

		it("should parse 'white'", () => {
			const result = BorderColor.parse("white");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "border-color",
					color: "white",
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = BorderColor.parse("notacolor");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("color keyword");
			}
		});

		it("should reject length values", () => {
			const result = BorderColor.parse("1px");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = BorderColor.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = BorderColor.parse("red blue");
			expect(result.ok).toBe(false);
		});
	});
});
