// b_path:: src/parse/color/index.test.ts
import { describe, expect, test } from "vitest";
import { parse } from "./index";

describe("parse() - master color parser", () => {
	describe("hex colors", () => {
		test("parses 6-digit hex", () => {
			const result = parse("#ff5733");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hex",
					value: "#FF5733",
				});
			}
		});

		test("parses 8-digit hex with alpha", () => {
			const result = parse("#ff573380");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hex",
					value: "#FF573380",
				});
			}
		});

		test("parses 3-digit hex", () => {
			const result = parse("#f00");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hex",
					value: "#FF0000",
				});
			}
		});
	});

	describe("rgb colors", () => {
		test("parses modern rgb syntax", () => {
			const result = parse("rgb(255 87 51)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "rgb",
					r: 255,
					g: 87,
					b: 51,
				});
			}
		});

		test("parses rgb with alpha", () => {
			const result = parse("rgb(255 0 0 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "rgb",
					r: 255,
					g: 0,
					b: 0,
					alpha: 0.5,
				});
			}
		});

		test("parses rgba syntax", () => {
			const result = parse("rgba(255, 0, 0, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "rgb",
					r: 255,
					g: 0,
					b: 0,
					alpha: 0.5,
				});
			}
		});
	});

	describe("hsl colors", () => {
		test("parses modern hsl syntax", () => {
			const result = parse("hsl(120 100% 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hsl",
					h: 120,
					s: 100,
					l: 50,
				});
			}
		});

		test("parses hsl with alpha", () => {
			const result = parse("hsl(120 100% 50% / 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hsl",
					h: 120,
					s: 100,
					l: 50,
					alpha: 0.8,
				});
			}
		});

		test("parses hsla syntax", () => {
			const result = parse("hsla(120, 100%, 50%, 0.8)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "hsl",
					h: 120,
					s: 100,
					l: 50,
					alpha: 0.8,
				});
			}
		});
	});

	describe("hwb colors", () => {
		test("parses hwb syntax", () => {
			const result = parse("hwb(120 20% 30%)");
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

		test("parses hwb with alpha", () => {
			const result = parse("hwb(120 20% 30% / 0.5)");
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
	});

	describe("lab colors", () => {
		test("parses lab syntax", () => {
			const result = parse("lab(50 -20 30)");
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

		test("parses lab with alpha", () => {
			const result = parse("lab(50% -20 30 / 0.7)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lab",
					l: 50,
					a: -20,
					b: 30,
					alpha: 0.7,
				});
			}
		});
	});

	describe("lch colors", () => {
		test("parses lch syntax", () => {
			const result = parse("lch(50 50 180)");
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

		test("parses lch with alpha", () => {
			const result = parse("lch(50% 50 180deg / 0.6)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "lch",
					l: 50,
					c: 50,
					h: 180,
					alpha: 0.6,
				});
			}
		});
	});

	describe("oklab colors", () => {
		test("parses oklab syntax", () => {
			const result = parse("oklab(0.5 -0.2 0.3)");
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

		test("parses oklab with alpha", () => {
			const result = parse("oklab(50% -0.2 0.3 / 0.9)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklab",
					l: 0.5,
					a: -0.2,
					b: 0.3,
					alpha: 0.9,
				});
			}
		});
	});

	describe("oklch colors", () => {
		test("parses oklch syntax", () => {
			const result = parse("oklch(0.5 0.2 180)");
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

		test("parses oklch with alpha", () => {
			const result = parse("oklch(50% 0.2 180deg / 0.4)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "oklch",
					l: 0.5,
					c: 0.2,
					h: 180,
					alpha: 0.4,
				});
			}
		});
	});

	describe("named colors", () => {
		test("parses basic color names", () => {
			const result = parse("red");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "named",
					name: "red",
				});
			}
		});

		test("parses extended color names", () => {
			const result = parse("cornflowerblue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "named",
					name: "cornflowerblue",
				});
			}
		});

		test("parses case-insensitive names", () => {
			const result = parse("RebeccaPurple");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "named",
					name: "rebeccapurple",
				});
			}
		});
	});

	describe("system colors", () => {
		test("parses system color keywords", () => {
			const result = parse("ButtonText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "ButtonText",
				});
			}
		});

		test("parses case-insensitive system colors", () => {
			const result = parse("canvas");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "Canvas", // Normalized to canonical casing
				});
			}
		});
	});

	describe("special colors", () => {
		test("parses transparent", () => {
			const result = parse("transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "special",
					keyword: "transparent",
				});
			}
		});

		test("parses currentcolor", () => {
			const result = parse("currentcolor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "special",
					keyword: "currentcolor",
				});
			}
		});

		test("parses case-insensitive special colors", () => {
			const result = parse("TRANSPARENT");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "special",
					keyword: "transparent",
				});
			}
		});
	});

	describe("whitespace handling", () => {
		test("trims leading whitespace", () => {
			const result = parse("  #ff5733");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hex");
			}
		});

		test("trims trailing whitespace", () => {
			const result = parse("red  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("named");
			}
		});

		test("trims both sides", () => {
			const result = parse("  rgb(255 0 0)  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("rgb");
			}
		});
	});

	describe("error handling", () => {
		test("returns error for invalid hex", () => {
			const result = parse("#zzz");
			expect(result.ok).toBe(false);
		});

		test("returns error for invalid named color", () => {
			const result = parse("notacolor");
			expect(result.ok).toBe(false);
		});

		test("returns error for malformed function", () => {
			const result = parse("rgb(255)");
			expect(result.ok).toBe(false);
		});
	});
});
