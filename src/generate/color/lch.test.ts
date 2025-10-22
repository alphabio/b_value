import { describe, expect, test } from "vitest";
import { generate } from "./lch";

describe("lch color generator", () => {
	test("should generate opaque LCH color", () => {
		const result = generate({ kind: "lch", l: 50, c: 50, h: 180 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lch(50 50 180)");
	});

	test("should generate LCH with alpha", () => {
		const result = generate({ kind: "lch", l: 75, c: 30, h: 120, alpha: 0.7 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lch(75 30 120 / 0.7)");
	});

	test("should omit alpha when fully opaque", () => {
		const result = generate({ kind: "lch", l: 100, c: 0, h: 0, alpha: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lch(100 0 0)");
	});

	test("should handle various hue values", () => {
		const result = generate({ kind: "lch", l: 60, c: 40, h: 270 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lch(60 40 270)");
	});
});
