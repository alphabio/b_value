// b_path:: src/generate/animation/duration.generated.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/duration.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-duration
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/animation/duration";

describe("generate/animation/duration - invalid cases", () => {
	describe("invalid-null", () => {
		it("should reject null input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = null;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe("Input must not be null or undefined");
		});

		it("should reject undefined input", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
			const input: any = null;
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues?.[0]?.message).toBe("Input must not be null or undefined");
		});
	});
});
