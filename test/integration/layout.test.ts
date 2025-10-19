// b_path:: test/integration/layout.test.ts
import { describe, expect, it } from "vitest";
import { Generate, Parse } from "@/index";

describe("Integration: Layout Properties Round-Trip", () => {
	describe("Display", () => {
		const testCases = [
			"flex",
			"block",
			"inline",
			"inline-block",
			"grid",
			"inline-grid",
			"none",
			"table",
			"inline-flex",
			"contents",
			"flow-root",
		];

		for (const css of testCases) {
			it(`should round-trip display: ${css}`, () => {
				const parsed = Parse.Layout.Display.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.Display.toCss(parsed.value);
				expect(generated).toBe(css);

				const reparsed = Parse.Layout.Display.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});

	describe("Visibility", () => {
		const testCases = ["visible", "hidden", "collapse"];

		for (const css of testCases) {
			it(`should round-trip visibility: ${css}`, () => {
				const parsed = Parse.Layout.Visibility.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.Visibility.toCss(parsed.value);
				expect(generated).toBe(css);

				const reparsed = Parse.Layout.Visibility.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});

	describe("Opacity", () => {
		const testCases = [
			{ css: "0", expected: "0" },
			{ css: "1", expected: "1" },
			{ css: "0.5", expected: "0.5" },
			{ css: "0.25", expected: "0.25" },
			{ css: "0.75", expected: "0.75" },
			{ css: "50%", expected: "0.5" },
			{ css: "100%", expected: "1" },
			{ css: "0%", expected: "0" },
		];

		for (const { css, expected } of testCases) {
			it(`should round-trip opacity: ${css}`, () => {
				const parsed = Parse.Layout.Opacity.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.Opacity.toCss(parsed.value);
				expect(generated).toBe(expected);

				const reparsed = Parse.Layout.Opacity.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});
});
