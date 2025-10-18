// b_path:: src/generate/color/index.test.ts
import { describe, expect, test } from "vitest";
import { toCss } from "./index";

describe("toCss() - master color generator", () => {
	describe("hex colors", () => {
		test("generates 6-digit hex", () => {
			const css = toCss({ kind: "hex", value: "#FF5733" });
			expect(css).toBe("#FF5733");
		});

		test("generates 8-digit hex with alpha", () => {
			const css = toCss({ kind: "hex", value: "#FF573380" });
			expect(css).toBe("#FF573380");
		});
	});

	describe("rgb colors", () => {
		test("generates rgb without alpha", () => {
			const css = toCss({ kind: "rgb", r: 255, g: 87, b: 51 });
			expect(css).toBe("rgb(255 87 51)");
		});

		test("generates rgb with alpha", () => {
			const css = toCss({ kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 });
			expect(css).toBe("rgb(255 0 0 / 0.5)");
		});

		test("omits alpha when 1", () => {
			const css = toCss({ kind: "rgb", r: 255, g: 0, b: 0, alpha: 1 });
			expect(css).toBe("rgb(255 0 0)");
		});
	});

	describe("hsl colors", () => {
		test("generates hsl without alpha", () => {
			const css = toCss({ kind: "hsl", h: 120, s: 100, l: 50 });
			expect(css).toBe("hsl(120 100% 50%)");
		});

		test("generates hsl with alpha", () => {
			const css = toCss({ kind: "hsl", h: 120, s: 100, l: 50, alpha: 0.8 });
			expect(css).toBe("hsl(120 100% 50% / 0.8)");
		});

		test("omits alpha when 1", () => {
			const css = toCss({ kind: "hsl", h: 120, s: 100, l: 50, alpha: 1 });
			expect(css).toBe("hsl(120 100% 50%)");
		});
	});

	describe("hwb colors", () => {
		test("generates hwb without alpha", () => {
			const css = toCss({ kind: "hwb", h: 120, w: 20, b: 30 });
			expect(css).toBe("hwb(120 20% 30%)");
		});

		test("generates hwb with alpha", () => {
			const css = toCss({ kind: "hwb", h: 120, w: 20, b: 30, alpha: 0.5 });
			expect(css).toBe("hwb(120 20% 30% / 0.5)");
		});

		test("omits alpha when 1", () => {
			const css = toCss({ kind: "hwb", h: 120, w: 20, b: 30, alpha: 1 });
			expect(css).toBe("hwb(120 20% 30%)");
		});
	});

	describe("lab colors", () => {
		test("generates lab without alpha", () => {
			const css = toCss({ kind: "lab", l: 50, a: -20, b: 30 });
			expect(css).toBe("lab(50 -20 30)");
		});

		test("generates lab with alpha", () => {
			const css = toCss({ kind: "lab", l: 50, a: -20, b: 30, alpha: 0.7 });
			expect(css).toBe("lab(50 -20 30 / 0.7)");
		});

		test("omits alpha when 1", () => {
			const css = toCss({ kind: "lab", l: 50, a: -20, b: 30, alpha: 1 });
			expect(css).toBe("lab(50 -20 30)");
		});
	});

	describe("lch colors", () => {
		test("generates lch without alpha", () => {
			const css = toCss({ kind: "lch", l: 50, c: 50, h: 180 });
			expect(css).toBe("lch(50 50 180)");
		});

		test("generates lch with alpha", () => {
			const css = toCss({ kind: "lch", l: 50, c: 50, h: 180, alpha: 0.6 });
			expect(css).toBe("lch(50 50 180 / 0.6)");
		});

		test("omits alpha when 1", () => {
			const css = toCss({ kind: "lch", l: 50, c: 50, h: 180, alpha: 1 });
			expect(css).toBe("lch(50 50 180)");
		});
	});

	describe("oklab colors", () => {
		test("generates oklab without alpha", () => {
			const css = toCss({ kind: "oklab", l: 0.5, a: -0.2, b: 0.3 });
			expect(css).toBe("oklab(0.5 -0.2 0.3)");
		});

		test("generates oklab with alpha", () => {
			const css = toCss({
				kind: "oklab",
				l: 0.5,
				a: -0.2,
				b: 0.3,
				alpha: 0.9,
			});
			expect(css).toBe("oklab(0.5 -0.2 0.3 / 0.9)");
		});

		test("omits alpha when 1", () => {
			const css = toCss({ kind: "oklab", l: 0.5, a: -0.2, b: 0.3, alpha: 1 });
			expect(css).toBe("oklab(0.5 -0.2 0.3)");
		});
	});

	describe("oklch colors", () => {
		test("generates oklch without alpha", () => {
			const css = toCss({ kind: "oklch", l: 0.5, c: 0.2, h: 180 });
			expect(css).toBe("oklch(0.5 0.2 180)");
		});

		test("generates oklch with alpha", () => {
			const css = toCss({
				kind: "oklch",
				l: 0.5,
				c: 0.2,
				h: 180,
				alpha: 0.4,
			});
			expect(css).toBe("oklch(0.5 0.2 180 / 0.4)");
		});

		test("omits alpha when 1", () => {
			const css = toCss({ kind: "oklch", l: 0.5, c: 0.2, h: 180, alpha: 1 });
			expect(css).toBe("oklch(0.5 0.2 180)");
		});
	});

	describe("named colors", () => {
		test("generates named color", () => {
			const css = toCss({ kind: "named", name: "red" });
			expect(css).toBe("red");
		});

		test("generates extended color name", () => {
			const css = toCss({ kind: "named", name: "cornflowerblue" });
			expect(css).toBe("cornflowerblue");
		});
	});

	describe("system colors", () => {
		test("generates system color with original casing", () => {
			const css = toCss({ kind: "system", keyword: "ButtonText" });
			expect(css).toBe("ButtonText");
		});

		test("generates lowercase system color", () => {
			const css = toCss({ kind: "system", keyword: "canvas" });
			expect(css).toBe("canvas");
		});
	});

	describe("special colors", () => {
		test("generates transparent", () => {
			const css = toCss({ kind: "special", keyword: "transparent" });
			expect(css).toBe("transparent");
		});

		test("generates currentcolor", () => {
			const css = toCss({ kind: "special", keyword: "currentcolor" });
			expect(css).toBe("currentcolor");
		});
	});

	describe("round-trip accuracy", () => {
		test("hex round-trip", () => {
			const input = { kind: "hex" as const, value: "#FF5733" };
			const css = toCss(input);
			expect(css).toBe("#FF5733");
		});

		test("rgb round-trip", () => {
			const input = { kind: "rgb" as const, r: 255, g: 87, b: 51 };
			const css = toCss(input);
			expect(css).toBe("rgb(255 87 51)");
		});

		test("hsl round-trip", () => {
			const input = { kind: "hsl" as const, h: 120, s: 100, l: 50 };
			const css = toCss(input);
			expect(css).toBe("hsl(120 100% 50%)");
		});

		test("named round-trip", () => {
			const input = { kind: "named" as const, name: "red" };
			const css = toCss(input);
			expect(css).toBe("red");
		});

		test("alpha preservation", () => {
			const input = {
				kind: "rgb" as const,
				r: 255,
				g: 0,
				b: 0,
				alpha: 0.5,
			};
			const css = toCss(input);
			expect(css).toBe("rgb(255 0 0 / 0.5)");
		});
	});
});
