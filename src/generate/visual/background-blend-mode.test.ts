// b_path:: src/generate/visual/background-blend-mode.test.ts
// Auto-generated from scripts/generate-test-generator/configs/visual/background-blend-mode.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/visual/background-blend-mode";
import * as Parser from "@/parse/visual/background-blend-mode";

describe("generate/visual/background-blend-mode - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate normal blend mode", () => {
			const input: Type.BackgroundBlendMode = {
				kind: "background-blend-mode",
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
			const input: Type.BackgroundBlendMode = {
				kind: "background-blend-mode",
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
			const input: Type.BackgroundBlendMode = {
				kind: "background-blend-mode",
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
			const input: Type.BackgroundBlendMode = {
				kind: "background-blend-mode",
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
			const input: Type.BackgroundBlendMode = {
				kind: "background-blend-mode",
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
			const input: Type.BackgroundBlendMode = {
				kind: "background-blend-mode",
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
