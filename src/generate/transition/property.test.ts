// b_path:: src/generate/transition/property.test.ts
// Auto-generated from scripts/generate-test-generator/configs/transition/property.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-property-property
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/transition/property";
import * as Parser from "@/parse/transition/property";

describe("generate/transition/property - valid cases", () => {
	describe("valid-keyword", () => {
		it("should generate none keyword", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
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

		it("should generate all keyword", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "all",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("all");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-basic", () => {
		it("should generate single property", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "opacity",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("opacity");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate transform property", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "transform",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("transform");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate hyphenated property", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "background-color",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("background-color");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-list", () => {
		it("should generate multiple properties", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "opacity",
					},
					{
						type: "identifier",
						value: "transform",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("opacity, transform");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate three properties", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "width",
					},
					{
						type: "identifier",
						value: "height",
					},
					{
						type: "identifier",
						value: "opacity",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("width, height, opacity");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});

	describe("valid-custom", () => {
		it("should generate custom property", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "--custom-property",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("--custom-property");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate multiple custom properties", () => {
			const input: Type.TransitionProperty = {
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "--my-color",
					},
					{
						type: "identifier",
						value: "--my-size",
					},
				],
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("--my-color, --my-size");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
