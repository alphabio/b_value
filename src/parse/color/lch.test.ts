// b_path:: src/parse/color/lch.test.ts
import { describe, expect, it } from "vitest";
import type { LCHColor } from "@/core/types/color";
import * as LCHGenerator from "@/generate/color/lch";
import * as LCHParser from "./lch";

describe("LCH Color Parser", () => {
	describe("basic space-separated syntax", () => {
		it("should parse lch with percentage lightness", () => {
			const result = LCHParser.parse("lch(50% 50 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 50,
					c: 50,
					h: 180,
				});
			}
		});

		it("should parse lch with number lightness", () => {
			const result = LCHParser.parse("lch(50 50 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 50,
					c: 50,
					h: 180,
				});
			}
		});

		it("should parse lch with unitless hue", () => {
			const result = LCHParser.parse("lch(75% 60 270)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 75,
					c: 60,
					h: 270,
				});
			}
		});

		it("should parse lch with zero values", () => {
			const result = LCHParser.parse("lch(0% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 0,
					c: 0,
					h: 0,
				});
			}
		});
	});

	describe("angle units", () => {
		it("should parse hue with deg unit", () => {
			const result = LCHParser.parse("lch(50% 50 180deg)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("should parse hue with turn unit", () => {
			const result = LCHParser.parse("lch(50% 50 0.5turn)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("should parse hue with rad unit", () => {
			const result = LCHParser.parse("lch(50% 50 3.14159rad)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBeCloseTo(180, 0);
			}
		});

		it("should parse hue with grad unit", () => {
			const result = LCHParser.parse("lch(50% 50 200grad)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("should parse hue with 1turn", () => {
			const result = LCHParser.parse("lch(50% 50 1turn)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0); // 360 wraps to 0
			}
		});
	});

	describe("hue wrapping", () => {
		it("should wrap hue 360deg to 0", () => {
			const result = LCHParser.parse("lch(50% 50 360)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});

		it("should wrap hue 450deg to 90deg", () => {
			const result = LCHParser.parse("lch(50% 50 450)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(90);
			}
		});

		it("should wrap negative hue -90deg to 270deg", () => {
			const result = LCHParser.parse("lch(50% 50 -90)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(270);
			}
		});

		it("should wrap negative hue -180deg to 180deg", () => {
			const result = LCHParser.parse("lch(50% 50 -180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("should wrap large positive hue", () => {
			const result = LCHParser.parse("lch(50% 50 720)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0); // 720 = 2 * 360
			}
		});
	});

	describe("lightness handling", () => {
		it("should clamp lightness percentage above 100%", () => {
			const result = LCHParser.parse("lch(150% 50 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(100);
			}
		});

		it("should clamp lightness number above 100", () => {
			const result = LCHParser.parse("lch(120 50 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(100);
			}
		});

		it("should clamp negative lightness to 0", () => {
			const result = LCHParser.parse("lch(-10% 50 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(0);
			}
		});
	});

	describe("chroma clamping", () => {
		it("should clamp chroma above 150", () => {
			const result = LCHParser.parse("lch(50% 200 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.c).toBe(150);
			}
		});

		it("should clamp negative chroma to 0", () => {
			const result = LCHParser.parse("lch(50% -10 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.c).toBe(0);
			}
		});

		it("should accept chroma at max value 150", () => {
			const result = LCHParser.parse("lch(50% 150 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.c).toBe(150);
			}
		});
	});

	describe("alpha channel", () => {
		it("should parse lch with alpha as number", () => {
			const result = LCHParser.parse("lch(50% 50 180 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 50,
					c: 50,
					h: 180,
					alpha: 0.5,
				});
			}
		});

		it("should parse lch with alpha as percentage", () => {
			const result = LCHParser.parse("lch(50% 50 180 / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 50,
					c: 50,
					h: 180,
					alpha: 0.5,
				});
			}
		});

		it("should parse lch with alpha 0", () => {
			const result = LCHParser.parse("lch(50% 50 180 / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("should parse lch with alpha 1", () => {
			const result = LCHParser.parse("lch(50% 50 180 / 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});

		it("should parse lch with alpha 100%", () => {
			const result = LCHParser.parse("lch(50% 50 180 / 100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});
	});

	describe("edge cases", () => {
		it("should parse pure white (L=100, C=0, H=0)", () => {
			const result = LCHParser.parse("lch(100% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 100,
					c: 0,
					h: 0,
				});
			}
		});

		it("should parse pure black (L=0, C=0, H=0)", () => {
			const result = LCHParser.parse("lch(0% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 0,
					c: 0,
					h: 0,
				});
			}
		});

		it("should parse decimal values", () => {
			const result = LCHParser.parse("lch(53.5% 62.3 135.7)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBeCloseTo(53.5);
				expect(result.value.c).toBeCloseTo(62.3);
				expect(result.value.h).toBeCloseTo(135.7);
			}
		});

		it("should handle extra whitespace", () => {
			const result = LCHParser.parse("lch(  50%   50   180  )");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 50,
					c: 50,
					h: 180,
				});
			}
		});
	});

	describe("error handling", () => {
		it("should reject invalid function name", () => {
			const result = LCHParser.parse("rgb(50% 50 180)");
			expect(result.ok).toBe(false);
		});

		it("should reject missing values", () => {
			const result = LCHParser.parse("lch(50% 50)");
			expect(result.ok).toBe(false);
		});

		it("should reject too many values without alpha", () => {
			const result = LCHParser.parse("lch(50% 50 180 90)");
			expect(result.ok).toBe(false);
		});

		it("should reject invalid alpha value > 1", () => {
			const result = LCHParser.parse("lch(50% 50 180 / 1.5)");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.alpha).toBe(1);
		});

		it("should reject invalid alpha percentage > 100%", () => {
			const result = LCHParser.parse("lch(50% 50 180 / 150%)");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.alpha).toBe(1);
		});

		it("should reject non-numeric values", () => {
			const result = LCHParser.parse("lch(50% abc 180)");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip with generator", () => {
		const testCases: Array<{ input: string; expected: LCHColor }> = [
			{
				input: "lch(50 50 180)",
				expected: { kind: "lch", l: 50, c: 50, h: 180 },
			},
			{
				input: "lch(75 60 270)",
				expected: { kind: "lch", l: 75, c: 60, h: 270 },
			},
			{
				input: "lch(0 0 0)",
				expected: { kind: "lch", l: 0, c: 0, h: 0 },
			},
			{
				input: "lch(100 0 0)",
				expected: { kind: "lch", l: 100, c: 0, h: 0 },
			},
			{
				input: "lch(50 50 180 / 0.5)",
				expected: { kind: "lch", l: 50, c: 50, h: 180, alpha: 0.5 },
			},
			{
				input: "lch(50 50 180 / 0)",
				expected: { kind: "lch", l: 50, c: 50, h: 180, alpha: 0 },
			},
			{
				input: "lch(50 50 90)",
				expected: { kind: "lch", l: 50, c: 50, h: 90 },
			},
			{
				input: "lch(50 50 360)",
				expected: { kind: "lch", l: 50, c: 50, h: 0 }, // wrapped
			},
		];

		for (const { input, expected } of testCases) {
			it(`should round-trip: ${input}`, () => {
				const parseResult = LCHParser.parse(input);
				expect(parseResult.ok).toBe(true);
				if (parseResult.ok) {
					expect(parseResult.value).toEqual(expected);
					const generated = LCHGenerator.generate(parseResult.value);
					expect(generated.ok).toBe(true);
					if (!generated.ok) return;
					const reparsed = LCHParser.parse(generated.value);
					expect(reparsed.ok).toBe(true);
					if (reparsed.ok) {
						expect(reparsed.value).toEqual(expected);
					}
				}
			});
		}
	});
});
