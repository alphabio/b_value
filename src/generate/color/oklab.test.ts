import { describe, expect, test } from "vitest";
import { generate } from "./oklab";

describe("oklab color generator", () => {
	test("should generate opaque OKLab color", () => {
		const result = generate({ kind: "oklab", l: 0.5, a: -0.2, b: 0.3 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklab(0.5 -0.2 0.3)");
	});

	test("should generate OKLab with alpha", () => {
		const result = generate({ kind: "oklab", l: 0.75, a: 0.1, b: -0.05, alpha: 0.9 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklab(0.75 0.1 -0.05 / 0.9)");
	});

	test("should omit alpha when fully opaque", () => {
		const result = generate({ kind: "oklab", l: 1, a: 0, b: 0, alpha: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklab(1 0 0)");
	});

	test("should handle negative a and b values", () => {
		const result = generate({ kind: "oklab", l: 0.3, a: -0.15, b: -0.25 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oklab(0.3 -0.15 -0.25)");
	});
});
