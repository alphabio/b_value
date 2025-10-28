import { describe, expect, test } from "vitest";
import { generateMixBlendMode } from "./mix-blend-mode";

describe("mix-blend-mode generator", () => {
	test("should generate 'normal'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	test("should generate 'multiply'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "multiply" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("multiply");
	});

	test("should generate 'screen'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "screen" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("screen");
	});

	test("should generate 'overlay'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "overlay" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("overlay");
	});

	test("should generate 'difference'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "difference" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("difference");
	});

	test("should generate 'exclusion'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "exclusion" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("exclusion");
	});

	test("should generate 'hue'", () => {
		const result = generateMixBlendMode({ kind: "mix-blend-mode", mode: "hue" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hue");
	});
});
