// b_path:: src/generate/animation/iteration-count.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/iteration-count.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-iteration-count
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/animation/iteration-count";

describe("generate/animation/iteration-count - invalid cases", () => {
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

	describe("invalid-negative", () => {
		it("should reject negative iteration count", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: -1,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("counts[0].value: Too small: expected number to be >=0");
		});

		it("should reject negative decimal iteration count", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: -5.5,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("counts[0].value: Too small: expected number to be >=0");
		});
	});

	describe("invalid-type", () => {
		it("should reject invalid type keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "invalid",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'counts[0]: Invalid iteration count. Expected { type: "infinite" } or { type: "number", value: <non-negative number> }.',
			);
		});

		it("should reject string value instead of number", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: "three",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'counts[0]: Invalid iteration count. Expected { type: "infinite" } or { type: "number", value: <non-negative number> }.',
			);
		});
	});

	describe("invalid-missing", () => {
		it("should reject missing value field", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'counts[0]: Invalid iteration count. Expected { type: "infinite" } or { type: "number", value: <non-negative number> }.',
			);
		});

		it("should reject missing type field", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-iteration-count",
				counts: [
					{
						value: 5,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'counts[0]: Invalid iteration count. Expected { type: "infinite" } or { type: "number", value: <non-negative number> }.',
			);
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty counts array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-iteration-count",
				counts: [],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("counts: Too small: expected array to have >=1 items");
		});
	});

	describe("invalid-kind", () => {
		it("should reject wrong kind literal", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-duration",
				counts: [
					{
						type: "infinite",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('kind: Invalid input: expected "animation-iteration-count"');
		});
	});
});
