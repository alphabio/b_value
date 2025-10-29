// b_path:: src/parse/animation/name.test.ts
// Auto-generated from scripts/parse-test-generator/configs/animation/name.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-name
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/name";

describe("parse/animation/name - valid cases", () => {
	describe("valid-identifier", () => {
		it("should parse simple identifier", () => {
			const result = Parser.parse("slideIn");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "slideIn",
					},
				],
			});
		});

		it("should parse camelCase identifier", () => {
			const result = Parser.parse("fadeOut");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "fadeOut",
					},
				],
			});
		});

		it("should parse hyphenated identifier", () => {
			const result = Parser.parse("my-animation");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "my-animation",
					},
				],
			});
		});

		it("should parse underscore identifier", () => {
			const result = Parser.parse("_animation");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "_animation",
					},
				],
			});
		});

		it("should parse identifier with numbers", () => {
			const result = Parser.parse("animation123");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "animation123",
					},
				],
			});
		});
	});

	describe("valid-keyword", () => {
		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "none",
					},
				],
			});
		});

		it("should parse case insensitive none", () => {
			const result = Parser.parse("NONE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "none",
					},
				],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple names", () => {
			const result = Parser.parse("slideIn, fadeOut");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
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
			});
		});

		it("should parse none with identifier", () => {
			const result = Parser.parse("none, slideIn");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "none",
					},
					{
						type: "identifier",
						value: "slideIn",
					},
				],
			});
		});

		it("should parse short names", () => {
			const result = Parser.parse("a, b, c");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-name",
				names: [
					{
						type: "identifier",
						value: "a",
					},
					{
						type: "identifier",
						value: "b",
					},
					{
						type: "identifier",
						value: "c",
					},
				],
			});
		});
	});
});
