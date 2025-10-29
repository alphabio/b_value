// b_path:: src/parse/layout/box-sizing.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/box-sizing.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
// - W3C: https://www.w3.org/TR/css-sizing-3/#box-sizing
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/box-sizing";

describe("parse/layout/box-sizing - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse content-box keyword", () => {
			const result = Parser.parse("content-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "box-sizing",
				value: "content-box",
			});
		});

		it("should parse border-box keyword", () => {
			const result = Parser.parse("border-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "box-sizing",
				value: "border-box",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase content-box", () => {
			const result = Parser.parse("CONTENT-BOX");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "box-sizing",
				value: "content-box",
			});
		});

		it("should parse mixed case border-box", () => {
			const result = Parser.parse("Border-Box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "box-sizing",
				value: "border-box",
			});
		});
	});
});
