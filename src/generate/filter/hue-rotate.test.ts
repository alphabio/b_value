import { describe, expect, test } from "vitest";
import { generate } from "./hue-rotate";

describe("hue-rotate generator", () => {
	test("should generate hue-rotate with deg", () => {
		const result = generate({ kind: "hue-rotate", angle: { value: 90, unit: "deg" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hue-rotate(90deg)");
	});

	test("should generate hue-rotate with rad", () => {
		const result = generate({ kind: "hue-rotate", angle: { value: 1.57, unit: "rad" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hue-rotate(1.57rad)");
	});

	test("should generate hue-rotate with turn", () => {
		const result = generate({ kind: "hue-rotate", angle: { value: 0.5, unit: "turn" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hue-rotate(0.5turn)");
	});

	test("should error on null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
