// b_path:: src/generate/animation/duration.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-duration
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/animation/duration";

describe("generate/animation/duration - invalid cases", () => {
	describe("invalid-null", () => {
		it("should reject null input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = null;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe("Invalid input: expected object, received null");
		});

		it("should reject undefined input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = undefined;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe("Invalid input: expected object, received undefined");
		});
	});

	describe("invalid-unit", () => {
		it("should reject invalid unit px", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 1,
						unit: "px",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe('durations[0].type: Invalid input: expected "auto"');
		});

		it("should reject invalid unit em", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: 1,
						unit: "em",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe('durations[0].type: Invalid input: expected "auto"');
		});
	});

	describe("invalid-negative", () => {
		it("should reject negative value in seconds", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: -1,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe("durations[0].value: Time value must be non-negative");
		});

		it("should reject negative value in milliseconds", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: -500,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe("durations[0].value: Time value must be non-negative");
		});
	});

	describe("invalid-value-type", () => {
		it("should reject string value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: "oops",
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe('durations[0].type: Invalid input: expected "auto"');
		});

		it("should reject NaN value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				durations: [
					{
						type: "time",
						value: null,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe('durations[0].type: Invalid input: expected "auto"');
		});
	});

	describe("invalid-type", () => {
		it("should reject invalid duration type", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				durations: [
					{
						type: "invalid",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe('durations[0].type: Invalid input: expected "auto"');
		});
	});
});
