// b_path:: src/generate/typography/text-transform.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/text-transform.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/typography/text-transform";

describe("generate/typography/text-transform - invalid cases", () => {
	describe("invalid-null", () => {
		it("should reject null input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = null;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe("Input must not be null or undefined");
		});
	});
});
