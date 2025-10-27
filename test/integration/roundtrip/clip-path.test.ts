// b_path:: test/integration/roundtrip/clip-path.test.ts

/**
 * Round-trip tests for clip-path property
 *
 * Tests verify parse → generate → parse stability for:
 * - Basic shapes (circle, ellipse, polygon)
 */

import { describe, expect, test } from "vitest";
import * as CircleGenerate from "@/generate/clip-path/circle";
import * as EllipseGenerate from "@/generate/clip-path/ellipse";
import * as InsetGenerate from "@/generate/clip-path/inset";
import * as PolygonGenerate from "@/generate/clip-path/polygon";
import * as CircleParse from "@/parse/clip-path/circle";
import * as EllipseParse from "@/parse/clip-path/ellipse";
import * as InsetParse from "@/parse/clip-path/inset";
import * as PolygonParse from "@/parse/clip-path/polygon";

describe("Round-Trip: clip-path shapes", () => {
	test("circle: circle(50%)", () => {
		const p1 = CircleParse.parse("circle(50%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = CircleGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = CircleParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("polygon: polygon(0 0, 100% 0, 100% 100%)", () => {
		const p1 = PolygonParse.parse("polygon(0 0, 100% 0, 100% 100%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = PolygonGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = PolygonParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("ellipse: ellipse(50% 25%)", () => {
		const p1 = EllipseParse.parse("ellipse(50% 25%)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = EllipseGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = EllipseParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});

	test("inset: inset(10px 20px 30px 40px)", () => {
		const p1 = InsetParse.parse("inset(10px 20px 30px 40px)");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = InsetGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = InsetParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
