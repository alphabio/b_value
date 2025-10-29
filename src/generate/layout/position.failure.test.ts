// b_path:: src/generate/layout/position.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/position.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/layout/position";

describe("generate/layout/position - invalid cases", () => {
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
