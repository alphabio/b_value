// b_path:: test/integration/roundtrip/animation.test.ts

/**
 * Round-trip tests for animation properties
 *
 * Tests verify parse → generate → parse stability for:
 * - animation-duration
 * - animation-delay
 * - animation-iteration-count
 * - animation-direction
 * - animation-fill-mode
 */

import { describe, expect, test } from "vitest";
import * as DelayGenerate from "@/generate/animation/delay";
import * as DirectionGenerate from "@/generate/animation/direction";
import * as DurationGenerate from "@/generate/animation/duration";
import * as FillModeGenerate from "@/generate/animation/fill-mode";
import * as IterationCountGenerate from "@/generate/animation/iteration-count";
import * as DelayParse from "@/parse/animation/delay";
import * as DirectionParse from "@/parse/animation/direction";
import * as DurationParse from "@/parse/animation/duration";
import * as FillModeParse from "@/parse/animation/fill-mode";
import * as IterationCountParse from "@/parse/animation/iteration-count";

describe("Round-Trip: animation-duration", () => {
	test("time value: 2s", () => {
		const p1 = DurationParse.parse("2s");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DurationGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DurationParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("milliseconds: 500ms", () => {
		const p1 = DurationParse.parse("500ms");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DurationGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DurationParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: animation-delay", () => {
	test("positive delay: 1s", () => {
		const p1 = DelayParse.parse("1s");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DelayGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DelayParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("negative delay: -500ms", () => {
		const p1 = DelayParse.parse("-500ms");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DelayGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DelayParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: animation-iteration-count", () => {
	test("keyword: infinite", () => {
		const p1 = IterationCountParse.parse("infinite");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = IterationCountGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = IterationCountParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("number: 3", () => {
		const p1 = IterationCountParse.parse("3");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = IterationCountGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = IterationCountParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: animation-direction", () => {
	test("keyword: alternate", () => {
		const p1 = DirectionParse.parse("alternate");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = DirectionGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = DirectionParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: animation-fill-mode", () => {
	test("keyword: forwards", () => {
		const p1 = FillModeParse.parse("forwards");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FillModeGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FillModeParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
