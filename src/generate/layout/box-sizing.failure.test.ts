// b_path:: src/generate/layout/box-sizing.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/box-sizing.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/layout/box-sizing";

describe("generate/layout/box-sizing - invalid cases", () => {
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
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "box-sizing",
				value: "padding-box",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('value: Invalid option: expected one of "content-box"|"border-box"');
		});
	});

	describe("invalid-kind", () => {
		it("should reject wrong kind", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = {
				kind: "display",
				value: "content-box",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe('kind: Invalid input: expected "box-sizing"');
		});
	});
});
