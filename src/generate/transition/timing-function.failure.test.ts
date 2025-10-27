// b_path:: src/generate/transition/timing-function.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/timing-function.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/transition/timing-function";

describe("generate/transition/timing-function - invalid cases", () => {
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

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: ["invalid-keyword"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				"functions[0]: Invalid easing function. Expected a keyword (ease, linear, etc.), cubic-bezier(), steps(), or linear().",
			);
		});
	});

	describe("invalid-type", () => {
		it("should reject invalid function type", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: [
					{
						type: "unknown",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				"functions[0]: Invalid easing function. Expected a keyword (ease, linear, etc.), cubic-bezier(), steps(), or linear().",
			);
		});
	});

	describe("invalid-cubic-bezier", () => {
		it("should reject cubic-bezier missing x2/y2", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 0,
						y1: 0,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				"functions[0]: Invalid easing function. Expected a keyword (ease, linear, etc.), cubic-bezier(), steps(), or linear().",
			);
		});

		it("should reject cubic-bezier with string value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: "0",
						y1: 0,
						x2: 1,
						y2: 1,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				"functions[0]: Invalid easing function. Expected a keyword (ease, linear, etc.), cubic-bezier(), steps(), or linear().",
			);
		});
	});

	describe("invalid-steps", () => {
		it("should reject steps missing steps count", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				"functions[0]: Invalid easing function. Expected a keyword (ease, linear, etc.), cubic-bezier(), steps(), or linear().",
			);
		});

		it("should reject steps with zero count", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 0,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("functions[0].steps: Too small: expected number to be >0");
		});

		it("should reject steps with negative count", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: -1,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("functions[0].steps: Too small: expected number to be >0");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty functions array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-timing-function",
				functions: [],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("functions: Too small: expected array to have >=1 items");
		});
	});
});
