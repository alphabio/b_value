import { describe, expect, test } from "vitest";
import { generateBackgroundBlendMode } from "./background-blend-mode.generate";

describe("background-blend-mode generator", () => {
	test("should generate 'normal'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	test("should generate 'multiply'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "multiply" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("multiply");
	});

	test("should generate 'screen'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "screen" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("screen");
	});

	test("should generate 'overlay'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "overlay" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("overlay");
	});

	test("should generate 'darken'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "darken" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("darken");
	});

	test("should generate 'lighten'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "lighten" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lighten");
	});

	test("should generate 'color-dodge'", () => {
		const result = generateBackgroundBlendMode({ kind: "background-blend-mode", mode: "color-dodge" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("color-dodge");
	});
});
