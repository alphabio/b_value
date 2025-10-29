// b_path:: src/generate/flexbox/align-self.test.ts
// Auto-generated from scripts/generate-test-generator/configs/flexbox/align-self.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/flexbox/align-self";
import * as Parser from "@/parse/flexbox/align-self";

describe("generate/flexbox/align-self - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate auto keyword", () => {
			const input: Type.AlignSelf = {
				kind: "align-self",
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

		it("should generate flex-start keyword", () => {
			const input: Type.AlignSelf = {
				kind: "align-self",
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
			const input: Type.AlignSelf = {
				kind: "align-self",
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
	});
});
