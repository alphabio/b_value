// b_path:: test/integration/roundtrip/shadow.test.ts

/**
 * Round-trip tests for shadow properties
 *
 * Tests verify parse → generate → parse stability for:
 * - box-shadow (basic, inset, multiple)
 * - text-shadow (basic, multiple)
 */

import { describe, expect, test } from "vitest";
import * as BoxShadowGenerate from "@/generate/shadow/box-shadow";
import * as TextShadowGenerate from "@/generate/shadow/text-shadow";
import * as BoxShadowParse from "@/parse/shadow/box-shadow";
import * as TextShadowParse from "@/parse/shadow/text-shadow";

describe("Round-Trip: box-shadow property", () => {
	test("basic shadow: 2px 2px 4px black", () => {
		const p1 = BoxShadowParse.parse("2px 2px 4px black");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BoxShadowGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = BoxShadowParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("inset shadow: inset 0 0 10px rgba(0, 0, 0, 0.5)", () => {
		const p1 = BoxShadowParse.parse("inset 0 0 10px rgba(0, 0, 0, 0.5)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = BoxShadowGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = BoxShadowParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});

describe("Round-Trip: text-shadow property", () => {
	test("basic shadow: 1px 1px 2px black", () => {
		const p1 = TextShadowParse.parse("1px 1px 2px black");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TextShadowGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TextShadowParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("multiple shadows: 1px 1px 2px black, -1px -1px 2px white", () => {
		const p1 = TextShadowParse.parse("1px 1px 2px black, -1px -1px 2px white");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TextShadowGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TextShadowParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
