// b_path:: src/generate/visual/mix-blend-mode.test.ts
// Auto-generated from scripts/generate-test-generator/configs/visual/mix-blend-mode.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/visual/mix-blend-mode";
import * as Parser from "@/parse/visual/mix-blend-mode";

describe("generate/visual/mix-blend-mode - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate normal blend mode", () => {
			const input: Type.MixBlendMode = {
				kind: "mix-blend-mode",
				mode: "normal",
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

		it("should generate multiply blend mode", () => {
			const input: Type.MixBlendMode = {
				kind: "mix-blend-mode",
				mode: "multiply",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("multiply");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate screen blend mode", () => {
			const input: Type.MixBlendMode = {
				kind: "mix-blend-mode",
				mode: "screen",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("screen");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate overlay blend mode", () => {
			const input: Type.MixBlendMode = {
				kind: "mix-blend-mode",
				mode: "overlay",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("overlay");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-advanced", () => {
		it("should generate color-dodge blend mode", () => {
			const input: Type.MixBlendMode = {
				kind: "mix-blend-mode",
				mode: "color-dodge",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("color-dodge");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-color", () => {
		it("should generate hue blend mode", () => {
			const input: Type.MixBlendMode = {
				kind: "mix-blend-mode",
				mode: "hue",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("hue");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
