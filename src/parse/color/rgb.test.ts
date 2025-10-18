// b_path:: src/parse/color/rgb.test.ts
import { describe, expect, it } from "vitest";
import * as Gen from "@/generate/color/rgb";
import * as RGB from "./rgb";

describe("rgb color parser", () => {
	describe("modern space-separated syntax", () => {
		it("parses rgb(255 0 0)", () => {
			const result = RGB.parse("rgb(255 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("rgb");
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
				expect(result.value.alpha).toBeUndefined();
			}
		});

		it("parses rgb(0 128 255)", () => {
			const result = RGB.parse("rgb(0 128 255)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(0);
				expect(result.value.g).toBe(128);
				expect(result.value.b).toBe(255);
			}
		});

		it("parses rgb(100 200 50)", () => {
			const result = RGB.parse("rgb(100 200 50)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(100);
				expect(result.value.g).toBe(200);
				expect(result.value.b).toBe(50);
			}
		});

		it("parses black rgb(0 0 0)", () => {
			const result = RGB.parse("rgb(0 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(0);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
			}
		});

		it("parses white rgb(255 255 255)", () => {
			const result = RGB.parse("rgb(255 255 255)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(255);
				expect(result.value.b).toBe(255);
			}
		});
	});

	describe("modern syntax with alpha (slash)", () => {
		it("parses rgb(255 0 0 / 0.5)", () => {
			const result = RGB.parse("rgb(255 0 0 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("parses rgb(100 200 50 / 0)", () => {
			const result = RGB.parse("rgb(100 200 50 / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("parses rgb(100 200 50 / 1)", () => {
			const result = RGB.parse("rgb(100 200 50 / 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});

		it("parses rgb(255 0 0 / 0.25)", () => {
			const result = RGB.parse("rgb(255 0 0 / 0.25)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.25);
			}
		});

		it("parses rgb(255 0 0 / 0.75)", () => {
			const result = RGB.parse("rgb(255 0 0 / 0.75)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.75);
			}
		});
	});

	describe("modern syntax with percentage alpha", () => {
		it("parses rgb(255 0 0 / 50%)", () => {
			const result = RGB.parse("rgb(255 0 0 / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("parses rgb(255 0 0 / 0%)", () => {
			const result = RGB.parse("rgb(255 0 0 / 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0);
			}
		});

		it("parses rgb(255 0 0 / 100%)", () => {
			const result = RGB.parse("rgb(255 0 0 / 100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});
	});

	describe("legacy comma-separated syntax", () => {
		it("parses rgb(255, 0, 0)", () => {
			const result = RGB.parse("rgb(255, 0, 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
				expect(result.value.alpha).toBeUndefined();
			}
		});

		it("parses rgb(100, 200, 50)", () => {
			const result = RGB.parse("rgb(100, 200, 50)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(100);
				expect(result.value.g).toBe(200);
				expect(result.value.b).toBe(50);
			}
		});

		it("parses rgba(255, 0, 0, 0.5)", () => {
			const result = RGB.parse("rgba(255, 0, 0, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("parses rgba(100, 200, 50, 0.25)", () => {
			const result = RGB.parse("rgba(100, 200, 50, 0.25)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(100);
				expect(result.value.g).toBe(200);
				expect(result.value.b).toBe(50);
				expect(result.value.alpha).toBe(0.25);
			}
		});

		it("parses rgba(0, 0, 0, 1)", () => {
			const result = RGB.parse("rgba(0, 0, 0, 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(1);
			}
		});
	});

	describe("percentage values", () => {
		it("parses rgb(100% 0% 0%)", () => {
			const result = RGB.parse("rgb(100% 0% 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
			}
		});

		it("parses rgb(50% 50% 50%)", () => {
			const result = RGB.parse("rgb(50% 50% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(128);
				expect(result.value.g).toBe(128);
				expect(result.value.b).toBe(128);
			}
		});

		it("parses rgb(0% 100% 50%)", () => {
			const result = RGB.parse("rgb(0% 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(0);
				expect(result.value.g).toBe(255);
				expect(result.value.b).toBe(128);
			}
		});

		it("parses rgb(100%, 0%, 0%) with commas", () => {
			const result = RGB.parse("rgb(100%, 0%, 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
			}
		});

		it("parses rgb(100% 0% 0% / 50%)", () => {
			const result = RGB.parse("rgb(100% 0% 0% / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
				expect(result.value.alpha).toBe(0.5);
			}
		});
	});

	describe("decimal values", () => {
		it("parses rgb(255.5 128.7 64.2)", () => {
			const result = RGB.parse("rgb(255.5 128.7 64.2)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				// Should round and clamp to valid range
				expect(result.value.r).toBe(255); // Clamped to 255
				expect(result.value.g).toBe(129);
				expect(result.value.b).toBe(64);
			}
		});

		it("parses rgb(100.1 200.9 50.5)", () => {
			const result = RGB.parse("rgb(100.1 200.9 50.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(100);
				expect(result.value.g).toBe(201);
				expect(result.value.b).toBe(51);
			}
		});

		it("clamps values > 255", () => {
			const result = RGB.parse("rgb(300 128 50)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255); // Clamped
			}
		});

		it("clamps negative values", () => {
			const result = RGB.parse("rgb(-10 128 50)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(0); // Clamped
			}
		});
	});

	describe("error handling", () => {
		it("rejects alpha > 1", () => {
			const result = RGB.parse("rgb(255 0 0 / 1.5)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Alpha value must be between 0 and 1");
			}
		});

		it("rejects negative alpha", () => {
			const result = RGB.parse("rgb(255 0 0 / -0.5)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Alpha value must be between 0 and 1");
			}
		});

		it("rejects alpha percentage > 100%", () => {
			const result = RGB.parse("rgb(255 0 0 / 150%)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("must be between 0% and 100%");
			}
		});

		it("rejects too few arguments", () => {
			const result = RGB.parse("rgb(255 0)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected 3 RGB values");
			}
		});

		it("rejects too many arguments", () => {
			const result = RGB.parse("rgb(255 0 0 0)");
			expect(result.ok).toBe(false);
		});

		it("rejects missing function", () => {
			const result = RGB.parse("255 0 0");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("No function found");
			}
		});

		it("rejects invalid syntax", () => {
			const result = RGB.parse("rgb(");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip accuracy", () => {
		it("maintains rgb(255 0 0)", () => {
			const result = RGB.parse("rgb(255 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(255 0 0)");
			}
		});

		it("maintains rgb(100 200 50)", () => {
			const result = RGB.parse("rgb(100 200 50)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(100 200 50)");
			}
		});

		it("maintains alpha rgb(255 0 0 / 0.5)", () => {
			const result = RGB.parse("rgb(255 0 0 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(255 0 0 / 0.5)");
			}
		});

		it("normalizes comma syntax to space syntax", () => {
			const result = RGB.parse("rgb(255, 0, 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(255 0 0)");
			}
		});

		it("normalizes rgba to rgb", () => {
			const result = RGB.parse("rgba(255, 0, 0, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(255 0 0 / 0.5)");
			}
		});

		it("normalizes percentages to integers", () => {
			const result = RGB.parse("rgb(100% 0% 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(255 0 0)");
			}
		});

		it("omits alpha when 1", () => {
			const result = RGB.parse("rgb(255 0 0 / 1)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(255 0 0)");
			}
		});

		it("rounds decimal values", () => {
			const result = RGB.parse("rgb(100.4 200.6 50.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("rgb(100 201 51)");
			}
		});
	});

	describe("edge cases", () => {
		it("parses gray rgb(128 128 128)", () => {
			const result = RGB.parse("rgb(128 128 128)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(128);
				expect(result.value.g).toBe(128);
				expect(result.value.b).toBe(128);
			}
		});

		it("parses transparent black rgb(0 0 0 / 0)", () => {
			const result = RGB.parse("rgb(0 0 0 / 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(0);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
				expect(result.value.alpha).toBe(0);
			}
		});

		it("parses with extra whitespace", () => {
			const result = RGB.parse("rgb(  255   0   0  )");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
			}
		});

		it("parses with mixed case function name", () => {
			const result = RGB.parse("RGB(255 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
			}
		});

		it("parses RGBA with mixed case", () => {
			const result = RGB.parse("RGBA(255, 0, 0, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.alpha).toBe(0.5);
			}
		});

		it("handles zero values", () => {
			const result = RGB.parse("rgb(0 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(0);
				expect(result.value.g).toBe(0);
				expect(result.value.b).toBe(0);
			}
		});

		it("handles max values", () => {
			const result = RGB.parse("rgb(255 255 255)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(255);
				expect(result.value.g).toBe(255);
				expect(result.value.b).toBe(255);
			}
		});

		it("handles mid-range values", () => {
			const result = RGB.parse("rgb(127 127 127)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.r).toBe(127);
				expect(result.value.g).toBe(127);
				expect(result.value.b).toBe(127);
			}
		});
	});
});
