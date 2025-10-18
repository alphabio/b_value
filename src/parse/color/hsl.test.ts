// b_path:: src/parse/color/hsl.test.ts
import { describe, expect, it } from "vitest";
import * as Gen from "@/generate/color/hsl";
import * as HSL from "./hsl";

describe("hsl color parser", () => {
	describe("modern space-separated syntax", () => {
		it("parses hsl(120 100% 50%)", () => {
			const result = HSL.parse("hsl(120 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hsl");
				expect(result.value.h).toBe(120);
				expect(result.value.s).toBe(100);
				expect(result.value.l).toBe(50);
				expect(result.value.alpha).toBeUndefined();
			}
		});

		it("parses hsl(0 0% 0%) - black", () => {
			const result = HSL.parse("hsl(0 0% 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
				expect(result.value.s).toBe(0);
				expect(result.value.l).toBe(0);
			}
		});

		it("parses hsl(0 0% 100%) - white", () => {
			const result = HSL.parse("hsl(0 0% 100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
				expect(result.value.s).toBe(0);
				expect(result.value.l).toBe(100);
			}
		});

		it("parses hsl(240 100% 50%) - blue", () => {
			const result = HSL.parse("hsl(240 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(240);
				expect(result.value.s).toBe(100);
				expect(result.value.l).toBe(50);
			}
		});
	});

	describe("angle units", () => {
		it("parses hsl(120deg 100% 50%)", () => {
			const result = HSL.parse("hsl(120deg 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(120);
			}
		});

		it("parses hsl(1turn 100% 50%)", () => {
			const result = HSL.parse("hsl(1turn 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0); // 360 degrees wraps to 0
			}
		});

		it("parses hsl(0.5turn 100% 50%)", () => {
			const result = HSL.parse("hsl(0.5turn 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180);
			}
		});

		it("parses hsl(200grad 100% 50%)", () => {
			const result = HSL.parse("hsl(200grad 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(180); // 200grad = 180deg
			}
		});

		it("parses hsl(3.14159rad 100% 50%)", () => {
			const result = HSL.parse("hsl(3.14159rad 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBeCloseTo(180, 0); // π rad ≈ 180deg
			}
		});

		it("parses hsl(1.57rad 100% 50%)", () => {
			const result = HSL.parse("hsl(1.57rad 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBeCloseTo(90, 0); // π/2 rad ≈ 90deg
			}
		});
	});

	describe("hue wrapping", () => {
		it("wraps 360deg to 0", () => {
			const result = HSL.parse("hsl(360 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});

		it("wraps 720deg to 0", () => {
			const result = HSL.parse("hsl(720 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});

		it("wraps 450deg to 90deg", () => {
			const result = HSL.parse("hsl(450 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(90);
			}
		});

		it("wraps negative -90deg to 270deg", () => {
			const result = HSL.parse("hsl(-90 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(270);
			}
		});

		it("wraps negative -360deg to 0", () => {
			const result = HSL.parse("hsl(-360 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(0);
			}
		});

		it("wraps negative -450deg to 270deg", () => {
			const result = HSL.parse("hsl(-450 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(270);
			}
		});
	});

	describe("modern syntax with alpha", () => {
		it("parses hsl(120 100% 50% / 0.5)", () => {
			const result = HSL.parse("hsl(120 100% 50% / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(120);
				expect(result.value.s).toBe(100);
				expect(result.value.l).toBe(50);
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("parses hsl(120 100% 50% / 0)", () => {
			const result = HSL.parse("hsl(120 100% 50% / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("parses hsl(120 100% 50% / 1)", () => {
			const result = HSL.parse("hsl(120 100% 50% / 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});

		it("parses hsl(120 100% 50% / 50%)", () => {
			const result = HSL.parse("hsl(120 100% 50% / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.5);
			}
		});
	});

	describe("legacy comma-separated syntax", () => {
		it("parses hsl(120, 100%, 50%)", () => {
			const result = HSL.parse("hsl(120, 100%, 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(120);
				expect(result.value.s).toBe(100);
				expect(result.value.l).toBe(50);
			}
		});

		it("parses hsl(240, 50%, 75%)", () => {
			const result = HSL.parse("hsl(240, 50%, 75%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(240);
				expect(result.value.s).toBe(50);
				expect(result.value.l).toBe(75);
			}
		});

		it("parses hsla(120, 100%, 50%, 0.5)", () => {
			const result = HSL.parse("hsla(120, 100%, 50%, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(120);
				expect(result.value.s).toBe(100);
				expect(result.value.l).toBe(50);
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("parses hsla(240, 50%, 75%, 0.25)", () => {
			const result = HSL.parse("hsla(240, 50%, 75%, 0.25)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.h).toBe(240);
				expect(result.value.s).toBe(50);
				expect(result.value.l).toBe(75);
				expect(result.value.alpha).toBe(0.25);
			}
		});
	});

	describe("percentage clamping", () => {
		it("clamps saturation > 100%", () => {
			const result = HSL.parse("hsl(120 150% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.s).toBe(100); // Clamped
			}
		});

		it("clamps saturation < 0%", () => {
			const result = HSL.parse("hsl(120 -10% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.s).toBe(0); // Clamped
			}
		});

		it("clamps lightness > 100%", () => {
			const result = HSL.parse("hsl(120 100% 150%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(100); // Clamped
			}
		});

		it("clamps lightness < 0%", () => {
			const result = HSL.parse("hsl(120 100% -10%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.l).toBe(0); // Clamped
			}
		});
	});

	describe("error handling", () => {
		it("rejects missing function", () => {
			const result = HSL.parse("120 100% 50%");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("No function found");
			}
		});

		it("rejects too few arguments", () => {
			const result = HSL.parse("hsl(120 100%)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected 3 HSL values");
			}
		});

		it("rejects alpha > 1", () => {
			const result = HSL.parse("hsl(120 100% 50% / 1.5)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Alpha value must be between 0 and 1");
			}
		});

		it("rejects negative alpha", () => {
			const result = HSL.parse("hsl(120 100% 50% / -0.5)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Alpha value must be between 0 and 1");
			}
		});

		it("rejects invalid syntax", () => {
			const result = HSL.parse("hsl(");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip accuracy", () => {
		it("maintains hsl(120 100% 50%)", () => {
			const result = HSL.parse("hsl(120 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(120 100% 50%)");
			}
		});

		it("maintains hsl(240 50% 75%)", () => {
			const result = HSL.parse("hsl(240 50% 75%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(240 50% 75%)");
			}
		});

		it("maintains alpha hsl(120 100% 50% / 0.5)", () => {
			const result = HSL.parse("hsl(120 100% 50% / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(120 100% 50% / 0.5)");
			}
		});

		it("normalizes comma syntax to space syntax", () => {
			const result = HSL.parse("hsl(120, 100%, 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(120 100% 50%)");
			}
		});

		it("normalizes hsla to hsl", () => {
			const result = HSL.parse("hsla(120, 100%, 50%, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(120 100% 50% / 0.5)");
			}
		});

		it("normalizes angle units to degrees", () => {
			const result = HSL.parse("hsl(0.5turn 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(180 100% 50%)");
			}
		});

		it("normalizes wrapped hue", () => {
			const result = HSL.parse("hsl(450 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(90 100% 50%)");
			}
		});

		it("normalizes negative hue", () => {
			const result = HSL.parse("hsl(-90 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(270 100% 50%)");
			}
		});

		it("omits alpha when 1", () => {
			const result = HSL.parse("hsl(120 100% 50% / 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("hsl(120 100% 50%)");
			}
		});
	});
});
