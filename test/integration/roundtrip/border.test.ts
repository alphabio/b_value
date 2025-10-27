// b_path:: test/integration/roundtrip/border.test.ts

/**
 * Round-trip tests for border properties
 *
 * Tests verify parse → generate → parse stability for:
 * - border-color (named colors, transparent keyword)
 * - border-width (length values, keywords)
 */

import { describe, expect, test } from "vitest";
import * as BorderColorGenerate from "@/generate/border/color";
import * as BorderWidthGenerate from "@/generate/border/width";
import * as BorderColorParse from "@/parse/border/color";
import * as BorderWidthParse from "@/parse/border/width";

describe("Round-Trip: border-color property", () => {
	test("named color: blue", () => {
		const p1 = BorderColorParse.parse("blue");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BorderColorGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		expect(gen.value).toBe("blue");

		const p2 = BorderColorParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("transparent keyword", () => {
		const p1 = BorderColorParse.parse("transparent");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BorderColorGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		expect(gen.value).toBe("transparent");

		const p2 = BorderColorParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: border-width property", () => {
	test("length: 2px", () => {
		const p1 = BorderWidthParse.parse("2px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BorderWidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		expect(gen.value).toBe("2px");

		const p2 = BorderWidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("keyword: thin", () => {
		const p1 = BorderWidthParse.parse("thin");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BorderWidthGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		expect(gen.value).toBe("thin");

		const p2 = BorderWidthParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
