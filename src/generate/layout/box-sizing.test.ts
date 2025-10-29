// b_path:: src/generate/layout/box-sizing.test.ts
// Auto-generated from scripts/generate-test-generator/configs/layout/box-sizing.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/layout/box-sizing";
import * as Parser from "@/parse/layout/box-sizing";

describe("generate/layout/box-sizing - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate content-box keyword", () => {
			const input: Type.BoxSizing = {
				kind: "box-sizing",
				value: "content-box",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("content-box");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate border-box keyword", () => {
			const input: Type.BoxSizing = {
				kind: "box-sizing",
				value: "border-box",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("border-box");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
