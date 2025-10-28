// b_path:: src/generate/filter/brightness.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./brightness";

describe("brightness generator", () => {
	test("should generate brightness 0 (black)", () => {
		const result = generate({ kind: "brightness", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("brightness(0)");
	});

	test("should generate brightness 1 (normal)", () => {
		const result = generate({ kind: "brightness", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("brightness(1)");
	});

	test("should generate brightness 1.5 (brighter)", () => {
		const result = generate({ kind: "brightness", value: 1.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("brightness(1.5)");
	});

	test("should error on null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
