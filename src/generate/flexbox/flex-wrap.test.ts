// b_path:: src/generate/flexbox/flex-wrap.test.ts
// Auto-generated from scripts/generate-test-generator/configs/flexbox/flex-wrap.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/flexbox/flex-wrap";
import * as Parser from "@/parse/flexbox/flex-wrap";

describe("generate/flexbox/flex-wrap - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate nowrap keyword", () => {
			const input: Type.FlexWrap = {
				kind: "flex-wrap",
				value: "nowrap",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("nowrap");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate wrap keyword", () => {
			const input: Type.FlexWrap = {
				kind: "flex-wrap",
				value: "wrap",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("wrap");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate wrap-reverse keyword", () => {
			const input: Type.FlexWrap = {
				kind: "flex-wrap",
				value: "wrap-reverse",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("wrap-reverse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
