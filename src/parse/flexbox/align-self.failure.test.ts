// b_path:: src/parse/flexbox/align-self.failure.test.ts
// Auto-generated from scripts/test-generator/configs/align-self.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/align-self";

describe("parse/flexbox/align-self - invalid cases", () => {
	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("Expected single value, got 0 values");
		});
	});
});
