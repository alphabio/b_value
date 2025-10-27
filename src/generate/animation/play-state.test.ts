// b_path:: src/generate/animation/play-state.test.ts
// Auto-generated from scripts/generate-test-generator/configs/play-state.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-play-state
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/play-state";
import * as Parser from "@/parse/animation/play-state";

describe("generate/animation/play-state - valid cases", () => {
	describe("valid-single", () => {
		it("should generate running play state", () => {
			const input: Type.AnimationPlayState = {
				kind: "animation-play-state",
				states: ["running"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("running");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate paused play state", () => {
			const input: Type.AnimationPlayState = {
				kind: "animation-play-state",
				states: ["paused"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("paused");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-multiple", () => {
		it("should generate two play states", () => {
			const input: Type.AnimationPlayState = {
				kind: "animation-play-state",
				states: ["running", "paused"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("running, paused");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate repeated play states", () => {
			const input: Type.AnimationPlayState = {
				kind: "animation-play-state",
				states: ["paused", "running", "running"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("paused, running, running");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple animations with different states", () => {
			const input: Type.AnimationPlayState = {
				kind: "animation-play-state",
				states: ["running", "running", "running", "paused"],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("running, running, running, paused");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
