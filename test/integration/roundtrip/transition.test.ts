// b_path:: test/integration/roundtrip/transition.test.ts

/**
 * Round-trip tests for transition properties
 *
 * Tests verify parse → generate → parse stability for:
 * - transition-duration
 * - transition-delay
 * - transition-property
 * - transition-timing-function
 */

import { describe, expect, test } from "vitest";
import * as DelayGenerate from "@/generate/transition/delay";
import * as DurationGenerate from "@/generate/transition/duration";
import * as PropertyGenerate from "@/generate/transition/property";
import * as TimingFunctionGenerate from "@/generate/transition/timing-function";
import * as DelayParse from "@/parse/transition/delay";
import * as DurationParse from "@/parse/transition/duration";
import * as PropertyParse from "@/parse/transition/property";
import * as TimingFunctionParse from "@/parse/transition/timing-function";

describe("Round-Trip: transition-duration", () => {
	test("seconds: 0.3s", () => {
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
});

describe("Round-Trip: transition-delay", () => {
	test("milliseconds: 100ms", () => {
		const p1 = DelayParse.parse("100ms");
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

describe("Round-Trip: transition-property", () => {
	test("keyword: all", () => {
		const p1 = PropertyParse.parse("all");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = PropertyGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = PropertyParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("property name: opacity", () => {
		const p1 = PropertyParse.parse("opacity");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = PropertyGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = PropertyParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: transition-timing-function", () => {
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
});
