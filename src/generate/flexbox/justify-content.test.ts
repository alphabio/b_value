// b_path:: src/generate/flexbox/justify-content.test.ts
// Auto-generated from scripts/generate-test-generator/configs/flexbox/justify-content.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/flexbox/justify-content";
import * as Parser from "@/parse/flexbox/justify-content";

describe("generate/flexbox/justify-content - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate flex-start keyword", () => {
			const input: Type.JustifyContent = {
				kind: "justify-content",
				value: "flex-start",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("flex-start");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate center keyword", () => {
			const input: Type.JustifyContent = {
				kind: "justify-content",
				value: "center",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("center");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate space-between keyword", () => {
			const input: Type.JustifyContent = {
				kind: "justify-content",
				value: "space-between",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("space-between");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
