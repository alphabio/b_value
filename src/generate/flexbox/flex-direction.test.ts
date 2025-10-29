// b_path:: src/generate/flexbox/flex-direction.test.ts
// Auto-generated from scripts/generate-test-generator/configs/flexbox/flex-direction.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/flexbox/flex-direction";
import * as Parser from "@/parse/flexbox/flex-direction";

describe("generate/flexbox/flex-direction - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate row keyword", () => {
			const input: Type.FlexDirection = {
				kind: "flex-direction",
				value: "row",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("row");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate row-reverse keyword", () => {
			const input: Type.FlexDirection = {
				kind: "flex-direction",
				value: "row-reverse",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("row-reverse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate column keyword", () => {
			const input: Type.FlexDirection = {
				kind: "flex-direction",
				value: "column",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("column");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate column-reverse keyword", () => {
			const input: Type.FlexDirection = {
				kind: "flex-direction",
				value: "column-reverse",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("column-reverse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
