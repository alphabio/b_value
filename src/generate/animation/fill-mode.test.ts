// b_path:: src/generate/animation/fill-mode.test.ts
// Auto-generated from scripts/generate-test-generator/configs/fill-mode.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-fill-mode
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/fill-mode";
import * as Parser from "@/parse/animation/fill-mode";

describe("generate/animation/fill-mode - valid cases", () => {
	describe("valid-single", () => {
		it("should generate none fill mode", () => {
			const input: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["none"],
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

		it("should generate forwards fill mode", () => {
			const input: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["forwards"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("forwards");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate backwards fill mode", () => {
			const input: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["backwards"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("backwards");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate both fill mode", () => {
			const input: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["both"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("both");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-multiple", () => {
		it("should generate two fill modes", () => {
			const input: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["none", "forwards"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("none, forwards");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate all four fill mode keywords", () => {
			const input: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["none", "forwards", "backwards", "both"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("none, forwards, backwards, both");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate repeated keywords", () => {
			const input: Type.AnimationFillMode = {
				kind: "animation-fill-mode",
				modes: ["forwards", "forwards", "backwards"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("forwards, forwards, backwards");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
