// b_path:: src/generate/animation/direction.test.ts
// Auto-generated from scripts/generate-test-generator/configs/direction.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-direction
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/direction";
import * as Parser from "@/parse/animation/direction";

describe("generate/animation/direction - valid cases", () => {
	describe("valid-single", () => {
		it("should generate normal direction", () => {
			const input: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["normal"],
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

		it("should generate reverse direction", () => {
			const input: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["reverse"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("reverse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate alternate direction", () => {
			const input: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["alternate"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("alternate");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate alternate-reverse direction", () => {
			const input: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["alternate-reverse"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("alternate-reverse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-multiple", () => {
		it("should generate two directions", () => {
			const input: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["normal", "reverse"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("normal, reverse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate all four direction keywords", () => {
			const input: Type.AnimationDirection = {
				kind: "animation-direction",
				directions: ["normal", "reverse", "alternate", "alternate-reverse"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("normal, reverse, alternate, alternate-reverse");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
