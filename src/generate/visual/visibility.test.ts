// b_path:: src/generate/visual/visibility.generate.test.ts
// Auto-generated from scripts/generate-test-generator/configs/layout/visibility.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/visual/visibility";
import * as Parser from "@/parse/visual/visibility";

describe("generate/visual/visibility - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate visible keyword", () => {
			const input: Type.Visibility = {
				kind: "visibility",
				value: "visible",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("visible");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate hidden keyword", () => {
			const input: Type.Visibility = {
				kind: "visibility",
				value: "hidden",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("hidden");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate collapse keyword", () => {
			const input: Type.Visibility = {
				kind: "visibility",
				value: "collapse",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("collapse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
