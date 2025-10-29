// b_path:: src/parse/layout/position.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/position.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
// - W3C: https://www.w3.org/TR/css-position-3/#position-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/position";

describe("parse/layout/position - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse static keyword", () => {
			const result = Parser.parse("static");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "position",
				value: "static",
			});
		});

		it("should parse relative keyword", () => {
			const result = Parser.parse("relative");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "position",
				value: "relative",
			});
		});

		it("should parse absolute keyword", () => {
			const result = Parser.parse("absolute");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "position",
				value: "absolute",
			});
		});

		it("should parse fixed keyword", () => {
			const result = Parser.parse("fixed");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "position",
				value: "fixed",
			});
		});

		it("should parse sticky keyword", () => {
			const result = Parser.parse("sticky");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "position",
				value: "sticky",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase relative", () => {
			const result = Parser.parse("RELATIVE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "position",
				value: "relative",
			});
		});

		it("should parse mixed case absolute", () => {
			const result = Parser.parse("Absolute");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "position",
				value: "absolute",
			});
		});
	});
});
