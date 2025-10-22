// b_path:: test/integration/layout.test.ts
import { describe, expect, it } from "vitest";
import { Generate, Parse } from "@/index";

describe("Integration: Layout Properties Round-Trip", () => {
	describe("Cursor", () => {
		const testCases = [
			"pointer",
			"default",
			"text",
			"move",
			"grab",
			"grabbing",
			"not-allowed",
			"help",
			"wait",
			"crosshair",
			"zoom-in",
			"zoom-out",
			"n-resize",
			"e-resize",
			"s-resize",
			"w-resize",
		];

		for (const css of testCases) {
			it(`should round-trip cursor: ${css}`, () => {
				const parsed = Parse.Layout.Cursor.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.Cursor.generate(parsed.value);
				expect(generated).toBe(css);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Cursor.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});

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

				const generated = Generate.Layout.Display.generate(parsed.value);
				expect(generated).toBe(css);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Display.parse(generated.value);
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

				const generated = Generate.Layout.Visibility.generate(parsed.value);
				expect(generated).toBe(css);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Visibility.parse(generated.value);
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

				const generated = Generate.Layout.Opacity.generate(parsed.value);
				expect(generated).toBe(expected);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Opacity.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});

	describe("OverflowX", () => {
		const testCases = ["visible", "hidden", "clip", "scroll", "auto"];

		for (const css of testCases) {
			it(`should round-trip overflow-x: ${css}`, () => {
				const parsed = Parse.Layout.OverflowX.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.OverflowX.generate(parsed.value);
				expect(generated).toBe(css);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.OverflowX.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});

	describe("OverflowY", () => {
		const testCases = ["visible", "hidden", "clip", "scroll", "auto"];

		for (const css of testCases) {
			it(`should round-trip overflow-y: ${css}`, () => {
				const parsed = Parse.Layout.OverflowY.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.OverflowY.generate(parsed.value);
				expect(generated).toBe(css);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.OverflowY.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});

	describe("Position", () => {
		const testCases = ["static", "relative", "absolute", "fixed", "sticky"];

		for (const css of testCases) {
			it(`should round-trip position: ${css}`, () => {
				const parsed = Parse.Layout.Position.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.Position.generate(parsed.value);
				expect(generated).toBe(css);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Position.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});

	describe("ZIndex", () => {
		const testCases = [
			{ css: "10", expected: "10" },
			{ css: "-5", expected: "-5" },
			{ css: "0", expected: "0" },
			{ css: "999", expected: "999" },
			{ css: "-999", expected: "-999" },
			{ css: "auto", expected: "auto" },
		];

		for (const { css, expected } of testCases) {
			it(`should round-trip z-index: ${css}`, () => {
				const parsed = Parse.Layout.ZIndex.parse(css);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) return;

				const generated = Generate.Layout.ZIndex.generate(parsed.value);
				expect(generated).toBe(expected);

				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.ZIndex.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (!reparsed.ok) return;

				expect(reparsed.value).toEqual(parsed.value);
			});
		}
	});
});
