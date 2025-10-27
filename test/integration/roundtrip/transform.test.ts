// b_path:: test/integration/roundtrip/transform.test.ts

/**
 * Round-trip tests for transform property
 *
 * Tests verify parse → generate → parse stability for:
 * - Individual transform functions (translate, rotate, scale)
 * - Multiple transform functions
 */

import { describe, expect, test } from "vitest";
import * as TransformGenerate from "@/generate/transform/transform";
import * as TransformParse from "@/parse/transform/transform";

describe("Round-Trip: transform property", () => {
	test("single transform: translate(10px, 20px)", () => {
		const p1 = TransformParse.parse("translate(10px, 20px)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		// Re-parse and verify IR is identical
		const p2 = TransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("rotate: rotate(45deg)", () => {
		const p1 = TransformParse.parse("rotate(45deg)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("scale: scale(1.5)", () => {
		const p1 = TransformParse.parse("scale(1.5)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("multiple transforms: translate(10px, 20px) rotate(45deg)", () => {
		const p1 = TransformParse.parse("translate(10px, 20px) rotate(45deg)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("skew: skewX(10deg)", () => {
		const p1 = TransformParse.parse("skewX(10deg)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("translateX: translateX(50px)", () => {
		const p1 = TransformParse.parse("translateX(50px)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("scaleX and scaleY: scale(2, 0.5)", () => {
		const p1 = TransformParse.parse("scale(2, 0.5)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = TransformGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = TransformParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
