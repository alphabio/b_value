// b_path:: test/integration/roundtrip/clip-path.test.ts

/**
 * Round-trip tests for clip-path property
 *
 * Tests verify parse → generate → parse stability for:
 * - Basic shapes (circle, ellipse, polygon)
 */

import { describe, expect, test } from "vitest";
import * as CircleGenerate from "@/generate/clip-path/circle";
import * as PolygonGenerate from "@/generate/clip-path/polygon";
import * as CircleParse from "@/parse/clip-path/circle";
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
});
