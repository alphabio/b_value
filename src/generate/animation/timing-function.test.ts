// b_path:: src/generate/animation/timing-function.test.ts
// Auto-generated from scripts/generate-test-generator/configs/timing-function.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-timing-function
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/timing-function";
import * as Parser from "@/parse/animation/timing-function";

describe("generate/animation/timing-function - valid cases", () => {
	describe("valid-keyword", () => {
		it("should generate ease keyword", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["ease"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("ease");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate linear keyword", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["linear"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("linear");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate ease-in keyword", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["ease-in"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("ease-in");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate ease-out keyword", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["ease-out"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("ease-out");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate ease-in-out keyword", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["ease-in-out"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("ease-in-out");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate step-start keyword", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["step-start"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("step-start");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate step-end keyword", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["step-end"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("step-end");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-cubic-bezier", () => {
		it("should generate cubic-bezier function", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 0.42,
						y1: 0,
						x2: 1,
						y2: 1,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("cubic-bezier(0.42, 0, 1, 1)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate cubic-bezier with zero values", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 0,
						y1: 0,
						x2: 1,
						y2: 1,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("cubic-bezier(0, 0, 1, 1)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-steps", () => {
		it("should generate steps without position", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					{
						type: "steps",
						steps: 4,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("steps(4)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate steps with start position", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					{
						type: "steps",
						steps: 10,
						position: "start",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("steps(10, start)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate steps with end position", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					{
						type: "steps",
						steps: 5,
						position: "end",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("steps(5, end)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-linear", () => {
		it("should generate linear function simple", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					{
						type: "linear",
						stops: [
							{
								output: 0,
							},
							{
								output: 1,
							},
						],
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("linear(0, 1)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate linear function with input positions", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					{
						type: "linear",
						stops: [
							{
								output: 0,
								input: 0,
							},
							{
								output: 0.5,
								input: 0.5,
							},
							{
								output: 1,
								input: 1,
							},
						],
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("linear(0 0%, 0.5 50%, 1 100%)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-list", () => {
		it("should generate multiple keyword functions", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: ["ease", "linear", "ease-out"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("ease, linear, ease-out");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate mixed function types", () => {
			const input: Type.AnimationTimingFunction = {
				kind: "animation-timing-function",
				functions: [
					"ease",
					{
						type: "cubic-bezier",
						x1: 0.1,
						y1: 0.7,
						x2: 1,
						y2: 0.1,
					},
					{
						type: "steps",
						steps: 4,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("ease, cubic-bezier(0.1, 0.7, 1, 0.1), steps(4)");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
