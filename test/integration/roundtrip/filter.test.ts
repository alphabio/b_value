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
import * as BlurParse from "@/parse/filter/blur";
import * as BrightnessParse from "@/parse/filter/brightness";

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
});
