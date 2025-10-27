// b_path:: test/integration/roundtrip/gradient.test.ts

/**
 * Round-trip tests for gradient functions (used in background-image)
 *
 * Tests verify parse → generate → parse stability for:
 * - Linear gradients (simple, with angles, with color stops)
 * - Radial gradients (simple, with position)
 * - Conic gradients (simple, with angle)
 */

import { describe, expect, test } from "vitest";
import * as ConicGradientGenerate from "@/generate/gradient/conic";
import * as LinearGradientGenerate from "@/generate/gradient/linear";
import * as RadialGradientGenerate from "@/generate/gradient/radial";
import * as ConicGradientParse from "@/parse/gradient/conic";
import * as LinearGradientParse from "@/parse/gradient/linear";
import * as RadialGradientParse from "@/parse/gradient/radial";

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

describe("Round-Trip: radial-gradient", () => {
	test("simple radial gradient: radial-gradient(circle, red, blue)", () => {
		const p1 = RadialGradientParse.parse("radial-gradient(circle, red, blue)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = RadialGradientGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = RadialGradientParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("gradient with position: radial-gradient(at top left, red, blue)", () => {
		const p1 = RadialGradientParse.parse("radial-gradient(at top left, red, blue)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = RadialGradientGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = RadialGradientParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: conic-gradient", () => {
	test("simple conic gradient: conic-gradient(red, blue)", () => {
		const p1 = ConicGradientParse.parse("conic-gradient(red, blue)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = ConicGradientGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = ConicGradientParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("gradient with angle: conic-gradient(from 90deg, red, blue)", () => {
		const p1 = ConicGradientParse.parse("conic-gradient(from 90deg, red, blue)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = ConicGradientGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = ConicGradientParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
