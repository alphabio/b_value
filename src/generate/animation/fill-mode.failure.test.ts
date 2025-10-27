// b_path:: src/generate/animation/fill-mode.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/fill-mode.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-fill-mode
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/animation/fill-mode";

describe("generate/animation/fill-mode - invalid cases", () => {
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

	describe("invalid-kind", () => {
		it("should reject wrong kind literal", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-direction",
				modes: ["none"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('kind: Invalid input: expected "animation-fill-mode"');
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid fill mode keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-fill-mode",
				modes: ["invalid"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'modes[0]: Invalid option: expected one of "none"|"forwards"|"backwards"|"both"',
			);
		});

		it("should reject direction keyword instead of fill-mode", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-fill-mode",
				modes: ["normal"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'modes[0]: Invalid option: expected one of "none"|"forwards"|"backwards"|"both"',
			);
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty modes array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-fill-mode",
				modes: [],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("modes: Too small: expected array to have >=1 items");
		});
	});

	describe("invalid-type", () => {
		it("should reject string instead of array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-fill-mode",
				modes: "none",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("modes: Invalid input: expected array, received string");
		});

		it("should reject boolean instead of string", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-fill-mode",
				modes: [true],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'modes[0]: Invalid option: expected one of "none"|"forwards"|"backwards"|"both"',
			);
		});
	});
});
