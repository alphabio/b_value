// b_path:: test/integration/roundtrip/layout.test.ts

/**
 * Round-trip tests for layout properties (width, height)
 *
 * Tests verify parse → generate → parse stability for:
 * - Length values with various units (px, em, vw, etc.)
 * - Percentage values
 * - Keywords (auto)
 */

import { describe, expect, test } from "vitest";
import * as HeightGenerate from "@/generate/layout/height";
import * as WidthGenerate from "@/generate/layout/width";
import * as HeightParse from "@/parse/layout/height";
import * as WidthParse from "@/parse/layout/width";

describe("Round-Trip: width property", () => {
	test("length with unit: 100px", () => {
		// Parse input
		const p1 = WidthParse.parse("100px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		// Generate CSS
		const gen = WidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		// Verify output
		expect(gen.value).toBe("100px");

		// Re-parse and verify IR is identical
		const p2 = WidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("percentage: 50%", () => {
		const p1 = WidthParse.parse("50%");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = WidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		expect(gen.value).toBe("50%");

		const p2 = WidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("em unit: 2.5em", () => {
		const p1 = WidthParse.parse("2.5em");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = WidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		expect(gen.value).toBe("2.5em");

		const p2 = WidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("viewport unit: 80vw", () => {
		const p1 = WidthParse.parse("80vw");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = WidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		expect(gen.value).toBe("80vw");

		const p2 = WidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: height property", () => {
	test("keyword: auto", () => {
		// Parse input
		const p1 = HeightParse.parse("auto");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		// Generate CSS
		const gen = HeightGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		// Verify output
		expect(gen.value).toBe("auto");

		// Re-parse and verify IR is identical
		const p2 = HeightParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
