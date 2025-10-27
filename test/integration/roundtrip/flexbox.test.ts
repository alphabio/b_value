// b_path:: test/integration/roundtrip/flexbox.test.ts

/**
 * Round-trip tests for flexbox properties
 *
 * Tests verify parse → generate → parse stability for:
 * - justify-content
 * - align-items
 * - flex-direction
 * - flex-wrap
 */

import { describe, expect, test } from "vitest";
import * as AlignItemsGenerate from "@/generate/flexbox/align-items";
import * as FlexDirectionGenerate from "@/generate/flexbox/flex-direction";
import * as FlexWrapGenerate from "@/generate/flexbox/flex-wrap";
import * as JustifyContentGenerate from "@/generate/flexbox/justify-content";
import * as AlignItemsParse from "@/parse/flexbox/align-items";
import * as FlexDirectionParse from "@/parse/flexbox/flex-direction";
import * as FlexWrapParse from "@/parse/flexbox/flex-wrap";
import * as JustifyContentParse from "@/parse/flexbox/justify-content";

describe("Round-Trip: justify-content", () => {
	test("keyword: space-between", () => {
		const p1 = JustifyContentParse.parse("space-between");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = JustifyContentGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = JustifyContentParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("keyword: space-around", () => {
		const p1 = JustifyContentParse.parse("space-around");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = JustifyContentGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = JustifyContentParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: align-items", () => {
	test("keyword: center", () => {
		const p1 = AlignItemsParse.parse("center");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = AlignItemsGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = AlignItemsParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("keyword: flex-start", () => {
		const p1 = AlignItemsParse.parse("flex-start");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = AlignItemsGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = AlignItemsParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: flex-direction", () => {
	test("keyword: row-reverse", () => {
		const p1 = FlexDirectionParse.parse("row-reverse");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FlexDirectionGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FlexDirectionParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: flex-wrap", () => {
	test("keyword: wrap-reverse", () => {
		const p1 = FlexWrapParse.parse("wrap-reverse");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = FlexWrapGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = FlexWrapParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
