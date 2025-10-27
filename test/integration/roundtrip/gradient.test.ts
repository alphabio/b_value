// b_path:: test/integration/roundtrip/gradient.test.ts

/**
 * Round-trip tests for gradient functions (used in background-image)
 *
 * Tests verify parse → generate → parse stability for:
 * - Linear gradients (simple, with angles, with color stops)
 */

import { describe, expect, test } from "vitest";
import * as LinearGradientGenerate from "@/generate/gradient/linear";
import * as LinearGradientParse from "@/parse/gradient/linear";

describe("Round-Trip: linear-gradient", () => {
	test("simple linear gradient: linear-gradient(red, blue)", () => {
		const p1 = LinearGradientParse.parse("linear-gradient(red, blue)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = LinearGradientGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = LinearGradientParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("gradient with angle: linear-gradient(45deg, red, blue)", () => {
		const p1 = LinearGradientParse.parse("linear-gradient(45deg, red, blue)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = LinearGradientGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = LinearGradientParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("gradient with color stops: linear-gradient(red 0%, blue 100%)", () => {
		const p1 = LinearGradientParse.parse("linear-gradient(red 0%, blue 100%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = LinearGradientGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = LinearGradientParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
