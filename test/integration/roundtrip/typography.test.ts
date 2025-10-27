// b_path:: test/integration/roundtrip/typography.test.ts

/**
 * Round-trip tests for typography properties
 *
 * Tests verify parse → generate → parse stability for:
 * - font-size
 * - font-weight
 * - font-style
 * - line-height
 * - letter-spacing
 * - text-align
 * - text-transform
 * - word-spacing
 */

import { describe, expect, test } from "vitest";
import * as FontSizeGenerate from "@/generate/typography/font-size";
import * as FontStyleGenerate from "@/generate/typography/font-style";
import * as FontWeightGenerate from "@/generate/typography/font-weight";
import * as LetterSpacingGenerate from "@/generate/typography/letter-spacing";
import * as LineHeightGenerate from "@/generate/typography/line-height";
import * as TextAlignGenerate from "@/generate/typography/text-align";
import * as TextTransformGenerate from "@/generate/typography/text-transform";
import * as FontSizeParse from "@/parse/typography/font-size";
import * as FontStyleParse from "@/parse/typography/font-style";
import * as FontWeightParse from "@/parse/typography/font-weight";
import * as LetterSpacingParse from "@/parse/typography/letter-spacing";
import * as LineHeightParse from "@/parse/typography/line-height";
import * as TextAlignParse from "@/parse/typography/text-align";
import * as TextTransformParse from "@/parse/typography/text-transform";

describe("Round-Trip: font-size", () => {
	test("absolute size: 16px", () => {
		const p1 = FontSizeParse.parse("16px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FontSizeGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FontSizeParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("relative size: 1.2em", () => {
		const p1 = FontSizeParse.parse("1.2em");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FontSizeGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FontSizeParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: font-weight", () => {
	test("keyword: bold", () => {
		const p1 = FontWeightParse.parse("bold");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FontWeightGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FontWeightParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("numeric: 600", () => {
		const p1 = FontWeightParse.parse("600");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FontWeightGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FontWeightParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: font-style", () => {
	test("keyword: italic", () => {
		const p1 = FontStyleParse.parse("italic");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FontStyleGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FontStyleParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: line-height", () => {
	test("unitless: 1.5", () => {
		const p1 = LineHeightParse.parse("1.5");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = LineHeightGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = LineHeightParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("with unit: 24px", () => {
		const p1 = LineHeightParse.parse("24px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = LineHeightGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = LineHeightParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: letter-spacing", () => {
	test("length: 2px", () => {
		const p1 = LetterSpacingParse.parse("2px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = LetterSpacingGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = LetterSpacingParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: text-align", () => {
	test("keyword: center", () => {
		const p1 = TextAlignParse.parse("center");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TextAlignGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TextAlignParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("keyword: justify", () => {
		const p1 = TextAlignParse.parse("justify");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TextAlignGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TextAlignParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: text-transform", () => {
	test("keyword: uppercase", () => {
		const p1 = TextTransformParse.parse("uppercase");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TextTransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TextTransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
