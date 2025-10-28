// b_path:: src/generate/color/hsl.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./hsl";

describe("hsl color generator", () => {
	test("should generate opaque HSL color", () => {
		const result = generate({ kind: "hsl", h: 120, s: 100, l: 50 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hsl(120 100% 50%)");
	});

	test("should generate HSL with alpha", () => {
		const result = generate({ kind: "hsl", h: 240, s: 75, l: 60, alpha: 0.8 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hsl(240 75% 60% / 0.8)");
	});

	test("should omit alpha when fully opaque", () => {
		const result = generate({ kind: "hsl", h: 0, s: 100, l: 50, alpha: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hsl(0 100% 50%)");
	});

	test("should handle zero saturation", () => {
		const result = generate({ kind: "hsl", h: 0, s: 0, l: 50 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hsl(0 0% 50%)");
	});
});
