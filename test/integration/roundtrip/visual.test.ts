// b_path:: test/integration/roundtrip/visual.test.ts

/**
 * Round-trip tests for visual properties
 *
 * Tests verify parse → generate → parse stability for:
 * - opacity
 */

import { describe, expect, test } from "vitest";
import * as OpacityGenerate from "@/generate/visual/opacity";
import * as OpacityParse from "@/parse/visual/opacity";

describe("Round-Trip: opacity", () => {
	test("decimal: 0.5", () => {
		const p1 = OpacityParse.parse("0.5");
		expect(p1.ok).toBe(true);
		if (!p1.ok) return;

		const gen = OpacityGenerate.generate(p1.value);
		expect(gen.ok).toBe(true);
		if (!gen.ok) return;

		const p2 = OpacityParse.parse(gen.value);
		expect(p2.ok).toBe(true);
		if (!p2.ok) return;

		expect(p1.value).toEqual(p2.value);
	});
});
