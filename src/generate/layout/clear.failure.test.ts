// b_path:: src/generate/layout/clear.failure.test.ts
// Auto-generated from scripts/generate-test-generator/configs/clear.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Generator from "@/generate/layout/clear";

describe("generate/layout/clear - invalid cases", () => {
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
				kind: "clear",
				value: "center",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.issues).toHaveLength(1);
			expect(result.issues?.[0]?.message).toBe(
				"value: Expected left | right | both | none | inline-start | inline-end",
			);
		});
	});
});
