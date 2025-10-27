// b_path:: src/generate/transition/property.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/property.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-property-property
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/transition/property";

describe("generate/transition/property - invalid cases", () => {
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

	describe("invalid-empty", () => {
		it("should reject empty properties array", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-property",
				properties: [],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("properties: Too small: expected array to have >=1 items");
		});
	});

	describe("invalid-type", () => {
		it("should reject invalid property type", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-property",
				properties: [
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
				'properties[0]: Invalid transition property. Expected { type: "none" }, { type: "all" }, or { type: "identifier", value: <string> }.',
			);
		});
	});

	describe("invalid-missing", () => {
		it("should reject identifier without value", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "transition-property",
				properties: [
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
				'properties[0]: Invalid transition property. Expected { type: "none" }, { type: "all" }, or { type: "identifier", value: <string> }.',
			);
		});
	});
});
