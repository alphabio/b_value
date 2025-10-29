// b_path:: src/generate/flexbox/flex-wrap.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/flex-wrap.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/flexbox/flex-wrap";

describe("generate/flexbox/flex-wrap - invalid cases", () => {
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
