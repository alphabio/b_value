// b_path:: src/generate/animation/name.test.ts
// Auto-generated from scripts/generate-test-generator/configs/name.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-name
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/animation/name";
import * as Parser from "@/parse/animation/name";

describe("generate/animation/name - valid cases", () => {
	describe("valid-none", () => {
		it("should generate none keyword", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "none",
					},
				],
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
	});

	describe("valid-identifier", () => {
		it("should generate simple identifier", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "slideIn",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("slideIn");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate camelCase identifier", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "fadeOut",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("fadeOut");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate hyphenated identifier", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "slide-in",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("slide-in");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate underscore identifier", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "bounce_effect",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("bounce_effect");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate identifier with numbers", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "animation123",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("animation123");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-multiple", () => {
		it("should generate two identifiers", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "slideIn",
					},
					{
						type: "identifier",
						value: "fadeOut",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("slideIn, fadeOut");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate mixed identifiers and none", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "bounce",
					},
					{
						type: "none",
					},
					{
						type: "identifier",
						value: "spin",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("bounce, none, spin");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple none keywords", () => {
			const input: Type.AnimationName = {
				kind: "animation-name",
				names: [
					{
						type: "none",
					},
					{
						type: "none",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("none, none");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
