// b_path:: src/generate/layout/overflow-x.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/overflow-x.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/layout/overflow-x";

describe("generate/layout/overflow-x - invalid cases", () => {
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
});
