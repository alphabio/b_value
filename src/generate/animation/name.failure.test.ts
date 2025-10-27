// b_path:: src/generate/animation/name.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/name.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-name
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/animation/name";

describe("generate/animation/name - invalid cases", () => {
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
				names: [
					{
						type: "none",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('kind: Invalid input: expected "animation-name"');
		});
	});

	describe("invalid-type", () => {
		it("should reject invalid type keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-name",
				names: [
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
				'names[0]: Invalid animation name. Expected { type: "none" } or { type: "identifier", value: <string> }.',
			);
		});

		it("should reject missing value for identifier", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'names[0]: Invalid animation name. Expected { type: "none" } or { type: "identifier", value: <string> }.',
			);
		});

		it("should reject number value instead of string", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: 123,
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'names[0]: Invalid animation name. Expected { type: "none" } or { type: "identifier", value: <string> }.',
			);
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty names array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-name",
				names: [],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("names: Too small: expected array to have >=1 items");
		});
	});

	describe("invalid-structure", () => {
		it("should reject string instead of array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-name",
				names: "slideIn",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("names: Invalid input: expected array, received string");
		});

		it("should reject missing type field", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "animation-name",
				names: [
					{
						value: "slideIn",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				'names[0]: Invalid animation name. Expected { type: "none" } or { type: "identifier", value: <string> }.',
			);
		});
	});
});
