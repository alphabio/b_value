// b_path:: test/integration/roundtrip/layout-extended.test.ts

/**
 * Round-trip tests for additional layout properties
 *
 * Tests verify parse → generate → parse stability for:
 * - display
 * - box-sizing
 * - margin properties
 * - padding properties
 * - min/max width/height
 */

import { describe, expect, test } from "vitest";
import * as BoxSizingGenerate from "@/generate/layout/box-sizing";
import * as DisplayGenerate from "@/generate/layout/display";
import * as MarginBottomGenerate from "@/generate/layout/margin-bottom";
import * as MarginLeftGenerate from "@/generate/layout/margin-left";
import * as MaxHeightGenerate from "@/generate/layout/max-height";
import * as MaxWidthGenerate from "@/generate/layout/max-width";
import * as MinHeightGenerate from "@/generate/layout/min-height";
import * as MinWidthGenerate from "@/generate/layout/min-width";
import * as PaddingBottomGenerate from "@/generate/layout/padding-bottom";
import * as PaddingLeftGenerate from "@/generate/layout/padding-left";
import * as BoxSizingParse from "@/parse/layout/box-sizing";
import * as DisplayParse from "@/parse/layout/display";
import * as MarginBottomParse from "@/parse/layout/margin-bottom";
import * as MarginLeftParse from "@/parse/layout/margin-left";
import * as MaxHeightParse from "@/parse/layout/max-height";
import * as MaxWidthParse from "@/parse/layout/max-width";
import * as MinHeightParse from "@/parse/layout/min-height";
import * as MinWidthParse from "@/parse/layout/min-width";
import * as PaddingBottomParse from "@/parse/layout/padding-bottom";
import * as PaddingLeftParse from "@/parse/layout/padding-left";

describe("Round-Trip: display", () => {
	test("keyword: flex", () => {
		const p1 = DisplayParse.parse("flex");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DisplayGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DisplayParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("keyword: grid", () => {
		const p1 = DisplayParse.parse("grid");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DisplayGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DisplayParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("keyword: inline-block", () => {
		const p1 = DisplayParse.parse("inline-block");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DisplayGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DisplayParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: box-sizing", () => {
	test("keyword: border-box", () => {
		const p1 = BoxSizingParse.parse("border-box");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BoxSizingGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = BoxSizingParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: margin properties", () => {
	test("margin-left: 10px", () => {
		const p1 = MarginLeftParse.parse("10px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = MarginLeftGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = MarginLeftParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("margin-bottom: auto", () => {
		const p1 = MarginBottomParse.parse("auto");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = MarginBottomGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = MarginBottomParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: padding properties", () => {
	test("padding-left: 20px", () => {
		const p1 = PaddingLeftParse.parse("20px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = PaddingLeftGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = PaddingLeftParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("padding-bottom: 1em", () => {
		const p1 = PaddingBottomParse.parse("1em");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = PaddingBottomGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = PaddingBottomParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: min/max properties", () => {
	test("min-width: 100px", () => {
		const p1 = MinWidthParse.parse("100px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = MinWidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = MinWidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("max-width: 1200px", () => {
		const p1 = MaxWidthParse.parse("1200px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = MaxWidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = MaxWidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("min-height: 50px", () => {
		const p1 = MinHeightParse.parse("50px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = MinHeightGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = MinHeightParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("max-height: 100vh", () => {
		const p1 = MaxHeightParse.parse("100vh");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = MaxHeightGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = MaxHeightParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
