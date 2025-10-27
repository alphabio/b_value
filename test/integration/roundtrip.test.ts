// b_path:: test/integration/roundtrip.test.ts

/**
 * Round-trip tests: parse → generate → parse stability
 *
 * These tests verify that:
 * 1. Parse succeeds for valid input
 * 2. Generate produces valid CSS
 * 3. Re-parsing the generated CSS produces identical IR
 *
 * This is the foundation of correctness - if round-trips fail,
 * the library cannot be trusted for bidirectional workflows.
 *
 * Phase 1 (Week 1): Basic properties and values
 * - Colors (named, hex, rgb)
 * - Lengths (px units)
 * - Keywords (auto)
 *
 * References:
 * - .memory/TEST_QUALITY_PLAN.md
 * - .memory/archive/2025-10-25-test-quality-audit/HANDOVER.md
 */

import { describe, expect, test } from "vitest";
import * as BorderColorGenerate from "@/generate/border/color";
import * as BorderWidthGenerate from "@/generate/border/width";
import * as ColorGenerate from "@/generate/color/color";
import * as LinearGradientGenerate from "@/generate/gradient/linear";
import * as HeightGenerate from "@/generate/layout/height";
import * as WidthGenerate from "@/generate/layout/width";
import * as TransformGenerate from "@/generate/transform/transform";
import * as BorderColorParse from "@/parse/border/color";
import * as BorderWidthParse from "@/parse/border/width";
import * as ColorParse from "@/parse/color/color";
import * as LinearGradientParse from "@/parse/gradient/linear";
import * as HeightParse from "@/parse/layout/height";
import * as WidthParse from "@/parse/layout/width";
import * as TransformParse from "@/parse/transform/transform";

describe("Round-Trip: Basic Properties", () => {
	describe("color property", () => {
		test("named color: red", () => {
			// Parse input
			const p1 = ColorParse.parse("red");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			// Generate CSS
			const gen = ColorGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			// Verify output
			expect(gen.value).toBe("red");

			// Re-parse and verify IR is identical
			const p2 = ColorParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("hex color: #ff0000", () => {
			// Parse input
			const p1 = ColorParse.parse("#ff0000");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			// Generate CSS
			const gen = ColorGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			// NOTE: Hex colors may be normalized (e.g., #ff0000 → #f00 or #FF0000)
			// This is acceptable as long as they represent the same color

			// Re-parse and verify IR is identical
			const p2 = ColorParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("rgb color: rgb(255, 0, 0)", () => {
			// Parse input
			const p1 = ColorParse.parse("rgb(255, 0, 0)");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			// Generate CSS
			const gen = ColorGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			// NOTE: RGB may normalize to different format (rgb(255 0 0) vs rgb(255, 0, 0))
			// This is acceptable as long as they represent the same color

			// Re-parse and verify IR is identical
			const p2 = ColorParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("rgba with alpha: rgba(255, 0, 0, 0.5)", () => {
			const p1 = ColorParse.parse("rgba(255, 0, 0, 0.5)");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = ColorGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			const p2 = ColorParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("hsl color: hsl(0, 100%, 50%)", () => {
			const p1 = ColorParse.parse("hsl(0, 100%, 50%)");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = ColorGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			const p2 = ColorParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});
	});

	describe("width property", () => {
		test("length with unit: 100px", () => {
			// Parse input
			const p1 = WidthParse.parse("100px");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			// Generate CSS
			const gen = WidthGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			// Verify output
			expect(gen.value).toBe("100px");

			// Re-parse and verify IR is identical
			const p2 = WidthParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("percentage: 50%", () => {
			const p1 = WidthParse.parse("50%");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = WidthGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			expect(gen.value).toBe("50%");

			const p2 = WidthParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("em unit: 2.5em", () => {
			const p1 = WidthParse.parse("2.5em");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = WidthGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			expect(gen.value).toBe("2.5em");

			const p2 = WidthParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("viewport unit: 80vw", () => {
			const p1 = WidthParse.parse("80vw");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = WidthGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			expect(gen.value).toBe("80vw");

			const p2 = WidthParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});
	});

	describe("height property", () => {
		test("keyword: auto", () => {
			// Parse input
			const p1 = HeightParse.parse("auto");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			// Generate CSS
			const gen = HeightGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			// Verify output
			expect(gen.value).toBe("auto");

			// Re-parse and verify IR is identical
			const p2 = HeightParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});
	});

	describe("border-color property", () => {
		test("named color: blue", () => {
			const p1 = BorderColorParse.parse("blue");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = BorderColorGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			expect(gen.value).toBe("blue");

			const p2 = BorderColorParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("transparent keyword", () => {
			const p1 = BorderColorParse.parse("transparent");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = BorderColorGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			expect(gen.value).toBe("transparent");

			const p2 = BorderColorParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});
	});

	describe("border-width property", () => {
		test("length: 2px", () => {
			const p1 = BorderWidthParse.parse("2px");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = BorderWidthGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			expect(gen.value).toBe("2px");

			const p2 = BorderWidthParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("keyword: thin", () => {
			const p1 = BorderWidthParse.parse("thin");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = BorderWidthGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			expect(gen.value).toBe("thin");

			const p2 = BorderWidthParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});
	});

	describe("transform property", () => {
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
	});

	describe("gradients", () => {
		test("simple linear gradient: linear-gradient(red, blue)", () => {
			const p1 = LinearGradientParse.parse("linear-gradient(red, blue)");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = LinearGradientGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			const p2 = LinearGradientParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("gradient with angle: linear-gradient(45deg, red, blue)", () => {
			const p1 = LinearGradientParse.parse("linear-gradient(45deg, red, blue)");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = LinearGradientGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			const p2 = LinearGradientParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});

		test("gradient with color stops: linear-gradient(red 0%, blue 100%)", () => {
			const p1 = LinearGradientParse.parse("linear-gradient(red 0%, blue 100%)");
			expect(p1.ok).toBe(true);
			if (!p1.ok) return;

			const gen = LinearGradientGenerate.generate(p1.value);
			expect(gen.ok).toBe(true);
			if (!gen.ok) return;

			const p2 = LinearGradientParse.parse(gen.value);
			expect(p2.ok).toBe(true);
			if (!p2.ok) return;

			expect(p1.value).toEqual(p2.value);
		});
	});
});
