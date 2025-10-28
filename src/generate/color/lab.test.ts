// b_path:: src/generate/color/lab.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./lab";

describe("lab color generator", () => {
	test("should generate opaque LAB color", () => {
		const result = generate({ kind: "lab", l: 50, a: -20, b: 30 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lab(50 -20 30)");
	});

	test("should generate LAB with alpha", () => {
		const result = generate({ kind: "lab", l: 75, a: 15, b: -10, alpha: 0.6 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lab(75 15 -10 / 0.6)");
	});

	test("should omit alpha when fully opaque", () => {
		const result = generate({ kind: "lab", l: 100, a: 0, b: 0, alpha: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lab(100 0 0)");
	});

	test("should handle negative values", () => {
		const result = generate({ kind: "lab", l: 25, a: -50, b: -40 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lab(25 -50 -40)");
	});
});
