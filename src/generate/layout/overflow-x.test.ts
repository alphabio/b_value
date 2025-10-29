// b_path:: src/generate/layout/overflow-x.test.ts
// Auto-generated from scripts/generate-test-generator/configs/layout/overflow-x.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/layout/overflow-x";
import * as Parser from "@/parse/layout/overflow-x";

describe("generate/layout/overflow-x - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate visible keyword", () => {
			const input: Type.OverflowX = {
				kind: "overflow-x",
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
			const input: Type.OverflowX = {
				kind: "overflow-x",
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

		it("should generate scroll keyword", () => {
			const input: Type.OverflowX = {
				kind: "overflow-x",
				value: "scroll",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("scroll");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate auto keyword", () => {
			const input: Type.OverflowX = {
				kind: "overflow-x",
				value: "auto",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("auto");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
