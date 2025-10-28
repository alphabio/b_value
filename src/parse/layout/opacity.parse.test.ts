// b_path:: src/parse/layout/opacity.parse.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/opacity.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
// - W3C: https://www.w3.org/TR/css-color-4/#transparency
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/opacity";

describe("parse/layout/opacity - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse fully transparent", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0,
			});
		});

		it("should parse fully opaque", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 1,
			});
		});

		it("should parse 50% transparent", () => {
			const result = Parser.parse("0.5");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0.5,
			});
		});
	});

	describe("valid-decimal", () => {
		it("should parse 25% transparent", () => {
			const result = Parser.parse("0.25");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0.25,
			});
		});

		it("should parse 75% transparent", () => {
			const result = Parser.parse("0.75");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0.75,
			});
		});

		it("should parse decimal without leading zero", () => {
			const result = Parser.parse(".5");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0.5,
			});
		});
	});

	describe("valid-percentage", () => {
		it("should parse 0% opacity", () => {
			const result = Parser.parse("0%");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0,
			});
		});

		it("should parse 100% opacity", () => {
			const result = Parser.parse("100%");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 1,
			});
		});

		it("should parse 50% opacity", () => {
			const result = Parser.parse("50%");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0.5,
			});
		});

		it("should parse decimal percentage", () => {
			const result = Parser.parse("25.5%");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0.255,
			});
		});
	});

	describe("valid-clamp", () => {
		it("should parse negative clamped to 0", () => {
			const result = Parser.parse("-1");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0,
			});
		});

		it("should parse greater than 1 clamped to 1", () => {
			const result = Parser.parse("2");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 1,
			});
		});

		it("should parse percentage over 100 clamped", () => {
			const result = Parser.parse("150%");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 1,
			});
		});

		it("should parse negative percentage clamped", () => {
			const result = Parser.parse("-50%");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "opacity",
				value: 0,
			});
		});
	});
});
