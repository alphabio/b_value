// b_path:: test/integration/roundtrip/filter.test.ts

/**
 * Round-trip tests for filter property
 *
 * Tests verify parse → generate → parse stability for:
 * - Individual filter functions (blur, brightness, etc.)
 * - Multiple filter functions
 */

import { describe, expect, test } from "vitest";
import * as BlurGenerate from "@/generate/filter/blur";
import * as BrightnessGenerate from "@/generate/filter/brightness";
import * as ContrastGenerate from "@/generate/filter/contrast";
import * as DropShadowGenerate from "@/generate/filter/drop-shadow";
import * as GrayscaleGenerate from "@/generate/filter/grayscale";
import * as HueRotateGenerate from "@/generate/filter/hue-rotate";
import * as InvertGenerate from "@/generate/filter/invert";
import * as OpacityGenerate from "@/generate/filter/opacity";
import * as SaturateGenerate from "@/generate/filter/saturate";
import * as SepiaGenerate from "@/generate/filter/sepia";
import * as BlurParse from "@/parse/filter/blur";
import * as BrightnessParse from "@/parse/filter/brightness";
import * as ContrastParse from "@/parse/filter/contrast";
import * as DropShadowParse from "@/parse/filter/drop-shadow";
import * as GrayscaleParse from "@/parse/filter/grayscale";
import * as HueRotateParse from "@/parse/filter/hue-rotate";
import * as InvertParse from "@/parse/filter/invert";
import * as OpacityParse from "@/parse/filter/opacity";
import * as SaturateParse from "@/parse/filter/saturate";
import * as SepiaParse from "@/parse/filter/sepia";

describe("Round-Trip: filter functions", () => {
	test("blur: blur(5px)", () => {
		const p1 = BlurParse.parse("blur(5px)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BlurGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = BlurParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("brightness: brightness(1.2)", () => {
		const p1 = BrightnessParse.parse("brightness(1.2)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BrightnessGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = BrightnessParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("brightness with percentage: brightness(120%)", () => {
		const p1 = BrightnessParse.parse("brightness(120%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BrightnessGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = BrightnessParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("contrast: contrast(1.5)", () => {
		const p1 = ContrastParse.parse("contrast(1.5)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = ContrastGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = ContrastParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("saturate: saturate(200%)", () => {
		const p1 = SaturateParse.parse("saturate(200%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = SaturateGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = SaturateParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("hue-rotate: hue-rotate(90deg)", () => {
		const p1 = HueRotateParse.parse("hue-rotate(90deg)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = HueRotateGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = HueRotateParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("grayscale: grayscale(100%)", () => {
		const p1 = GrayscaleParse.parse("grayscale(100%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = GrayscaleGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = GrayscaleParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("drop-shadow: drop-shadow(2px 2px 4px black)", () => {
		const p1 = DropShadowParse.parse("drop-shadow(2px 2px 4px black)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DropShadowGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DropShadowParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("opacity: opacity(0.5)", () => {
		const p1 = OpacityParse.parse("opacity(0.5)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = OpacityGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = OpacityParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("invert: invert(75%)", () => {
		const p1 = InvertParse.parse("invert(75%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = InvertGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = InvertParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("sepia: sepia(60%)", () => {
		const p1 = SepiaParse.parse("sepia(60%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = SepiaGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = SepiaParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
