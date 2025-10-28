// b_path:: test/integration/roundtrip/timing.test.ts
import { describe, expect, test } from "vitest";
import * as TimingFunctionGenerate from "@/generate/animation/timing-function";
import * as DurationGenerate from "@/generate/transition/duration";
import * as TimingFunctionParse from "@/parse/animation/timing-function";
import * as DurationParse from "@/parse/transition/duration";

/**
 * Round-trip tests for timing-related properties.
 * Tests: parse → IR → generate → parse → IR (should match)
 */

describe("Round-Trip: animation-timing-function", () => {
	test("keyword: ease-in-out", () => {
		const p1 = TimingFunctionParse.parse("ease-in-out");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TimingFunctionGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TimingFunctionParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("cubic-bezier: cubic-bezier(0.42, 0, 0.58, 1)", () => {
		const p1 = TimingFunctionParse.parse("cubic-bezier(0.42, 0, 0.58, 1)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TimingFunctionGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TimingFunctionParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: transition-duration", () => {
	test("single: 0.3s", () => {
		const p1 = DurationParse.parse("0.3s");
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

	test("multiple: 0.3s, 1s, 200ms", () => {
		const p1 = DurationParse.parse("0.3s, 1s, 200ms");
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
