// b_path:: test/integration/roundtrip/color.test.ts

/**
 * Round-trip tests for color property
 *
 * Tests verify parse → generate → parse stability for:
 * - Named colors (red, blue, etc.)
 * - Hex colors (#ff0000, #f00, etc.)
 * - RGB/RGBA functional notation
 * - HSL functional notation
 */

import { describe, expect, test } from "vitest";
import * as ColorGenerate from "@/generate/color/color";
import * as ColorParse from "@/parse/color/color";

describe("Round-Trip: color property", () => {
	test("named color: red", () => {
		// Parse input
		const p1 = ColorParse.parse("red");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		// Generate CSS
		const gen = ColorGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		// Verify output
		expect(gen.value).toBe("red");

		// Re-parse and verify IR is identical
		const p2 = ColorParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("hex color: #ff0000", () => {
		// Parse input
		const p1 = ColorParse.parse("#ff0000");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		// Generate CSS
		const gen = ColorGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		// NOTE: Hex colors may be normalized (e.g., #ff0000 → #f00 or #FF0000)
		// This is acceptable as long as they represent the same color

		// Re-parse and verify IR is identical
		const p2 = ColorParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("rgb color: rgb(255, 0, 0)", () => {
		// Parse input
		const p1 = ColorParse.parse("rgb(255, 0, 0)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		// Generate CSS
		const gen = ColorGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		// NOTE: RGB may normalize to different format (rgb(255 0 0) vs rgb(255, 0, 0))
		// This is acceptable as long as they represent the same color

		// Re-parse and verify IR is identical
		const p2 = ColorParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("rgba with alpha: rgba(255, 0, 0, 0.5)", () => {
		const p1 = ColorParse.parse("rgba(255, 0, 0, 0.5)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = ColorGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = ColorParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("hsl color: hsl(0, 100%, 50%)", () => {
		const p1 = ColorParse.parse("hsl(0, 100%, 50%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = ColorGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = ColorParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
