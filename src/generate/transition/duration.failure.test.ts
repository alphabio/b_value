// b_path:: src/generate/transition/duration.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-duration-property
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/transition/duration";

describe("generate/transition/duration - invalid cases", () => {
	describe("invalid-null", () => {
		it("should reject null input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = null;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("Invalid input: expected object, received null");
		});

		it("should reject undefined input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = undefined;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("Invalid input: expected object, received undefined");
		});
	});

	describe("invalid-unit", () => {
		it("should reject invalid unit px", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-duration",
				durations: [
					{
						value: 1,
						unit: "px",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('durations[0].unit: Invalid unit. Expected "s" or "ms".');
		});

		it("should reject invalid unit em", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-duration",
				durations: [
					{
						value: 1,
						unit: "em",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('durations[0].unit: Invalid unit. Expected "s" or "ms".');
		});
	});

	describe("invalid-negative", () => {
		it("should reject negative value in seconds", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-duration",
				durations: [
					{
						value: -1,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("durations[0].value: Time value must be non-negative");
		});

		it("should reject negative value in milliseconds", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-duration",
				durations: [
					{
						value: -500,
						unit: "ms",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("durations[0].value: Time value must be non-negative");
		});
	});

	describe("invalid-value-type", () => {
		it("should reject string value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-duration",
				durations: [
					{
						value: "oops",
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("durations[0].value: Invalid input: expected number, received string");
		});

		it("should reject null value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-duration",
				durations: [
					{
						value: null,
						unit: "s",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("durations[0].value: Invalid input: expected number, received null");
		});
	});
});
