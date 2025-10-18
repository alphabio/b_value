// b_path:: src/parse/color/oklab.test.ts
import { describe, expect, it } from "vitest";
import * as OKLabGenerator from "@/generate/color/oklab";
import * as OKLabParser from "./oklab";

describe("OKLab Color Parser", () => {
	describe("basic space-separated syntax", () => {
		it("should parse oklab with number lightness", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.2 0.3)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0.5,
					a: -0.2,
					b: 0.3,
				});
			}
		});

		it("should parse oklab with percentage lightness", () => {
			const result = OKLabParser.parse("oklab(50% -0.2 0.3)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0.5,
					a: -0.2,
					b: 0.3,
				});
			}
		});

		it("should parse oklab with positive a and b values", () => {
			const result = OKLabParser.parse("oklab(0.75 0.1 0.2)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0.75,
					a: 0.1,
					b: 0.2,
				});
			}
		});

		it("should parse oklab with zero values", () => {
			const result = OKLabParser.parse("oklab(0 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0,
					a: 0,
					b: 0,
				});
			}
		});
	});

	describe("lightness handling", () => {
		it("should convert percentage lightness to 0-1 range", () => {
			const result = OKLabParser.parse("oklab(100% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(1);
			}
		});

		it("should clamp lightness percentage above 100%", () => {
			const result = OKLabParser.parse("oklab(150% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(1);
			}
		});

		it("should clamp lightness number above 1", () => {
			const result = OKLabParser.parse("oklab(1.5 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(1);
			}
		});

		it("should clamp negative lightness to 0", () => {
			const result = OKLabParser.parse("oklab(-0.1 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(0);
			}
		});
	});

	describe("axis value clamping", () => {
		it("should clamp a value above 0.4", () => {
			const result = OKLabParser.parse("oklab(0.5 0.5 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.a).toBe(0.4);
			}
		});

		it("should clamp a value below -0.4", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.6 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.a).toBe(-0.4);
			}
		});

		it("should clamp b value above 0.4", () => {
			const result = OKLabParser.parse("oklab(0.5 0 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.b).toBe(0.4);
			}
		});

		it("should clamp b value below -0.4", () => {
			const result = OKLabParser.parse("oklab(0.5 0 -0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.b).toBe(-0.4);
			}
		});
	});

	describe("alpha channel", () => {
		it("should parse alpha with number", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.2 0.3 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0.5,
					a: -0.2,
					b: 0.3,
					alpha: 0.5,
				});
			}
		});

		it("should parse alpha with percentage", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.2 0.3 / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("should clamp alpha above 1", () => {
			const result = OKLabParser.parse("oklab(0.5 0 0 / 1.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});

		it("should clamp alpha below 0", () => {
			const result = OKLabParser.parse("oklab(0.5 0 0 / -0.1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("should parse alpha of 0", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.2 0.3 / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});
	});

	describe("edge cases", () => {
		it("should parse white (maximum lightness)", () => {
			const result = OKLabParser.parse("oklab(1 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 1,
					a: 0,
					b: 0,
				});
			}
		});

		it("should parse black (minimum lightness)", () => {
			const result = OKLabParser.parse("oklab(0 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0,
					a: 0,
					b: 0,
				});
			}
		});

		it("should parse decimal values", () => {
			const result = OKLabParser.parse("oklab(0.123 -0.234 0.345)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBeCloseTo(0.123);
				expect(result.value.a).toBeCloseTo(-0.234);
				expect(result.value.b).toBeCloseTo(0.345);
			}
		});

		it("should handle extra whitespace", () => {
			const result = OKLabParser.parse("oklab(  0.5   -0.2   0.3  )");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0.5,
					a: -0.2,
					b: 0.3,
				});
			}
		});
	});

	describe("error handling", () => {
		it("should reject missing values", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.2)");
			expect(result.ok).toBe(false);
		});

		it("should reject too many values before slash", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.2 0.3 0.4)");
			expect(result.ok).toBe(false);
		});

		it("should reject too many values after slash", () => {
			const result = OKLabParser.parse("oklab(0.5 -0.2 0.3 / 0.5 0.6)");
			expect(result.ok).toBe(false);
		});

		it("should reject invalid function name", () => {
			const result = OKLabParser.parse("oklabs(0.5 -0.2 0.3)");
			expect(result.ok).toBe(false);
		});

		it("should reject non-numeric values", () => {
			const result = OKLabParser.parse("oklab(red 0 0)");
			expect(result.ok).toBe(false);
		});

		it("should reject empty function", () => {
			const result = OKLabParser.parse("oklab()");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip (parse -> generate -> parse)", () => {
		it("should round-trip oklab with number lightness", () => {
			const input = "oklab(0.5 -0.2 0.3)";
			const parsed = OKLabParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLabGenerator.toCss(parsed.value);
				const reparsed = OKLabParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklab with percentage lightness (normalizes to number)", () => {
			const input = "oklab(50% -0.2 0.3)";
			const parsed = OKLabParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLabGenerator.toCss(parsed.value);
				const reparsed = OKLabParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklab with alpha", () => {
			const input = "oklab(0.5 -0.2 0.3 / 0.5)";
			const parsed = OKLabParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLabGenerator.toCss(parsed.value);
				const reparsed = OKLabParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklab with clamped values", () => {
			const input = "oklab(1.5 0.5 -0.6)";
			const parsed = OKLabParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLabGenerator.toCss(parsed.value);
				const reparsed = OKLabParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip white", () => {
			const input = "oklab(1 0 0)";
			const parsed = OKLabParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLabGenerator.toCss(parsed.value);
				const reparsed = OKLabParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip black", () => {
			const input = "oklab(0 0 0)";
			const parsed = OKLabParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLabGenerator.toCss(parsed.value);
				const reparsed = OKLabParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
