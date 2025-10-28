// b_path:: src/generate/color/rgb.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./rgb";

describe("rgb color generator", () => {
	test("should generate opaque RGB color", () => {
		const result = generate({ kind: "rgb", r: 255, g: 0, b: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("rgb(255 0 0)");
	});

	test("should generate RGB with alpha", () => {
		const result = generate({ kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("rgb(255 0 0 / 0.5)");
	});

	test("should omit alpha when fully opaque", () => {
		const result = generate({ kind: "rgb", r: 0, g: 128, b: 255, alpha: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("rgb(0 128 255)");
	});

	test("should round RGB values", () => {
		const result = generate({ kind: "rgb", r: 255.7, g: 127.3, b: 63.9 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("rgb(256 127 64)");
	});
});
