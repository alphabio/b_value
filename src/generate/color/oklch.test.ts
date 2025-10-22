import { describe, expect, test } from "vitest";
import { generate } from "./oklch";

describe("oklch color generator", () => {
	test("should generate opaque OKLCH color", () => {
		const result = generate({ kind: "oklch", l: 0.5, c: 0.2, h: 180 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklch(0.5 0.2 180)");
	});

	test("should generate OKLCH with alpha", () => {
		const result = generate({ kind: "oklch", l: 0.8, c: 0.15, h: 90, alpha: 0.85 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklch(0.8 0.15 90 / 0.85)");
	});

	test("should omit alpha when fully opaque", () => {
		const result = generate({ kind: "oklch", l: 1, c: 0, h: 0, alpha: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklch(1 0 0)");
	});

	test("should handle various hue values", () => {
		const result = generate({ kind: "oklch", l: 0.6, c: 0.25, h: 300 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklch(0.6 0.25 300)");
	});
});
