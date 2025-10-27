// b_path:: src/generate/animation/direction.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/direction.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-direction
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/animation/direction";

describe("generate/animation/direction - invalid cases", () => {
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
				kind: "animation-duration",
				directions: ["normal"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('kind: Invalid input: expected "animation-direction"');
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid direction keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-direction",
				directions: ["invalid"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'directions[0]: Invalid option: expected one of "normal"|"reverse"|"alternate"|"alternate-reverse"',
			);
		});

		it("should reject fill-mode keyword instead of direction", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-direction",
				directions: ["forwards"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'directions[0]: Invalid option: expected one of "normal"|"reverse"|"alternate"|"alternate-reverse"',
			);
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty directions array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-direction",
				directions: [],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("directions: Too small: expected array to have >=1 items");
		});
	});

	describe("invalid-type", () => {
		it("should reject string instead of array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-direction",
				directions: "normal",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("directions: Invalid input: expected array, received string");
		});

		it("should reject number instead of string", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-direction",
				directions: [123],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'directions[0]: Invalid option: expected one of "normal"|"reverse"|"alternate"|"alternate-reverse"',
			);
		});
	});
});
