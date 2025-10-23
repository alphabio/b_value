import { describe, expect, it } from "vitest";
import type { Color } from "@/core/types/color";
import { generateColor } from "./color";

describe("generateColor", () => {
	it("generates hex color", () => {
		const color: Color = { kind: "hex", value: "#ff0000" };
		expect(generateColor(color)).toBe("#ff0000");
	});

	it("generates named color", () => {
		const color: Color = { kind: "named", name: "red" };
		expect(generateColor(color)).toBe("red");
	});

	it("generates rgb color", () => {
		const color: Color = { kind: "rgb", r: 255, g: 0, b: 0 };
		expect(generateColor(color)).toBe("rgb(255 0 0)");
	});

	it("generates rgb color with alpha", () => {
		const color: Color = { kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 };
		expect(generateColor(color)).toBe("rgb(255 0 0 / 0.5)");
	});

	it("generates hsl color", () => {
		const color: Color = { kind: "hsl", h: 0, s: 100, l: 50 };
		expect(generateColor(color)).toBe("hsl(0 100% 50%)");
	});

	it("generates hsl color with alpha", () => {
		const color: Color = { kind: "hsl", h: 0, s: 100, l: 50, alpha: 0.8 };
		expect(generateColor(color)).toBe("hsl(0 100% 50% / 0.8)");
	});

	it("generates hwb color", () => {
		const color: Color = { kind: "hwb", h: 120, w: 0, b: 0 };
		expect(generateColor(color)).toBe("hwb(120 0% 0%)");
	});

	it("generates lab color", () => {
		const color: Color = { kind: "lab", l: 50, a: 0, b: 0 };
		expect(generateColor(color)).toBe("lab(50 0 0)");
	});

	it("generates lch color", () => {
		const color: Color = { kind: "lch", l: 50, c: 50, h: 180 };
		expect(generateColor(color)).toBe("lch(50 50 180)");
	});

	it("generates oklab color", () => {
		const color: Color = { kind: "oklab", l: 0.5, a: 0.1, b: -0.1 };
		expect(generateColor(color)).toBe("oklab(0.5 0.1 -0.1)");
	});

	it("generates oklch color", () => {
		const color: Color = { kind: "oklch", l: 0.5, c: 0.1, h: 90 };
		expect(generateColor(color)).toBe("oklch(0.5 0.1 90)");
	});

	it("generates system color", () => {
		const color: Color = { kind: "system", keyword: "ButtonFace" };
		expect(generateColor(color)).toBe("ButtonFace");
	});

	it("generates special color currentColor", () => {
		const color: Color = { kind: "special", keyword: "currentColor" };
		expect(generateColor(color)).toBe("currentColor");
	});

	it("generates special color transparent", () => {
		const color: Color = { kind: "special", keyword: "transparent" };
		expect(generateColor(color)).toBe("transparent");
	});

	it("generates color() function", () => {
		const color: Color = {
			kind: "color",
			colorSpace: "srgb",
			channels: [1, 0, 0],
		};
		expect(generateColor(color)).toBe("color(srgb 1 0 0)");
	});

	it("generates color() function with alpha", () => {
		const color: Color = {
			kind: "color",
			colorSpace: "display-p3",
			channels: [1, 0, 0],
			alpha: 0.5,
		};
		expect(generateColor(color)).toBe("color(display-p3 1 0 0 / 0.5)");
	});

	it("returns empty string when generator fails", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const color = { kind: "hex" } as any;
		expect(generateColor(color)).toBe("");
	});

	it("handles all color kinds in switch statement", () => {
		const colorKinds: Color["kind"][] = [
			"hex",
			"named",
			"rgb",
			"hsl",
			"hwb",
			"lab",
			"lch",
			"oklab",
			"oklch",
			"system",
			"special",
			"color",
		];

		for (const kind of colorKinds) {
			let color: Color;
			switch (kind) {
				case "hex":
					color = { kind: "hex", value: "#000" };
					break;
				case "named":
					color = { kind: "named", name: "black" };
					break;
				case "rgb":
					color = { kind: "rgb", r: 0, g: 0, b: 0 };
					break;
				case "hsl":
					color = { kind: "hsl", h: 0, s: 0, l: 0 };
					break;
				case "hwb":
					color = { kind: "hwb", h: 0, w: 0, b: 0 };
					break;
				case "lab":
					color = { kind: "lab", l: 0, a: 0, b: 0 };
					break;
				case "lch":
					color = { kind: "lch", l: 0, c: 0, h: 0 };
					break;
				case "oklab":
					color = { kind: "oklab", l: 0, a: 0, b: 0 };
					break;
				case "oklch":
					color = { kind: "oklch", l: 0, c: 0, h: 0 };
					break;
				case "system":
					color = { kind: "system", keyword: "Canvas" };
					break;
				case "special":
					color = { kind: "special", keyword: "transparent" };
					break;
				case "color":
					color = { kind: "color", colorSpace: "srgb", channels: [0, 0, 0] };
					break;
			}
			expect(generateColor(color)).toBeTruthy();
		}
	});
});
