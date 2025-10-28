// b_path:: src/parse/visual/mix-blend-mode.test.ts
// Auto-generated from scripts/parse-test-generator/configs/visual/mix-blend-mode.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
// - W3C: https://www.w3.org/TR/compositing-1/#mix-blend-mode
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/visual/mix-blend-mode";

describe("parse/visual/mix-blend-mode - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse normal blend mode", () => {
			const result = Parser.parse("normal");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "normal",
			});
		});

		it("should parse multiply blend mode", () => {
			const result = Parser.parse("multiply");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "multiply",
			});
		});

		it("should parse screen blend mode", () => {
			const result = Parser.parse("screen");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "screen",
			});
		});

		it("should parse overlay blend mode", () => {
			const result = Parser.parse("overlay");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "overlay",
			});
		});

		it("should parse darken blend mode", () => {
			const result = Parser.parse("darken");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "darken",
			});
		});

		it("should parse lighten blend mode", () => {
			const result = Parser.parse("lighten");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "lighten",
			});
		});
	});

	describe("valid-advanced", () => {
		it("should parse color-dodge blend mode", () => {
			const result = Parser.parse("color-dodge");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "color-dodge",
			});
		});

		it("should parse color-burn blend mode", () => {
			const result = Parser.parse("color-burn");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "color-burn",
			});
		});

		it("should parse hard-light blend mode", () => {
			const result = Parser.parse("hard-light");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "hard-light",
			});
		});

		it("should parse soft-light blend mode", () => {
			const result = Parser.parse("soft-light");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "soft-light",
			});
		});

		it("should parse difference blend mode", () => {
			const result = Parser.parse("difference");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "difference",
			});
		});

		it("should parse exclusion blend mode", () => {
			const result = Parser.parse("exclusion");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "exclusion",
			});
		});
	});

	describe("valid-color", () => {
		it("should parse hue blend mode", () => {
			const result = Parser.parse("hue");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "hue",
			});
		});

		it("should parse saturation blend mode", () => {
			const result = Parser.parse("saturation");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "saturation",
			});
		});

		it("should parse color blend mode", () => {
			const result = Parser.parse("color");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "color",
			});
		});

		it("should parse luminosity blend mode", () => {
			const result = Parser.parse("luminosity");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "luminosity",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase multiply", () => {
			const result = Parser.parse("MULTIPLY");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "multiply",
			});
		});

		it("should parse mixed case screen", () => {
			const result = Parser.parse("Screen");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "mix-blend-mode",
				mode: "screen",
			});
		});
	});
});
