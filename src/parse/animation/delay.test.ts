// b_path:: src/parse/animation/delay.test.ts
// Auto-generated from scripts/test-generator/configs/delay.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-delay
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/delay";

describe("parse/animation/delay - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse zero delay", () => {
			const result = Parser.parse("0s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 0,
						unit: "s",
					},
				],
			});
		});

		it("should parse seconds", () => {
			const result = Parser.parse("1s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 1,
						unit: "s",
					},
				],
			});
		});

		it("should parse milliseconds", () => {
			const result = Parser.parse("500ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 500,
						unit: "ms",
					},
				],
			});
		});

		it("should parse zero milliseconds", () => {
			const result = Parser.parse("0ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 0,
						unit: "ms",
					},
				],
			});
		});
	});

	describe("valid-decimal", () => {
		it("should parse decimal seconds", () => {
			const result = Parser.parse("0.5s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 0.5,
						unit: "s",
					},
				],
			});
		});

		it("should parse larger decimal", () => {
			const result = Parser.parse("2.5s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 2.5,
						unit: "s",
					},
				],
			});
		});

		it("should parse decimal milliseconds", () => {
			const result = Parser.parse("100.5ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 100.5,
						unit: "ms",
					},
				],
			});
		});
	});

	describe("valid-negative", () => {
		it("should parse negative seconds", () => {
			const result = Parser.parse("-1s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: -1,
						unit: "s",
					},
				],
			});
		});

		it("should parse negative milliseconds", () => {
			const result = Parser.parse("-500ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: -500,
						unit: "ms",
					},
				],
			});
		});

		it("should parse negative decimal", () => {
			const result = Parser.parse("-0.5s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: -0.5,
						unit: "s",
					},
				],
			});
		});
	});

	describe("valid-large", () => {
		it("should parse large value", () => {
			const result = Parser.parse("3600s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 3600,
						unit: "s",
					},
				],
			});
		});

		it("should parse very large milliseconds", () => {
			const result = Parser.parse("999999ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 999999,
						unit: "ms",
					},
				],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple delays", () => {
			const result = Parser.parse("1s, 500ms");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 1,
						unit: "s",
					},
					{
						value: 500,
						unit: "ms",
					},
				],
			});
		});

		it("should parse multiple time values", () => {
			const result = Parser.parse("0s, 1s, 2s, 3s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 0,
						unit: "s",
					},
					{
						value: 1,
						unit: "s",
					},
					{
						value: 2,
						unit: "s",
					},
					{
						value: 3,
						unit: "s",
					},
				],
			});
		});

		it("should parse delays with whitespace", () => {
			const result = Parser.parse("1s , 2s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: 1,
						unit: "s",
					},
					{
						value: 2,
						unit: "s",
					},
				],
			});
		});

		it("should parse mixed negative and positive", () => {
			const result = Parser.parse("-1s, 0s, 1s");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-delay",
				delays: [
					{
						value: -1,
						unit: "s",
					},
					{
						value: 0,
						unit: "s",
					},
					{
						value: 1,
						unit: "s",
					},
				],
			});
		});
	});
});
