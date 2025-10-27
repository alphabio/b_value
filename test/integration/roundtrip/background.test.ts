// b_path:: test/integration/roundtrip/background.test.ts

/**
 * Round-trip tests for background properties
 *
 * Tests verify parse → generate → parse stability for:
 * - background-repeat
 * - background-size
 * - background-attachment
 * - background-origin
 */

import { describe, expect, test } from "vitest";
import * as AttachmentGenerate from "@/generate/background/attachment";
import * as OriginGenerate from "@/generate/background/origin";
import * as RepeatGenerate from "@/generate/background/repeat";
import * as SizeGenerate from "@/generate/background/size";
import * as AttachmentParse from "@/parse/background/attachment";
import * as OriginParse from "@/parse/background/origin";
import * as RepeatParse from "@/parse/background/repeat";
import * as SizeParse from "@/parse/background/size";

describe("Round-Trip: background-repeat", () => {
	test("keyword: no-repeat", () => {
		const p1 = RepeatParse.parse("no-repeat");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = RepeatGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = RepeatParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("two values: repeat-x", () => {
		const p1 = RepeatParse.parse("repeat-x");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = RepeatGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = RepeatParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: background-size", () => {
	test("keyword: cover", () => {
		const p1 = SizeParse.parse("cover");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = SizeGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = SizeParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("explicit size: 100px", () => {
		const p1 = SizeParse.parse("100px");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = SizeGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = SizeParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: background-attachment", () => {
	test("keyword: fixed", () => {
		const p1 = AttachmentParse.parse("fixed");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = AttachmentGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = AttachmentParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: background-origin", () => {
	test("keyword: border-box", () => {
		const p1 = OriginParse.parse("border-box");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = OriginGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = OriginParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
