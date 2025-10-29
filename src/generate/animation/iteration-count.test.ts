// b_path:: src/generate/animation/iteration-count.test.ts
// Auto-generated from scripts/generate-test-generator/configs/animation/iteration-count.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-iteration-count
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/iteration-count";
import * as Parser from "@/parse/animation/iteration-count";

describe("generate/animation/iteration-count - valid cases", () => {
	describe("valid-keyword", () => {
		it("should generate infinite keyword", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "infinite",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("infinite");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-number", () => {
		it("should generate single iteration", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 1,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple iterations", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 3,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("3");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate zero iterations", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 0,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-decimal", () => {
		it("should generate decimal iterations", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 2.5,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("2.5");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate half iteration", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 0.5,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0.5");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-large", () => {
		it("should generate very large count", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 1000,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1000");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-list", () => {
		it("should generate mixed number and infinite", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 1,
					},
					{
						type: "infinite",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1, infinite");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple mixed values", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 2,
					},
					{
						type: "number",
						value: 3,
					},
					{
						type: "infinite",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("2, 3, infinite");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple infinite keywords", () => {
			const input: Type.AnimationIterationCount = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "infinite",
					},
					{
						type: "infinite",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("infinite, infinite");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
