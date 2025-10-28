// b_path:: src/generate/color/hwb.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./hwb";

describe("hwb color generator", () => {
	test("should generate opaque HWB color", () => {
		const result = generate({ kind: "hwb", h: 120, w: 20, b: 30 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hwb(120 20% 30%)");
	});

	test("should generate HWB with alpha", () => {
		const result = generate({ kind: "hwb", h: 180, w: 10, b: 15, alpha: 0.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hwb(180 10% 15% / 0.5)");
	});

	test("should omit alpha when fully opaque", () => {
		const result = generate({ kind: "hwb", h: 240, w: 0, b: 0, alpha: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hwb(240 0% 0%)");
	});

	test("should handle zero whiteness and blackness", () => {
		const result = generate({ kind: "hwb", h: 60, w: 0, b: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hwb(60 0% 0%)");
	});
});
