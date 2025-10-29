// b_path:: src/parse/animation/fill-mode.test.ts
// Auto-generated from scripts/parse-test-generator/configs/animation/fill-mode.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-fill-mode
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/fill-mode";

describe("parse/animation/fill-mode - valid cases", () => {
	describe("valid-keyword", () => {
		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-fill-mode",
				modes: ["none"],
			});
		});

		it("should parse forwards keyword", () => {
			const result = Parser.parse("forwards");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-fill-mode",
				modes: ["forwards"],
			});
		});

		it("should parse backwards keyword", () => {
			const result = Parser.parse("backwards");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-fill-mode",
				modes: ["backwards"],
			});
		});

		it("should parse both keyword", () => {
			const result = Parser.parse("both");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-fill-mode",
				modes: ["both"],
			});
		});

		it("should parse case insensitive", () => {
			const result = Parser.parse("NONE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-fill-mode",
				modes: ["none"],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple keywords", () => {
			const result = Parser.parse("none, forwards");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-fill-mode",
				modes: ["none", "forwards"],
			});
		});

		it("should parse three keywords", () => {
			const result = Parser.parse("forwards, backwards, both");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-fill-mode",
				modes: ["forwards", "backwards", "both"],
			});
		});
	});
});
