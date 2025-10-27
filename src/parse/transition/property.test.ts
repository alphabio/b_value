// b_path:: src/parse/transition/property.test.ts
// Auto-generated from scripts/parse-test-generator/configs/transition/property.ts
//
// Spec references:
// - OTHER: https://github.com/mdn/data/blob/main/css/properties.json
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-property-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/transition/property";

describe("parse/transition/property - valid cases", () => {
	describe("valid-keyword", () => {
		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "none",
					},
				],
			});
		});

		it("should parse all keyword", () => {
			const result = Parser.parse("all");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "all",
					},
				],
			});
		});

		it("should parse none keyword (uppercase)", () => {
			const result = Parser.parse("NONE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "none",
					},
				],
			});
		});

		it("should parse all keyword (uppercase)", () => {
			const result = Parser.parse("ALL");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "all",
					},
				],
			});
		});
	});

	describe("valid-basic", () => {
		it("should parse single property", () => {
			const result = Parser.parse("opacity");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "opacity",
					},
				],
			});
		});

		it("should parse single property (transform)", () => {
			const result = Parser.parse("transform");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "transform",
					},
				],
			});
		});

		it("should parse hyphenated property name", () => {
			const result = Parser.parse("background-color");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "background-color",
					},
				],
			});
		});

		it("should parse property name (uppercase)", () => {
			const result = Parser.parse("OPACITY");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "OPACITY",
					},
				],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple properties", () => {
			const result = Parser.parse("opacity, transform");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
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
			});
		});

		it("should parse three properties", () => {
			const result = Parser.parse("opacity, transform, background-color");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
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
					{
						type: "identifier",
						value: "background-color",
					},
				],
			});
		});

		it("should parse multiple properties (no spaces)", () => {
			const result = Parser.parse("width,height,opacity");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
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
			});
		});

		it("should parse multiple properties (extra spaces)", () => {
			const result = Parser.parse("opacity,  transform,   background-color");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
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
					{
						type: "identifier",
						value: "background-color",
					},
				],
			});
		});
	});

	describe("valid-custom", () => {
		it("should parse custom property", () => {
			const result = Parser.parse("--custom-property");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-property",
				properties: [
					{
						type: "identifier",
						value: "--custom-property",
					},
				],
			});
		});

		it("should parse multiple custom properties", () => {
			const result = Parser.parse("--my-color, --my-size");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
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
			});
		});
	});
});
