// b_path:: src/parse/animation/direction.test.ts
// Auto-generated from scripts/test-generator/configs/direction.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-direction
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/direction";

describe("parse/animation/direction - valid cases", () => {
	describe("valid-keyword", () => {
		it("should parse normal keyword", () => {
			const result = Parser.parse("normal");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["normal"],
			});
		});

		it("should parse reverse keyword", () => {
			const result = Parser.parse("reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["reverse"],
			});
		});

		it("should parse alternate keyword", () => {
			const result = Parser.parse("alternate");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["alternate"],
			});
		});

		it("should parse alternate-reverse keyword", () => {
			const result = Parser.parse("alternate-reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["alternate-reverse"],
			});
		});

		it("should parse case insensitive", () => {
			const result = Parser.parse("NORMAL");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["normal"],
			});
		});

		it("should parse mixed case", () => {
			const result = Parser.parse("Alternate");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["alternate"],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple keywords", () => {
			const result = Parser.parse("normal, reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["normal", "reverse"],
			});
		});

		it("should parse three keywords", () => {
			const result = Parser.parse("alternate, normal, reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["alternate", "normal", "reverse"],
			});
		});

		it("should parse list with whitespace", () => {
			const result = Parser.parse("normal , reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-direction",
				directions: ["normal", "reverse"],
			});
		});
	});
});
