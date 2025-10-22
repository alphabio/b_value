// b_path:: src/generate/color/color-function.test.ts
import { describe, expect, test } from "vitest";
import * as Parse from "../../parse/color/color-function";
import * as Generate from "./color-function";

describe("toCss() - color() function generator", () => {
	describe("Basic Generation", () => {
		test("srgb color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0.5, 0.2, 0.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0.5 0.2 0.8)" });
		});

		test("srgb-linear color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb-linear",
				channels: [0.5, 0.2, 0.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb-linear 0.5 0.2 0.8)" });
		});

		test("display-p3 color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "display-p3",
				channels: [0.928, 0.322, 0.203],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(display-p3 0.928 0.322 0.203)" });
		});

		test("a98-rgb color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "a98-rgb",
				channels: [0.5, 0.2, 0.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(a98-rgb 0.5 0.2 0.8)" });
		});

		test("prophoto-rgb color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "prophoto-rgb",
				channels: [0.5, 0.2, 0.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(prophoto-rgb 0.5 0.2 0.8)" });
		});

		test("rec2020 color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "rec2020",
				channels: [0.5, 0.2, 0.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(rec2020 0.5 0.2 0.8)" });
		});

		test("xyz color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "xyz",
				channels: [0.3, 0.4, 0.5],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(xyz 0.3 0.4 0.5)" });
		});

		test("xyz-d50 color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "xyz-d50",
				channels: [0.3, 0.4, 0.5],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(xyz-d50 0.3 0.4 0.5)" });
		});

		test("xyz-d65 color space", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "xyz-d65",
				channels: [0.3, 0.4, 0.5],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(xyz-d65 0.3 0.4 0.5)" });
		});
	});

	describe("Alpha Generation", () => {
		test("color with alpha", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0.5, 0.2, 0.8],
				alpha: 0.5,
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0.5 0.2 0.8 / 0.5)" });
		});

		test("color without alpha", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0.5, 0.2, 0.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0.5 0.2 0.8)" });
		});

		test("alpha 0", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0.5, 0.2, 0.8],
				alpha: 0,
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0.5 0.2 0.8 / 0)" });
		});

		test("alpha 1", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0.5, 0.2, 0.8],
				alpha: 1,
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0.5 0.2 0.8 / 1)" });
		});
	});

	describe("Precision and Rounding", () => {
		test("rounds trailing zeros", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0.5, 0.20000000000001, 0.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0.5 0.2 0.8)" });
		});

		test("preserves necessary precision", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0.123456, 0.789012, 0.345678],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0.123456 0.789012 0.345678)" });
		});

		test("handles zero values", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [0, 0, 0],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 0 0 0)" });
		});

		test("handles one values", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "srgb",
				channels: [1, 1, 1],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(srgb 1 1 1)" });
		});

		test("handles negative values", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "xyz",
				channels: [-0.1, 0.5, -0.2],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(xyz -0.1 0.5 -0.2)" });
		});

		test("handles values over 1", () => {
			const css = Generate.generate({
				kind: "color",
				colorSpace: "xyz",
				channels: [1.5, 2.0, 1.8],
			});
			expect(css).toEqual({ ok: true, issues: [], value: "color(xyz 1.5 2 1.8)" });
		});
	});

	describe("Round-Trip", () => {
		test("parse and generate srgb", () => {
			const original = "color(srgb 0.5 0.2 0.8)";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (generated.ok) expect(generated.value).toBe(original);

				const reparsed = generated.ok ? Parse.parse(generated.value) : { ok: false as const };
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		test("parse and generate display-p3 with alpha", () => {
			const original = "color(display-p3 0.928 0.322 0.203 / 0.8)";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (generated.ok) expect(generated.value).toBe(original);

				const reparsed = generated.ok ? Parse.parse(generated.value) : { ok: false as const };
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		test("parse and generate xyz-d50", () => {
			const original = "color(xyz-d50 0.3 0.4 0.5)";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (generated.ok) expect(generated.value).toBe(original);

				const reparsed = generated.ok ? Parse.parse(generated.value) : { ok: false as const };
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
