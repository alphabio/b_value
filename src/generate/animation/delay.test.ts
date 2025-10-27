// b_path:: src/generate/animation/delay.test.ts
// Auto-generated from scripts/generate-test-generator/configs/animation/delay.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-delay
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/delay";
import * as Parser from "@/parse/animation/delay";

describe("generate/animation/delay - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate single delay in seconds", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: 1,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate single delay in milliseconds", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: 500,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("500ms");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-edge", () => {
		it("should generate zero delay", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: 0,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-negative", () => {
		it("should generate negative delay", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: -1,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("-1s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate negative delay in milliseconds", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: -500,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("-500ms");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-decimal", () => {
		it("should generate decimal seconds", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: 0.5,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0.5s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate decimal seconds with integer part", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: 1.5,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1.5s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate decimal milliseconds", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: 0.25,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0.25ms");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-large", () => {
		it("should generate very large delay", () => {
			const input: Type.AnimationDelay = {
				kind: "animation-delay",
				delays: [
					{
						value: 10000,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("10000s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-list", () => {
		it("should generate multiple delays", () => {
			const input: Type.AnimationDelay = {
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
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1s, 500ms");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple time values", () => {
			const input: Type.AnimationDelay = {
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
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0s, 1s, 2s, 3s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
