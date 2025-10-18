// b_path:: src/parse/color/lab.test.ts
import { describe, expect, it } from "vitest";
import type { LABColor } from "@/core/types/color";
import * as LABGenerator from "@/generate/color/lab";
import * as LABParser from "./lab";

describe("LAB Color Parser", () => {
	describe("basic space-separated syntax", () => {
		it("should parse lab with percentage lightness", () => {
			const result = LABParser.parse("lab(50% -20 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
				});
			}
		});

		it("should parse lab with number lightness", () => {
			const result = LABParser.parse("lab(50 -20 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
				});
			}
		});

		it("should parse lab with positive a and b values", () => {
			const result = LABParser.parse("lab(75% 40 60)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 75,
					a: 40,
					b: 60,
				});
			}
		});

		it("should parse lab with zero values", () => {
			const result = LABParser.parse("lab(0% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 0,
					a: 0,
					b: 0,
				});
			}
		});
	});

	describe("lightness handling", () => {
		it("should clamp lightness percentage above 100%", () => {
			const result = LABParser.parse("lab(150% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(100);
			}
		});

		it("should clamp lightness number above 100", () => {
			const result = LABParser.parse("lab(120 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(100);
			}
		});

		it("should clamp negative lightness to 0", () => {
			const result = LABParser.parse("lab(-10% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(0);
			}
		});
	});

	describe("axis value clamping", () => {
		it("should clamp a value above 125", () => {
			const result = LABParser.parse("lab(50% 150 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.a).toBe(125);
			}
		});

		it("should clamp a value below -125", () => {
			const result = LABParser.parse("lab(50% -200 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.a).toBe(-125);
			}
		});

		it("should clamp b value above 125", () => {
			const result = LABParser.parse("lab(50% 0 200)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.b).toBe(125);
			}
		});

		it("should clamp b value below -125", () => {
			const result = LABParser.parse("lab(50% 0 -150)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.b).toBe(-125);
			}
		});
	});

	describe("alpha channel", () => {
		it("should parse lab with alpha as number", () => {
			const result = LABParser.parse("lab(50% -20 30 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
					alpha: 0.5,
				});
			}
		});

		it("should parse lab with alpha as percentage", () => {
			const result = LABParser.parse("lab(50% -20 30 / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
					alpha: 0.5,
				});
			}
		});

		it("should parse lab with alpha 0", () => {
			const result = LABParser.parse("lab(50% -20 30 / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("should parse lab with alpha 1", () => {
			const result = LABParser.parse("lab(50% -20 30 / 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});

		it("should parse lab with alpha 100%", () => {
			const result = LABParser.parse("lab(50% -20 30 / 100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});
	});

	describe("edge cases", () => {
		it("should parse pure white (L=100, a=0, b=0)", () => {
			const result = LABParser.parse("lab(100% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 100,
					a: 0,
					b: 0,
				});
			}
		});

		it("should parse pure black (L=0, a=0, b=0)", () => {
			const result = LABParser.parse("lab(0% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 0,
					a: 0,
					b: 0,
				});
			}
		});

		it("should parse decimal values", () => {
			const result = LABParser.parse("lab(53.5% -12.3 45.7)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBeCloseTo(53.5);
				expect(result.value.a).toBeCloseTo(-12.3);
				expect(result.value.b).toBeCloseTo(45.7);
			}
		});

		it("should handle extra whitespace", () => {
			const result = LABParser.parse("lab(  50%   -20   30  )");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
				});
			}
		});
	});

	describe("error handling", () => {
		it("should reject invalid function name", () => {
			const result = LABParser.parse("rgb(50% 0 0)");
			expect(result.ok).toBe(false);
		});

		it("should reject missing values", () => {
			const result = LABParser.parse("lab(50% -20)");
			expect(result.ok).toBe(false);
		});

		it("should reject too many values without alpha", () => {
			const result = LABParser.parse("lab(50% -20 30 40)");
			expect(result.ok).toBe(false);
		});

		it("should reject invalid alpha value > 1", () => {
			const result = LABParser.parse("lab(50% -20 30 / 1.5)");
			expect(result.ok).toBe(false);
		});

		it("should reject invalid alpha percentage > 100%", () => {
			const result = LABParser.parse("lab(50% -20 30 / 150%)");
			expect(result.ok).toBe(false);
		});

		it("should reject non-numeric values", () => {
			const result = LABParser.parse("lab(50% abc 30)");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip with generator", () => {
		const testCases: Array<{ input: string; expected: LABColor }> = [
			{
				input: "lab(50 -20 30)",
				expected: { kind: "lab", l: 50, a: -20, b: 30 },
			},
			{
				input: "lab(75 40 60)",
				expected: { kind: "lab", l: 75, a: 40, b: 60 },
			},
			{
				input: "lab(0 0 0)",
				expected: { kind: "lab", l: 0, a: 0, b: 0 },
			},
			{
				input: "lab(100 0 0)",
				expected: { kind: "lab", l: 100, a: 0, b: 0 },
			},
			{
				input: "lab(50 -20 30 / 0.5)",
				expected: { kind: "lab", l: 50, a: -20, b: 30, alpha: 0.5 },
			},
			{
				input: "lab(50 -20 30 / 0)",
				expected: { kind: "lab", l: 50, a: -20, b: 30, alpha: 0 },
			},
		];

		for (const { input, expected } of testCases) {
			it(`should round-trip: ${input}`, () => {
				const parseResult = LABParser.parse(input);
				expect(parseResult.ok).toBe(true);
				if (parseResult.ok) {
					expect(parseResult.value).toEqual(expected);
					const generated = LABGenerator.toCss(parseResult.value);
					const reparsed = LABParser.parse(generated);
					expect(reparsed.ok).toBe(true);
					if (reparsed.ok) {
						expect(reparsed.value).toEqual(expected);
					}
				}
			});
		}
	});
});
