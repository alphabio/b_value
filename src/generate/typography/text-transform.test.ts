// b_path:: src/generate/typography/text-transform.test.ts
// Auto-generated from scripts/generate-test-generator/configs/typography/text-transform.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/typography/text-transform";
import * as Parser from "@/parse/typography/text-transform";

describe("generate/typography/text-transform - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate none keyword", () => {
			const input: Type.TextTransform = {
				kind: "text-transform",
				value: "none",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("none");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate capitalize keyword", () => {
			const input: Type.TextTransform = {
				kind: "text-transform",
				value: "capitalize",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("capitalize");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate uppercase keyword", () => {
			const input: Type.TextTransform = {
				kind: "text-transform",
				value: "uppercase",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("uppercase");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate lowercase keyword", () => {
			const input: Type.TextTransform = {
				kind: "text-transform",
				value: "lowercase",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("lowercase");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
