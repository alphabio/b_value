// b_path:: src/generate/color/color.test.ts

import { describe, expect, test } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./color";

describe("Color.generate()", () => {
	test("generates hex color", () => {
		const color: Type.Color = { kind: "hex", value: "#FF0000" };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("#FF0000");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates named color", () => {
		const color: Type.Color = { kind: "named", name: "red" };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("red");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates rgb color", () => {
		const color: Type.Color = { kind: "rgb", r: 255, g: 0, b: 0 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rgb(255 0 0)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates rgb color with alpha", () => {
		const color: Type.Color = { kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rgb(255 0 0 / 0.5)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates hsl color", () => {
		const color: Type.Color = { kind: "hsl", h: 120, s: 100, l: 50 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("hsl(120 100% 50%)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates hwb color", () => {
		const color: Type.Color = { kind: "hwb", h: 120, w: 20, b: 30 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("hwb(120 20% 30%)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates lab color", () => {
		const color: Type.Color = { kind: "lab", l: 50, a: -20, b: 30 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("lab(50 -20 30)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates lch color", () => {
		const color: Type.Color = { kind: "lch", l: 50, c: 50, h: 180 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("lch(50 50 180)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates oklab color", () => {
		const color: Type.Color = { kind: "oklab", l: 0.5, a: -0.2, b: 0.3 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("oklab(0.5 -0.2 0.3)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates oklch color", () => {
		const color: Type.Color = { kind: "oklch", l: 0.5, c: 0.2, h: 180 };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("oklch(0.5 0.2 180)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates system color", () => {
		const color: Type.Color = { kind: "system", keyword: "ButtonText" };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ButtonText");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates special color", () => {
		const color: Type.Color = { kind: "special", keyword: "transparent" };
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("transparent");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates color() function", () => {
		const color: Type.Color = {
			kind: "color",
			colorSpace: "display-p3",
			channels: [0.928, 0.322, 0.203],
		};
		const result = generate(color);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("color(display-p3 0.928 0.322 0.203)");
			expect(result.issues).toEqual([]);
		}
	});

	test("returns error for invalid IR (missing kind)", () => {
		const color = {} as Type.Color;
		const result = generate(color);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toContain("missing 'kind' field");
			expect(result.issues[0]?.suggestion).toBeDefined();
		}
	});

	test("returns error for unknown kind", () => {
		const color = { kind: "unknown" } as unknown as Type.Color;
		const result = generate(color);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toContain("Unknown color kind");
			expect(result.issues[0]?.suggestion).toBeDefined();
		}
	});
});
