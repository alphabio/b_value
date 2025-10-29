// b_path:: src/parse/typography/text-align.test.ts
// Auto-generated from scripts/parse-test-generator/configs/typography/text-align.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
// - W3C: https://www.w3.org/TR/css-text-3/#text-align-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/typography/text-align";

describe("parse/typography/text-align - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse left keyword", () => {
			const result = Parser.parse("left");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-align",
				value: "left",
			});
		});

		it("should parse right keyword", () => {
			const result = Parser.parse("right");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-align",
				value: "right",
			});
		});

		it("should parse center keyword", () => {
			const result = Parser.parse("center");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-align",
				value: "center",
			});
		});

		it("should parse justify keyword", () => {
			const result = Parser.parse("justify");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-align",
				value: "justify",
			});
		});
	});

	describe("valid-logical", () => {
		it("should parse start keyword", () => {
			const result = Parser.parse("start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-align",
				value: "start",
			});
		});

		it("should parse end keyword", () => {
			const result = Parser.parse("end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-align",
				value: "end",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase center", () => {
			const result = Parser.parse("CENTER");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "text-align",
				value: "center",
			});
		});
	});
});
