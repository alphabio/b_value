// b_path:: src/parse/layout/overflow-y.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/overflow-y.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
// - W3C: https://www.w3.org/TR/css-overflow-3/#overflow-properties
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/overflow-y";

describe("parse/layout/overflow-y - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse visible keyword", () => {
			const result = Parser.parse("visible");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "overflow-y",
				value: "visible",
			});
		});

		it("should parse hidden keyword", () => {
			const result = Parser.parse("hidden");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "overflow-y",
				value: "hidden",
			});
		});

		it("should parse scroll keyword", () => {
			const result = Parser.parse("scroll");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "overflow-y",
				value: "scroll",
			});
		});

		it("should parse auto keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "overflow-y",
				value: "auto",
			});
		});

		it("should parse clip keyword", () => {
			const result = Parser.parse("clip");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "overflow-y",
				value: "clip",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase hidden", () => {
			const result = Parser.parse("HIDDEN");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "overflow-y",
				value: "hidden",
			});
		});

		it("should parse mixed case scroll", () => {
			const result = Parser.parse("Scroll");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "overflow-y",
				value: "scroll",
			});
		});
	});
});
