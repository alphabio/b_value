// b_path:: src/generate/typography/font-style.test.ts
// Auto-generated from scripts/generate-test-generator/configs/typography/font-style.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/typography/font-style";
import * as Parser from "@/parse/typography/font-style";

describe("generate/typography/font-style - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate normal keyword", () => {
			const input: Type.FontStyle = {
				kind: "font-style",
				value: "normal",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("normal");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate italic keyword", () => {
			const input: Type.FontStyle = {
				kind: "font-style",
				value: "italic",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("italic");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate oblique keyword", () => {
			const input: Type.FontStyle = {
				kind: "font-style",
				value: "oblique",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("oblique");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
