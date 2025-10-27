// b_path:: src/generate/animation/duration.test.ts
// Auto-generated from scripts/generate-test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-duration
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/duration";
import * as Parser from "@/parse/animation/duration";

describe("generate/animation/duration - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate single time value in seconds", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
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

		it("should generate single time value in milliseconds", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
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

	describe("valid-keyword", () => {
		it("should generate auto keyword", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "auto",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("auto");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-edge", () => {
		it("should generate zero duration", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
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

		it("should generate zero duration in ms", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 0,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0ms");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-decimal", () => {
		it("should generate decimal values", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
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

		it("should generate decimal seconds", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 2.5,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("2.5s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate decimal milliseconds", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 100.5,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("100.5ms");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-large", () => {
		it("should generate large values", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 3600,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("3600s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-list", () => {
		it("should generate multiple durations", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 1,
						unit: "s",
					},
					{
						type: "auto",
					},
					{
						type: "time",
						value: 500,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1s, auto, 500ms");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple time values", () => {
			const input: Type.AnimationDuration = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 1,
						unit: "s",
					},
					{
						type: "time",
						value: 2,
						unit: "s",
					},
					{
						type: "time",
						value: 3,
						unit: "s",
					},
					{
						type: "time",
						value: 4,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("1s, 2s, 3s, 4s");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
