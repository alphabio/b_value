// b_path:: src/parse/color/hwb.test.ts
import { describe, expect, it } from "vitest";
import * as Generate from "@/generate/color/hwb";
import * as Parse from "@/parse/color/hwb";

describe("Parse.Color.HWB", () => {
	describe("Basic space-separated syntax", () => {
		it("parses hwb(120 20% 30%)", () => {
			const result = Parse.parse("hwb(120 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hwb",
					h: 120,
					w: 20,
					b: 30,
				});
			}
		});

		it("parses hwb(0 0% 0%) - white", () => {
			const result = Parse.parse("hwb(0 0% 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hwb",
					h: 0,
					w: 0,
					b: 0,
				});
			}
		});

		it("parses hwb(0 100% 0%) - white", () => {
			const result = Parse.parse("hwb(0 100% 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hwb",
					h: 0,
					w: 100,
					b: 0,
				});
			}
		});

		it("parses hwb(0 0% 100%) - black", () => {
			const result = Parse.parse("hwb(0 0% 100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hwb",
					h: 0,
					w: 0,
					b: 100,
				});
			}
		});
	});

	describe("Angle units", () => {
		it("parses hwb(120deg 20% 30%)", () => {
			const result = Parse.parse("hwb(120deg 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(120);
			}
		});

		it("parses hwb(1turn 20% 30%) - 360 degrees", () => {
			const result = Parse.parse("hwb(1turn 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0); // 360 wraps to 0
			}
		});

		it("parses hwb(0.5turn 20% 30%) - 180 degrees", () => {
			const result = Parse.parse("hwb(0.5turn 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("parses hwb(100grad 20% 30%) - 90 degrees", () => {
			const result = Parse.parse("hwb(100grad 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(90);
			}
		});

		it("parses hwb(1.5708rad 20% 30%) - ~90 degrees", () => {
			const result = Parse.parse("hwb(1.5708rad 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBeCloseTo(90, 1);
			}
		});

		it("parses unitless hue as degrees", () => {
			const result = Parse.parse("hwb(240 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(240);
			}
		});
	});

	describe("Hue wrapping", () => {
		it("wraps 360deg to 0", () => {
			const result = Parse.parse("hwb(360 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});

		it("wraps 450deg to 90", () => {
			const result = Parse.parse("hwb(450 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(90);
			}
		});

		it("wraps -90deg to 270", () => {
			const result = Parse.parse("hwb(-90 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(270);
			}
		});

		it("wraps -180deg to 180", () => {
			const result = Parse.parse("hwb(-180 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("wraps 720deg to 0", () => {
			const result = Parse.parse("hwb(720 20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});
	});

	describe("Alpha channel", () => {
		it("parses hwb(120 20% 30% / 0.5)", () => {
			const result = Parse.parse("hwb(120 20% 30% / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hwb",
					h: 120,
					w: 20,
					b: 30,
					alpha: 0.5,
				});
			}
		});

		it("parses hwb(120 20% 30% / 0)", () => {
			const result = Parse.parse("hwb(120 20% 30% / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("parses hwb(120 20% 30% / 1) and omits alpha", () => {
			const result = Parse.parse("hwb(120 20% 30% / 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBeUndefined();
			}
		});

		it("clamps alpha > 1 to 1", () => {
			const result = Parse.parse("hwb(120 20% 30% / 1.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBeUndefined(); // 1 is omitted
			}
		});

		it("clamps alpha < 0 to 0", () => {
			const result = Parse.parse("hwb(120 20% 30% / -0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});
	});

	describe("Percentage clamping", () => {
		it("clamps whiteness > 100% to 100", () => {
			const result = Parse.parse("hwb(120 150% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.w).toBe(100);
			}
		});

		it("clamps whiteness < 0% to 0", () => {
			const result = Parse.parse("hwb(120 -20% 30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.w).toBe(0);
			}
		});

		it("clamps blackness > 100% to 100", () => {
			const result = Parse.parse("hwb(120 20% 150%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.b).toBe(100);
			}
		});

		it("clamps blackness < 0% to 0", () => {
			const result = Parse.parse("hwb(120 20% -30%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.b).toBe(0);
			}
		});
	});

	describe("Error handling", () => {
		it("rejects invalid function name", () => {
			const result = Parse.parse("rgb(120 20% 30%)");
			expect(result.ok).toBe(false);
		});

		it("rejects too few arguments", () => {
			const result = Parse.parse("hwb(120 20%)");
			expect(result.ok).toBe(false);
		});

		it("rejects too many arguments", () => {
			const result = Parse.parse("hwb(120 20% 30% 40%)");
			expect(result.ok).toBe(false);
		});

		it("rejects missing alpha after slash", () => {
			const result = Parse.parse("hwb(120 20% 30% /)");
			expect(result.ok).toBe(false);
		});

		it("rejects non-percentage whiteness", () => {
			const result = Parse.parse("hwb(120 20 30%)");
			expect(result.ok).toBe(false);
		});

		it("rejects non-percentage blackness", () => {
			const result = Parse.parse("hwb(120 20% 30)");
			expect(result.ok).toBe(false);
		});
	});

	describe("Round-trip (parse → generate → parse)", () => {
		it("round-trips hwb(120 20% 30%)", () => {
			const original = "hwb(120 20% 30%)";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe(original);

				const reparsed = Parse.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trips hwb(0 0% 0%)", () => {
			const original = "hwb(0 0% 0%)";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("round-trips hwb(240 50% 10%)", () => {
			const original = "hwb(240 50% 10%)";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("round-trips with alpha", () => {
			const original = "hwb(120 20% 30% / 0.5)";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("normalizes angle units to degrees", () => {
			const input = "hwb(0.5turn 20% 30%)";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe("hwb(180 20% 30%)");
			}
		});

		it("normalizes wrapped hue", () => {
			const input = "hwb(450 20% 30%)";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe("hwb(90 20% 30%)");
			}
		});

		it("normalizes negative hue", () => {
			const input = "hwb(-90 20% 30%)";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe("hwb(270 20% 30%)");
			}
		});

		it("omits alpha when 1", () => {
			const input = "hwb(120 20% 30% / 1)";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				expect(generated).toBe("hwb(120 20% 30%)");
			}
		});
	});
});
