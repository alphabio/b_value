// b_path:: src/parse/color/oklch.test.ts
import { describe, expect, it } from "vitest";
import * as OKLCHGenerator from "@/generate/color/oklch";
import * as OKLCHParser from "./oklch";

describe("OKLCH Color Parser", () => {
	describe("basic space-separated syntax", () => {
		it("should parse oklch with number lightness", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
				});
			}
		});

		it("should parse oklch with percentage lightness", () => {
			const result = OKLCHParser.parse("oklch(50% 0.2 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
				});
			}
		});

		it("should parse oklch with unitless hue", () => {
			const result = OKLCHParser.parse("oklch(0.75 0.15 270)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0.75,
					c: 0.15,
					h: 270,
				});
			}
		});

		it("should parse oklch with zero values", () => {
			const result = OKLCHParser.parse("oklch(0 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0,
					c: 0,
					h: 0,
				});
			}
		});
	});

	describe("angle units", () => {
		it("should parse hue with deg unit", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 180deg)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("should parse hue with turn unit", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 0.5turn)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("should parse hue with rad unit", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 3.14159rad)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBeCloseTo(180, 0);
			}
		});

		it("should parse hue with grad unit", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 200grad)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("should parse hue with 1turn", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 1turn)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0); // 360 wraps to 0
			}
		});
	});

	describe("hue wrapping", () => {
		it("should wrap hue 360deg to 0", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 360)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});

		it("should wrap hue 450deg to 90deg", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 450)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(90);
			}
		});

		it("should wrap hue 720deg to 0", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 720)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});

		it("should wrap negative hue -90deg to 270deg", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 -90)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(270);
			}
		});

		it("should wrap negative hue -360deg to 0", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 -360)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});
	});

	describe("lightness handling", () => {
		it("should convert percentage lightness to 0-1 range", () => {
			const result = OKLCHParser.parse("oklch(100% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(1);
			}
		});

		it("should clamp lightness percentage above 100%", () => {
			const result = OKLCHParser.parse("oklch(150% 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(1);
			}
		});

		it("should clamp lightness number above 1", () => {
			const result = OKLCHParser.parse("oklch(1.5 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(1);
			}
		});

		it("should clamp negative lightness to 0", () => {
			const result = OKLCHParser.parse("oklch(-0.1 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(0);
			}
		});
	});

	describe("chroma clamping", () => {
		it("should clamp chroma above 0.4", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.8 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.c).toBe(0.4);
			}
		});

		it("should clamp negative chroma to 0", () => {
			const result = OKLCHParser.parse("oklch(0.5 -0.1 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.c).toBe(0);
			}
		});

		it("should accept chroma of 0", () => {
			const result = OKLCHParser.parse("oklch(0.5 0 180)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.c).toBe(0);
			}
		});
	});

	describe("alpha channel", () => {
		it("should parse alpha with number", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 180 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
					alpha: 0.5,
				});
			}
		});

		it("should parse alpha with percentage", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 180 / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("should clamp alpha above 1", () => {
			const result = OKLCHParser.parse("oklch(0.5 0 0 / 1.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});

		it("should clamp alpha below 0", () => {
			const result = OKLCHParser.parse("oklch(0.5 0 0 / -0.1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("should parse alpha of 0", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 180 / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});
	});

	describe("edge cases", () => {
		it("should parse white (maximum lightness)", () => {
			const result = OKLCHParser.parse("oklch(1 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 1,
					c: 0,
					h: 0,
				});
			}
		});

		it("should parse black (minimum lightness)", () => {
			const result = OKLCHParser.parse("oklch(0 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0,
					c: 0,
					h: 0,
				});
			}
		});

		it("should parse decimal values", () => {
			const result = OKLCHParser.parse("oklch(0.123 0.234 123.45)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBeCloseTo(0.123);
				expect(result.value.c).toBeCloseTo(0.234);
				expect(result.value.h).toBeCloseTo(123.45);
			}
		});

		it("should handle extra whitespace", () => {
			const result = OKLCHParser.parse("oklch(  0.5   0.2   180  )");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
				});
			}
		});
	});

	describe("error handling", () => {
		it("should reject missing values", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2)");
			expect(result.ok).toBe(false);
		});

		it("should reject too many values before slash", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 180 90)");
			expect(result.ok).toBe(false);
		});

		it("should reject too many values after slash", () => {
			const result = OKLCHParser.parse("oklch(0.5 0.2 180 / 0.5 0.6)");
			expect(result.ok).toBe(false);
		});

		it("should reject invalid function name", () => {
			const result = OKLCHParser.parse("oklchs(0.5 0.2 180)");
			expect(result.ok).toBe(false);
		});

		it("should reject non-numeric values", () => {
			const result = OKLCHParser.parse("oklch(red 0 0)");
			expect(result.ok).toBe(false);
		});

		it("should reject empty function", () => {
			const result = OKLCHParser.parse("oklch()");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip (parse -> generate -> parse)", () => {
		it("should round-trip oklch with number lightness", () => {
			const input = "oklch(0.5 0.2 180)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklch with percentage lightness (normalizes to number)", () => {
			const input = "oklch(50% 0.2 180)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklch with angle units (normalizes to unitless)", () => {
			const input = "oklch(0.5 0.2 0.5turn)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklch with alpha", () => {
			const input = "oklch(0.5 0.2 180 / 0.5)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklch with wrapped hue", () => {
			const input = "oklch(0.5 0.2 450)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip oklch with clamped values", () => {
			const input = "oklch(1.5 0.8 -90)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip white", () => {
			const input = "oklch(1 0 0)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip black", () => {
			const input = "oklch(0 0 0)";
			const parsed = OKLCHParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = OKLCHGenerator.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = OKLCHParser.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
